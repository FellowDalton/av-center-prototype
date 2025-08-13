#!/usr/bin/env python3
"""Test script to verify access control blocking for Task tool"""

import json
import sys
import os
from pathlib import Path

# Add utils to path
sys.path.insert(0, str(Path(__file__).parent))
from utils.access_control import get_controller

def test_task_write_blocking():
    """Test that write operations are properly blocked for subagents"""
    
    controller = get_controller()
    
    # Test cases for spelling-correction-specialist
    test_cases = [
        {
            "tool_name": "Task",
            "tool_input": {
                "description": "Check spelling in script",
                "prompt": "Review and correct spelling errors in @scripts/distribute-agents-dynamic.zsh",
                "subagent_type": "spelling-correction-specialist"
            },
            "expected": "blocked"  # Should be blocked - write to scripts/**
        },
        {
            "tool_name": "Task",
            "tool_input": {
                "description": "Check spelling in docs",
                "prompt": "Review and fix spelling errors in @agent-docs/README.md",
                "subagent_type": "spelling-correction-specialist"
            },
            "expected": "allowed"  # Should be allowed - can write to agent-docs/**
        },
        {
            "tool_name": "Task",
            "tool_input": {
                "description": "Read script content",
                "prompt": "Read and analyze the content of @scripts/distribute-agents-dynamic.zsh",
                "subagent_type": "spelling-correction-specialist"
            },
            "expected": "allowed"  # Should be allowed - only reading
        }
    ]
    
    # Import the check function from the hook
    sys.path.insert(0, str(Path(__file__).parent.parent))
    from pre_tool_use_enhanced import check_agent_file_access
    
    print("Testing Task tool access control:\n")
    
    for i, test in enumerate(test_cases, 1):
        allowed, message = check_agent_file_access(test["tool_name"], test["tool_input"])
        
        result = "allowed" if allowed else "blocked"
        status = "✓" if result == test["expected"] else "✗"
        
        print(f"Test {i}: {status}")
        print(f"  Description: {test['tool_input']['description']}")
        print(f"  Expected: {test['expected']}, Got: {result}")
        if message:
            print(f"  Message: {message}")
        print()

if __name__ == "__main__":
    test_task_write_blocking()