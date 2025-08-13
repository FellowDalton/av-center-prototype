#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# ///

import json
import os
import sys
import subprocess
from pathlib import Path

def run_prettier(file_path):
    """Run prettier on a specific file."""
    try:
        # Get the project root (where package.json is)
        project_root = Path.cwd()
        prettier_cmd = project_root / 'node_modules' / '.bin' / 'prettier'
        
        if not prettier_cmd.exists():
            # Fallback to global prettier if available
            result = subprocess.run(['which', 'prettier'], capture_output=True, text=True)
            if result.returncode != 0:
                return False
            prettier_cmd = 'prettier'
        
        # Run prettier with --write flag to format the file
        result = subprocess.run(
            [str(prettier_cmd), '--write', file_path],
            capture_output=True,
            text=True,
            cwd=project_root
        )
        
        if result.returncode == 0:
            print(f"✨ Formatted: {file_path}", file=sys.stderr)
            return True
        else:
            # Silently fail - don't disrupt Claude's workflow
            return False
            
    except Exception:
        # Silently fail on any error
        return False

def main():
    try:
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)
        
        # Check if this is a file modification tool
        tool_name = input_data.get('tool', {}).get('name', '')
        if tool_name not in ['Edit', 'MultiEdit', 'Write']:
            sys.exit(0)
        
        # Extract file paths based on tool type
        file_paths = []
        
        if tool_name in ['Edit', 'Write']:
            # Single file edit/write
            file_path = input_data.get('tool', {}).get('params', {}).get('file_path')
            if file_path:
                file_paths.append(file_path)
                
        elif tool_name == 'MultiEdit':
            # Multiple file edits
            file_path = input_data.get('tool', {}).get('params', {}).get('file_path')
            if file_path:
                file_paths.append(file_path)
        
        # Run prettier on each file
        for file_path in file_paths:
            if file_path and Path(file_path).exists():
                # Check if file has a supported extension
                supported_extensions = {
                    '.js', '.jsx', '.ts', '.tsx', '.json', '.md', 
                    '.css', '.scss', '.less', '.html', '.vue', '.yaml', '.yml'
                }
                if Path(file_path).suffix.lower() in supported_extensions:
                    run_prettier(file_path)
        
        sys.exit(0)
        
    except json.JSONDecodeError:
        # Handle JSON decode errors gracefully
        sys.exit(0)
    except Exception:
        # Exit cleanly on any other error
        sys.exit(0)

if __name__ == '__main__':
    main()