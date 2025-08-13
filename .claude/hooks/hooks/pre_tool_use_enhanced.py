#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# ///

import json
import sys
import re
import os
from pathlib import Path

# Add utils to path for importing access_control
sys.path.insert(0, str(Path(__file__).parent))

from utils.access_control import get_controller

def is_dangerous_rm_command(command):
    """
    Comprehensive detection of dangerous rm commands.
    Matches various forms of rm -rf and similar destructive patterns.
    """
    # Normalize command by removing extra spaces and converting to lowercase
    normalized = ' '.join(command.lower().split())
    
    # Pattern 1: Standard rm -rf variations
    patterns = [
        r'\brm\s+.*-[a-z]*r[a-z]*f',  # rm -rf, rm -fr, rm -Rf, etc.
        r'\brm\s+.*-[a-z]*f[a-z]*r',  # rm -fr variations
        r'\brm\s+--recursive\s+--force',  # rm --recursive --force
        r'\brm\s+--force\s+--recursive',  # rm --force --recursive
        r'\brm\s+-r\s+.*-f',  # rm -r ... -f
        r'\brm\s+-f\s+.*-r',  # rm -f ... -r
    ]
    
    # Check for dangerous patterns
    for pattern in patterns:
        if re.search(pattern, normalized):
            return True
    
    # Pattern 2: Check for rm with recursive flag targeting dangerous paths
    dangerous_paths = [
        r'/',           # Root directory
        r'/\*',         # Root with wildcard
        r'~',           # Home directory
        r'~/',          # Home directory path
        r'\$HOME',      # Home environment variable
        r'\.\.',        # Parent directory references
        r'\*',          # Wildcards in general rm -rf context
        r'\.',          # Current directory
        r'\.\s*$',      # Current directory at end of command
    ]
    
    if re.search(r'\brm\s+.*-[a-z]*r', normalized):  # If rm has recursive flag
        for path in dangerous_paths:
            if re.search(path, normalized):
                return True
    
    return False

def is_dangerous_mv_command(command):
    """
    Detection of mv commands targeting /tmp directory.
    Prevents moving files to temporary directories.
    """
    # Normalize command by removing extra spaces
    normalized = ' '.join(command.split())
    
    # Patterns for detecting mv to /tmp
    patterns = [
        r'\bmv\s+.*\s+/tmp/?',           # mv file /tmp or /tmp/
        r'\bmv\s+.*\s+/tmp/\S*',         # mv file /tmp/anything
        r'\bmv\s+.*\s+/private/tmp/?',   # mv file /private/tmp (macOS actual path)
        r'\bmv\s+.*\s+/private/tmp/\S*', # mv file /private/tmp/anything
        r'\bmv\s+.*\s+/var/tmp/?',       # mv file /var/tmp
        r'\bmv\s+.*\s+/var/tmp/\S*',     # mv file /var/tmp/anything
    ]
    
    # Check for dangerous patterns
    for pattern in patterns:
        if re.search(pattern, normalized, re.IGNORECASE):
            return True
    
    return False

def is_hook_file_write(tool_name, tool_input):
    """
    Check if attempting to write/edit hook files.
    Returns True if trying to modify files in .claude/hooks/
    """
    # Only check write operations
    if tool_name not in ['Edit', 'MultiEdit', 'Write']:
        return False
    
    # Get the file path
    file_path = tool_input.get('file_path', '')
    
    # Check if path contains .claude/hooks/
    if '.claude/hooks/' in file_path or file_path.startswith('.claude/hooks/'):
        return True
    
    # Also check for absolute paths
    if '/.claude/hooks/' in file_path:
        return True
    
    return False

def is_env_file_access(tool_name, tool_input):
    """
    Check if any tool is trying to access .env files containing sensitive data.
    """
    if tool_name in ['Read', 'Edit', 'MultiEdit', 'Write', 'Bash']:
        # Check file paths for file-based tools
        if tool_name in ['Read', 'Edit', 'MultiEdit', 'Write']:
            file_path = tool_input.get('file_path', '')
            if '.env' in file_path and not file_path.endswith('.env.sample'):
                return True
        
        # Check bash commands for .env file access
        elif tool_name == 'Bash':
            command = tool_input.get('command', '')
            # Pattern to detect .env file access (but allow .env.sample)
            env_patterns = [
                r'\b\.env\b(?!\.sample)',  # .env but not .env.sample
                r'cat\s+.*\.env\b(?!\.sample)',  # cat .env
                r'echo\s+.*>\s*\.env\b(?!\.sample)',  # echo > .env
                r'touch\s+.*\.env\b(?!\.sample)',  # touch .env
                r'cp\s+.*\.env\b(?!\.sample)',  # cp .env
                r'mv\s+.*\.env\b(?!\.sample)',  # mv .env
            ]
            
            for pattern in env_patterns:
                if re.search(pattern, command):
                    return True
    
    return False

def check_agent_file_access(tool_name, tool_input):
    """
    Check if the agent has permission to access the requested file.
    
    Returns:
        Tuple of (allowed, message)
    """
    # Tools that don't require file access checking
    no_access_check_tools = [
        'TodoWrite', 'todo_write', 'update_memory', 
        'web_search', 'create_diagram', 'read_lints',
        'run_terminal_cmd', 'list_dir', 'file_search',
        'grep_search', 'codebase_search', 'fetch_pull_request'
    ]
    
    # Skip access check for tools that don't access files directly
    if tool_name in no_access_check_tools:
        return (True, None)
    
    # Get the access controller
    controller = get_controller()
    
    # Get current agent ID
    agent_id = controller.get_agent_id()
    
    # Special handling for Task tool - use subagent_type as agent_id
    if tool_name == 'Task' and 'subagent_type' in tool_input:
        # For Task tool, we need to check if subagent has allowed access
        subagent_id = tool_input['subagent_type']
        agent_config = controller.config.get('agents', {}).get(subagent_id, {})
        
        # Check if subagent has access control configured (blocked/readOnly)
        if 'blocked' not in agent_config and 'readOnly' not in agent_config:
            return (False, f"Subagent '{subagent_id}' does not have access control configured. Cannot launch subagent without proper access control.")
        
        # For now, allow Task if subagent has access control configured
        # In future, could parse prompt for file paths and validate
        return (True, None)
    
    # If no agent_id, treat as parent agent
    if not agent_id:
        agent_id = 'parent'
    
    # Determine which tools need access checking
    write_tools = ['Edit', 'MultiEdit', 'Write']
    read_tools = ['Read']
 
    if tool_name in write_tools:
        file_path = tool_input.get('file_path', '')
        if not file_path:
            return (True, None)
        
        # Check write access
        allowed, reason = controller.check_access(agent_id, file_path, 'write')
        if not allowed:
            return (False, f"Agent '{agent_id}' does not have write access to '{file_path}'. {reason}")
    
    elif tool_name in read_tools:
        file_path = tool_input.get('file_path', '')
        if not file_path:
            return (True, None)
        
        # Check read access
        allowed, reason = controller.check_access(agent_id, file_path, 'read')
        if not allowed:
            return (False, f"Agent '{agent_id}' does not have read access to '{file_path}'. {reason}")
    
    elif tool_name == 'Bash':
        # For bash commands, we need to be more careful
        # Check for file operations in the command
        command = tool_input.get('command', '')
        
        # Patterns for write operations
        write_patterns = [
            (r'>\s*([^\s]+)', 'write'),  # Redirect output
            (r'>>\s*([^\s]+)', 'write'),  # Append output
            (r'\brm\s+([^\s]+)', 'write'),  # Remove file
            (r'\bmv\s+[^\s]+\s+([^\s]+)', 'write'),  # Move destination
            (r'\bcp\s+[^\s]+\s+([^\s]+)', 'write'),  # Copy destination
            (r'\btouch\s+([^\s]+)', 'write'),  # Create file
        ]
        
        # Patterns for read operations
        read_patterns = [
            (r'\bcat\s+([^\s]+)', 'read'),  # Cat file
            (r'\bless\s+([^\s]+)', 'read'),  # Less file
            (r'\bmore\s+([^\s]+)', 'read'),  # More file
            (r'\bhead\s+([^\s]+)', 'read'),  # Head file
            (r'\btail\s+([^\s]+)', 'read'),  # Tail file
            (r'\bgrep\s+.*\s+([^\s]+)$', 'read'),  # Grep file
        ]
        
        # Check write operations first (more restrictive)
        for pattern, access_type in write_patterns:
            match = re.search(pattern, command)
            if match:
                file_path = match.group(1)
                # Remove quotes if present
                file_path = file_path.strip('"\'')
                
                allowed, reason = controller.check_access(agent_id, file_path, access_type)
                if not allowed:
                    return (False, f"Agent '{agent_id}' does not have {access_type} access to '{file_path}' in bash command. {reason}")
        
        # Check read operations
        for pattern, access_type in read_patterns:
            match = re.search(pattern, command)
            if match:
                file_path = match.group(1)
                # Remove quotes if present
                file_path = file_path.strip('"\'')
                
                allowed, reason = controller.check_access(agent_id, file_path, access_type)
                if not allowed:
                    return (False, f"Agent '{agent_id}' does not have {access_type} access to '{file_path}' in bash command. {reason}")
    
    return (True, None)

def main():
    try:   
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)
        
        tool_name = input_data.get('tool_name', '')
        tool_input = input_data.get('tool_input', {})
        

        
        # Store subagent_type for Task tools so SubagentStop hook can access it
        if tool_name == 'Task' and 'subagent_type' in tool_input:
            try:
                session_id = input_data.get('session_id')
                subagent_type = tool_input['subagent_type']
                if session_id and subagent_type:
                    # Ensure logs directory exists
                    log_dir = Path.cwd() / 'logs'
                    log_dir.mkdir(parents=True, exist_ok=True)
                    
                    # Store subagent_type in session file
                    session_file = log_dir / f"subagent_session_{session_id}.txt"
                    with open(session_file, 'w') as f:
                        f.write(subagent_type)
                        f.flush()
                        os.fsync(f.fileno())
            except Exception:
                pass  # Fail silently for storage errors
        
        
        # HOOK_PROTECTION_START - Comment out these 4 lines to allow hook editing
        if is_hook_file_write(tool_name, tool_input):
            print("BLOCKED: Hook files are protected from modification", file=sys.stderr)
            print("Ask the user to temporarily disable this protection if hook updates are needed", file=sys.stderr)
            sys.exit(2)
        # HOOK_PROTECTION_END
        
        # Check for agent file access permissions
        allowed, message = check_agent_file_access(tool_name, tool_input)
        if not allowed:
            print(f"BLOCKED: {message}", file=sys.stderr)
            print(f"To modify permissions, use: /configure-agent-access", file=sys.stderr)
            sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude
        
        # Check for .env file access (blocks access to sensitive environment files)
        if is_env_file_access(tool_name, tool_input):
            print("BLOCKED: Access to .env files containing sensitive data is prohibited", file=sys.stderr)
            print("Use .env.sample for template files instead", file=sys.stderr)
            sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude
        
        # Check for dangerous rm -rf commands and mv to /tmp
        if tool_name == 'Bash':
            command = tool_input.get('command', '')
            
            # Block rm -rf commands with comprehensive pattern matching
            if is_dangerous_rm_command(command):
                print("BLOCKED: Dangerous rm command detected and prevented", file=sys.stderr)
                sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude
            
            # Block mv commands to /tmp directory
            if is_dangerous_mv_command(command):
                print("BLOCKED: Moving files to /tmp is not allowed", file=sys.stderr)
                print("Please keep files within the project directory", file=sys.stderr)
                sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude
        
        # Log the tool use for audit
        # Ensure log directory exists
        log_dir = Path.cwd() / 'logs'
        log_dir.mkdir(parents=True, exist_ok=True)
        log_path = log_dir / 'pre_tool_use.json'
        
        # Add agent ID to log data
        # For Task tool, use subagent_type as agent_id
        if tool_name == 'Task' and 'subagent_type' in tool_input:
            agent_id = tool_input['subagent_type']
        else:
            agent_id = os.environ.get('CLAUDE_AGENT_ID', 'unknown')
        input_data['agent_id'] = agent_id
        
        # Read existing log data or initialize empty list
        if log_path.exists():
            with open(log_path, 'r') as f:
                try:
                    log_data = json.load(f)
                except (json.JSONDecodeError, ValueError):
                    log_data = []
        else:
            log_data = []
        
        # Append new data
        log_data.append(input_data)
        
        # Write back to file with formatting
        with open(log_path, 'w') as f:
            json.dump(log_data, f, indent=2)
        
        sys.exit(0)
        
    except json.JSONDecodeError:
        # Gracefully handle JSON decode errors
        sys.exit(0)
    except Exception as e:
        # Log unexpected errors but don't block
        print(f"Warning: Pre-tool hook error: {e}", file=sys.stderr)
        sys.exit(0)

if __name__ == '__main__':
    main()