#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# ///

"""
Slash command for configuring agent file access permissions.
This command helps you interactively set up and modify agent permissions.
"""

import json
import sys
import os
from pathlib import Path
from typing import Dict, List

# Color codes for terminal output
BLUE = '\033[94m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
BOLD = '\033[1m'
RESET = '\033[0m'

def load_config() -> Dict:
    """Load the current agent access configuration."""
    config_path = Path.cwd() / '.claude' / 'agent-access-config.json'
    
    if not config_path.exists():
        return {
            "version": "1.0.0",
            "description": "Agent file access control configuration",
            "agents": {},
            "default": {
                "owned": [],
                "readOnly": ["**/*.md", "package.json", "tsconfig.json"]
            },
            "globalDeny": {
                "paths": [".git/**", ".env", "node_modules/**", ".next/**", "dist/**", "build/**"]
            }
        }
    
    with open(config_path, 'r') as f:
        return json.load(f)

def save_config(config: Dict):
    """Save the agent access configuration."""
    config_path = Path.cwd() / '.claude' / 'agent-access-config.json'
    config_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2)

def print_agent_permissions(agent_id: str, config: Dict):
    """Print the current permissions for an agent."""
    agent_config = config.get('agents', {}).get(agent_id)
    
    if not agent_config:
        print(f"{YELLOW}No specific configuration for agent '{agent_id}'{RESET}")
        print(f"Using default permissions:")
        agent_config = config.get('default', {})
    else:
        print(f"{GREEN}Permissions for '{agent_id}':{RESET}")
    
    print(f"\n{BOLD}Owned (Write Access):{RESET}")
    owned = agent_config.get('owned', [])
    if owned:
        for path in owned:
            print(f"  • {path}")
    else:
        print(f"  {YELLOW}(none){RESET}")
    
    print(f"\n{BOLD}Read-Only Access:{RESET}")
    readonly = agent_config.get('readOnly', [])
    if readonly:
        for path in readonly:
            print(f"  • {path}")
    else:
        print(f"  {YELLOW}(none){RESET}")

def suggest_permissions_prompt(agent_id: str) -> str:
    """Generate a prompt for Claude to suggest permissions."""
    return f"""I'm configuring file access permissions for the '{agent_id}' agent.

Based on the agent name and typical project structure, please suggest appropriate file access patterns.

Current project structure hints:
- Frontend: app/, components/, lib/, public/, styles/
- Backend: src/api/, src/server/, src/endpoints/
- Database: src/db/, migrations/, prisma/, drizzle/, supabase/
- Auth: src/auth/, src/middleware/auth/
- State: src/store/, src/state/, lib/store/
- UI: src/components/, src/ui/

Please suggest:
1. Which paths should this agent have write access to (owned)?
2. Which paths should this agent have read-only access to?
3. Any specific patterns or considerations for this agent type?

Format your response as:
OWNED:
- pattern1
- pattern2

READONLY:
- pattern1
- pattern2

NOTES:
Any additional considerations"""

def main():
    """Main entry point for the configure-agent-access command."""
    # Parse command line arguments
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == 'list':
            # List all configured agents
            config = load_config()
            agents = list(config.get('agents', {}).keys())
            
            print(f"{BOLD}Configured Agents:{RESET}")
            if agents:
                for agent_id in sorted(agents):
                    agent_info = config['agents'][agent_id]
                    name = agent_info.get('name', agent_id)
                    desc = agent_info.get('description', '')
                    print(f"  • {BLUE}{agent_id}{RESET}: {name}")
                    if desc:
                        print(f"    {desc}")
            else:
                print(f"  {YELLOW}No agents configured yet{RESET}")
            
            print(f"\n{BOLD}Usage:{RESET}")
            print(f"  /configure-agent-access show <agent-id>    - Show permissions for an agent")
            print(f"  /configure-agent-access help <agent-id>    - Get help configuring an agent")
            print(f"  /configure-agent-access current            - Show current agent's permissions")
            
        elif command == 'show' and len(sys.argv) > 2:
            # Show permissions for a specific agent
            agent_id = sys.argv[2]
            config = load_config()
            print_agent_permissions(agent_id, config)
            
        elif command == 'current':
            # Show current agent's permissions
            agent_id = os.environ.get('CLAUDE_AGENT_ID')
            if agent_id:
                config = load_config()
                print(f"{BOLD}Current Agent: {agent_id}{RESET}")
                print_agent_permissions(agent_id, config)
            else:
                print(f"{YELLOW}No CLAUDE_AGENT_ID environment variable set{RESET}")
                print("Agent identification is not active in this session")
        
        elif command == 'help' and len(sys.argv) > 2:
            # Get help configuring a specific agent
            agent_id = sys.argv[2]
            print(suggest_permissions_prompt(agent_id))
            
        else:
            print(f"{RED}Unknown command: {command}{RESET}")
            print("Use: /configure-agent-access list")
    
    else:
        # Interactive mode - start a conversation about agent permissions
        print(f"""{BOLD}Agent Access Configuration Helper{RESET}

I can help you configure file access permissions for your agents.

{BOLD}Quick Commands:{RESET}
  {BLUE}/configure-agent-access list{RESET}              - List all configured agents
  {BLUE}/configure-agent-access show <agent-id>{RESET}   - Show agent's permissions
  {BLUE}/configure-agent-access help <agent-id>{RESET}   - Get configuration help
  {BLUE}/configure-agent-access current{RESET}           - Show current agent

{BOLD}How to Configure:{RESET}
1. Tell me which agent you want to configure (e.g., "ui-agent")
2. I'll suggest appropriate file access patterns
3. You can review and modify the suggestions
4. The configuration will be saved to .claude/agent-access-config.json

{BOLD}Example:{RESET}
  "Let's configure permissions for the database-agent"
  "The ui-agent should only access components and styles"
  "Give api-agent read access to database queries"

What would you like to configure?""")

if __name__ == '__main__':
    main()