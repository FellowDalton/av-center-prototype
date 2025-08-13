# Agent Worktree: UI Agent

This is an isolated worktree for the **ui-agent** agent.

## Configuration

- **Branch**: `agent/ui-agent`
- **Created**: Wed Aug 13 11:56:34 CEST 2025
- **Description**: Frontend development agent

## Subagents Included

The following subagents are available for this agent:
- react-javascript-expert
- css-scss-expert
- html-wcag-expert
- framer-motion-specialist
- figma-integration-specialist
- performance-optimization-specialist
- ui-test-specification
- code-reviewer
- debugger

## Starting Claude Code

To launch Claude Code in this agent worktree:

```bash
cd /Users/dalton/projects/av-center-prototype/claude-coordinator/../frontend/worktrees/ui-agent-20250813-115634
export CLAUDE_AGENT_ID="ui-agent"
claude --model sonnet
```

Or use the tmux session (if active):
```bash
tmux attach-session -t agent-ui-agent
```

## Tasks

The following tasks have been assigned:

### Manually Specified Tasks (8)

### Auto-Discovered Tasks (8)
- task_002_ui-agent.txt
- task_003_ui-agent.txt
- task_005_ui-agent.txt
- task_006_ui-agent.txt
- task_007_ui-agent.txt
- task_008_ui-agent.txt
- task_011_ui-agent.txt
- task_013_ui-agent.txt

## Quick Commands

```bash
# Check current branch
git branch --show-current

# View status
git status

# Commit changes
git add .
git commit -m "Your commit message"

# Push changes
git push origin agent/ui-agent
```
