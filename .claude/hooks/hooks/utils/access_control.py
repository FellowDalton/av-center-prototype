#!/usr/bin/env python3
"""
Access control utilities for agent file permissions.
Provides pattern matching and permission checking for agent-based file access.
"""

import json
import os
import fnmatch
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AccessController:
    """Manages file access permissions for agents."""
    
    def __init__(self, config_path: str = None):
        """
        Initialize the access controller with configuration.
        
        Args:
            config_path: Path to agent-access-config.json
        """
        if config_path is None:
            # Default to .claude/agent-access-config.json in project root
            project_root = Path.cwd()
            config_path = project_root / '.claude' / 'agent-access-config.json'
        
        self.config_path = Path(config_path)
        self.config = self._load_config()
        self._cache = {}  # Cache for permission checks
        
    def _load_config(self) -> Dict:
        """Load the access configuration from JSON file."""
        if not self.config_path.exists():
            logger.warning(f"Access config not found at {self.config_path}")
            return {"agents": {}, "default": {"blocked": [], "readOnly": []}}
        
        try:
            with open(self.config_path, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError as e:
            logger.error(f"Error loading access config: {e}")
            return {"agents": {}, "default": {"blocked": [], "readOnly": []}}
    
    def reload_config(self):
        """Reload the configuration from disk."""
        self.config = self._load_config()
        self._cache.clear()  # Clear cache on reload
        
    def get_agent_id(self) -> Optional[str]:
        """
        Get the current agent ID from environment.
        
        Returns:
            Agent ID or None if not set
        """
        return os.environ.get('CLAUDE_AGENT_ID')
    
    def normalize_path(self, path: str) -> str:
        """
        Normalize a file path for consistent matching.
        
        Args:
            path: The file path to normalize
            
        Returns:
            Normalized relative path
        """
        path_obj = Path(path)
        
        # Convert to absolute path if relative
        if not path_obj.is_absolute():
            path_obj = Path.cwd() / path_obj
        
        # Get relative path from project root
        try:
            project_root = Path.cwd()
            # If we're in a worktree, navigate to the actual project root
            while project_root.name == 'worktrees' or 'worktrees' in project_root.parts:
                project_root = project_root.parent
                if project_root == project_root.parent:  # Reached root
                    break
            
            rel_path = path_obj.relative_to(project_root)
            return str(rel_path).replace('\\', '/')  # Use forward slashes
        except ValueError:
            # Path is outside project root
            return str(path_obj).replace('\\', '/')
    
    def match_pattern(self, path: str, pattern: str) -> bool:
        """
        Check if a path matches a glob pattern.
        
        Args:
            path: The file path to check
            pattern: The glob pattern
            
        Returns:
            True if path matches pattern
        """
        # Handle ** for recursive matching
        if '**' in pattern:
            # Convert ** to match any depth
            pattern_parts = pattern.split('/')
            path_parts = path.split('/')
            
            # Simple implementation of ** matching
            if pattern == '**':
                return True
            elif pattern.startswith('**/'):
                suffix = pattern[3:]
                return any(path[i:].startswith(suffix) or fnmatch.fnmatch(path[i:], suffix) 
                          for i in range(len(path)))
            elif pattern.endswith('/**'):
                prefix = pattern[:-3]
                return path.startswith(prefix)
            elif '/**/' in pattern:
                parts = pattern.split('/**/')
                if len(parts) == 2:
                    prefix, suffix = parts
                    if path.startswith(prefix):
                        remaining = path[len(prefix):].lstrip('/')
                        return fnmatch.fnmatch(remaining, suffix) or \
                               any(remaining[i:].startswith(suffix) or 
                                   fnmatch.fnmatch(remaining[i:], suffix)
                                   for i in range(len(remaining)))
        
        # Standard glob matching
        return fnmatch.fnmatch(path, pattern)
    
    def check_access(self, agent_id: str, file_path: str, access_type: str = 'read') -> Tuple[bool, str]:
        """
        Check if an agent has access to a file using block-list approach.
        
        Args:
            agent_id: The agent identifier
            file_path: The file path to check
            access_type: 'read' or 'write'
            
        Returns:
            Tuple of (allowed, reason)
        """
        # Check cache
        cache_key = f"{agent_id}:{file_path}:{access_type}"
        if cache_key in self._cache:
            return self._cache[cache_key]
        
        # Normalize the file path
        normalized_path = self.normalize_path(file_path)
        
        # Check global deny list first
        global_deny = self.config.get('globalDeny', {}).get('paths', [])
        for pattern in global_deny:
            if self.match_pattern(normalized_path, pattern):
                result = (False, f"Path matches global deny pattern: {pattern}")
                self._cache[cache_key] = result
                return result
        
        # Get agent configuration
        agent_config = self.config.get('agents', {}).get(agent_id)
        if not agent_config:
            # Use default permissions
            agent_config = self.config.get('default', {"blocked": [], "readOnly": []})
            logger.info(f"No specific config for agent '{agent_id}', using defaults")
        
        # Check agent-specific blocked paths
        for pattern in agent_config.get('blocked', []):
            if self.match_pattern(normalized_path, pattern):
                result = (False, f"Access denied: path matches blocked pattern '{pattern}' for {agent_id}")
                self._cache[cache_key] = result
                return result
        
        # Check default blocked paths
        default_blocked = self.config.get('default', {}).get('blocked', [])
        for pattern in default_blocked:
            if self.match_pattern(normalized_path, pattern):
                result = (False, f"Access denied: path matches default blocked pattern '{pattern}'")
                self._cache[cache_key] = result
                return result
        
        # Check permissions based on access type
        if access_type == 'write':
            # For write access, check if path is in readOnly list
            for pattern in agent_config.get('readOnly', []):
                if self.match_pattern(normalized_path, pattern):
                    result = (False, f"Write access denied: path matches readOnly pattern '{pattern}' for {agent_id}")
                    self._cache[cache_key] = result
                    return result
            
            # Check default readOnly paths
            default_readonly = self.config.get('default', {}).get('readOnly', [])
            for pattern in default_readonly:
                if self.match_pattern(normalized_path, pattern):
                    result = (False, f"Write access denied: path matches default readOnly pattern '{pattern}'")
                    self._cache[cache_key] = result
                    return result
            
            # If not blocked or readOnly, allow write access
            result = (True, f"Write access allowed: path not in blocked or readOnly lists for {agent_id}")
            self._cache[cache_key] = result
            return result
        
        else:  # read access
            # For read access, allow if not blocked (readOnly is allowed for reads)
            result = (True, f"Read access allowed: path not in blocked lists for {agent_id}")
            self._cache[cache_key] = result
            return result
    
    def get_agent_permissions(self, agent_id: str) -> Dict:
        """
        Get the permission configuration for an agent.
        
        Args:
            agent_id: The agent identifier
            
        Returns:
            Dictionary with blocked and readOnly paths
        """
        agent_config = self.config.get('agents', {}).get(agent_id)
        if not agent_config:
            return self.config.get('default', {"blocked": [], "readOnly": []})
        return {
            "blocked": agent_config.get('blocked', []),
            "readOnly": agent_config.get('readOnly', [])
        }
    
    def list_agents(self) -> List[str]:
        """Get a list of all configured agents."""
        return list(self.config.get('agents', {}).keys())


# Singleton instance for use across hooks
_controller = None

def get_controller(config_path: str = None) -> AccessController:
    """Get or create the singleton AccessController instance."""
    global _controller
    if _controller is None:
        _controller = AccessController(config_path)
    return _controller