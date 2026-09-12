# Brasil 2030 narrative candidate

<!-- piccini-task-manifest:v1 -->
```json task-manifest
{
  "schema_version": 1,
  "revision": 5,
  "task_id": "task-20260912-brasil-2030-narrative-candidate-9b2033",
  "title": "Brasil 2030 narrative candidate",
  "owner_persona": "generic",
  "status": "active",
  "created_at": "2026-09-12T18:52:48Z",
  "updated_at": "2026-09-12T18:55:20Z",
  "creation_surface": "codex-desktop",
  "data_class": "public",
  "objective": "Publish a review candidate based on Danilo's proposal, preserving the current edition.",
  "current_state": "Candidate manuscript and reader route implemented.",
  "next_action": "Validate, commit, push and deploy the candidate route.",
  "context_files": [
    "src/content/scenario-candidate-pt.md"
  ],
  "skills": [],
  "authority_gates": [
    "publication",
    "git"
  ],
  "limits": {
    "wall_clock_minutes": null,
    "spend_usd": null,
    "allowed_models": [],
    "allowed_tools": []
  },
  "execution": {
    "orca": {
      "run_id": null,
      "task_id": null,
      "worktree_id": null,
      "worktree_path": null,
      "terminal_handles": []
    },
    "harness_history": []
  },
  "artifacts": [
    {
      "path": "src/content/scenario-candidate-pt.md",
      "kind": "manuscript",
      "description": "Complete Portuguese review candidate, five years, alternatives, separate risk appendix and source notes.",
      "added_at": "2026-09-12T18:55:20Z"
    },
    {
      "path": "research/2026-09-12-candidate-editorial-note.md",
      "kind": "provenance",
      "description": "Source revision, preserved contributions, substantive changes and review priorities.",
      "added_at": "2026-09-12T18:55:20Z"
    }
  ],
  "approvals": [
    {
      "gate": "git",
      "decision": "approved",
      "approver": "luiz",
      "scope": "Commit and push the isolated candidate implementation to the brasil-2030 repository.",
      "evidence": "Current user request explicitly asks for a new candidate, commit, push and deployment.",
      "recorded_at": "2026-09-12T18:53:58Z"
    },
    {
      "gate": "publication",
      "decision": "approved",
      "approver": "luiz",
      "scope": "Deploy the clearly labeled candidate at /candidato on the existing public website, preserving the current narrative.",
      "evidence": "Current user request explicitly asks to deploy as a candidate on the site.",
      "recorded_at": "2026-09-12T18:54:43Z"
    }
  ],
  "history": [
    {
      "at": "2026-09-12T18:52:48Z",
      "actor": "codex",
      "event": "created",
      "from": null,
      "to": "active",
      "note": ""
    },
    {
      "at": "2026-09-12T18:53:58Z",
      "actor": "codex",
      "event": "approval_recorded",
      "note": "git: approved"
    },
    {
      "at": "2026-09-12T18:54:43Z",
      "actor": "codex",
      "event": "approval_recorded",
      "note": "publication: approved"
    },
    {
      "at": "2026-09-12T18:55:20Z",
      "actor": "codex",
      "event": "artifact_added",
      "note": "src/content/scenario-candidate-pt.md"
    },
    {
      "at": "2026-09-12T18:55:20Z",
      "actor": "codex",
      "event": "artifact_added",
      "note": "research/2026-09-12-candidate-editorial-note.md"
    }
  ],
  "completion": {
    "summary": null,
    "completed_at": null
  }
}
```

## Objective

Publish a review candidate based on Danilo's proposal, preserving the current edition.

## Current state

Candidate manuscript and reader route implemented.

## Next action

Validate, commit, push and deploy the candidate route.

## Authority gates

- `publication`
- `git`

## Context

- `src/content/scenario-candidate-pt.md`

## Skills

- None

## Orca references

- Run: `unbound`
- Task: `unbound`
- Worktree: `unbound`
- Path: `unbound`
- Terminals: `unbound`

## Artifacts

- `src/content/scenario-candidate-pt.md` (manuscript): Complete Portuguese review candidate, five years, alternatives, separate risk appendix and source notes.
- `research/2026-09-12-candidate-editorial-note.md` (provenance): Source revision, preserved contributions, substantive changes and review priorities.
