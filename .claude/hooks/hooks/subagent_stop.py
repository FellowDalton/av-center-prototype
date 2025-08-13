#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "python-dotenv",
# ]
# ///

import argparse
import json
import os
import sys
import subprocess
from pathlib import Path
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional


def get_tts_script_path():
    """
    Get the pyttsx3 TTS script path (offline TTS, no API key required).
    """
    # Get current script directory and construct utils/tts path
    script_dir = Path(__file__).parent
    tts_dir = script_dir / "utils" / "tts"
    
    # Use pyttsx3 (no API key required)
    pyttsx3_script = tts_dir / "pyttsx3_tts.py"
    if pyttsx3_script.exists():
        return str(pyttsx3_script)
    
    return None


def announce_subagent_completion(subagent_type=None):
    """Announce subagent completion using the best available TTS service."""
    try:
        tts_script = get_tts_script_path()
        if not tts_script:
            return  # No TTS scripts available
        
        # Use provided subagent_type first, then fall back to environment variable
        agent_id = subagent_type or os.getenv('CLAUDE_AGENT_ID', '').strip()
        
        # Create completion message with agent name if available
        if agent_id and agent_id != 'unknown' and agent_id != 'parent':
            completion_message = f"{agent_id} agent complete"
        else:
            completion_message = "Subagent Complete"
        
        # Call the TTS script with the completion message
        subprocess.run([
            "uv", "run", tts_script, completion_message
        ], 
        capture_output=True,  # Suppress output
        timeout=10  # 10-second timeout
        )
        
    except (subprocess.TimeoutExpired, subprocess.SubprocessError, FileNotFoundError):
        # Fail silently if TTS encounters issues
        pass
    except Exception:
        # Fail silently for any other errors
        pass


def get_subagent_type(input_data):
    """
    Extract subagent_type from stored session info or environment variable.
    
    Args:
        input_data: JSON data from stdin
        
    Returns:
        str or None: The subagent type if found, None otherwise
    """
    found_subagent_type = None
    search_method = None
    
    # Try to read from stored session file
    try:
        session_id = input_data.get('session_id')
        if session_id:
            # Ensure logs directory exists
            log_dir = Path.cwd() / 'logs'
            log_dir.mkdir(parents=True, exist_ok=True)
            
            session_file = log_dir / f"subagent_session_{session_id}.txt"
            if os.path.exists(session_file):
                with open(session_file, 'r') as f:
                    stored_subagent_type = f.read().strip()
                    if stored_subagent_type:
                        found_subagent_type = stored_subagent_type
                        search_method = "stored_session_file"
                        # Clean up the temp file after reading
                        os.remove(session_file)
                        

    except Exception:
        pass  # Fail silently
    
    # Fallback to environment variable
    if not found_subagent_type:
        agent_id = os.getenv('CLAUDE_AGENT_ID', '').strip()
        if agent_id and agent_id not in ['unknown', 'parent']:
            found_subagent_type = agent_id
            search_method = "environment_variable"
    

    
    return found_subagent_type


def main():
    try:
        # Parse command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument('--chat', action='store_true', help='Copy transcript to chat.json')
        args = parser.parse_args()
        
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)

        # Extract required fields
        session_id = input_data.get("session_id", "")
        stop_hook_active = input_data.get("stop_hook_active", False)

        # Ensure log directory exists
        log_dir = os.path.join(os.getcwd(), "logs")
        os.makedirs(log_dir, exist_ok=True)
        log_path = os.path.join(log_dir, "subagent_stop.json")

        # Read existing log data or initialize empty list
        if os.path.exists(log_path):
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
        
        # Handle --chat switch (same as stop.py)
        if args.chat and 'transcript_path' in input_data:
            transcript_path = input_data['transcript_path']
            if os.path.exists(transcript_path):
                # Read .jsonl file and convert to JSON array
                chat_data = []
                try:
                    with open(transcript_path, 'r') as f:
                        for line in f:
                            line = line.strip()
                            if line:
                                try:
                                    chat_data.append(json.loads(line))
                                except json.JSONDecodeError:
                                    pass  # Skip invalid lines
                    
                    # Write to logs/chat.json
                    chat_file = os.path.join(log_dir, 'chat.json')
                    with open(chat_file, 'w') as f:
                        json.dump(chat_data, f, indent=2)
                except Exception:
                    pass  # Fail silently

        # Extract subagent type and announce completion via TTS
        subagent_type = get_subagent_type(input_data)
        announce_subagent_completion(subagent_type)

        sys.exit(0)

    except json.JSONDecodeError:
        # Handle JSON decode errors gracefully
        sys.exit(0)
    except Exception:
        # Handle any other errors gracefully
        sys.exit(0)


if __name__ == "__main__":
    main()