---
status: complete
priority: p2
issue_id: "002"
tags: [comments, data-integrity]
dependencies: []
---

# Validate comment parent IDs

Ensure comment replies reference an existing comment on the same post.

## Problem Statement

The API accepted any `parent_id` when creating a comment, allowing replies to reference non-existent or cross-post comments. This breaks thread integrity and can lead to confusing UI behavior.

## Findings

- `POST /api/v1/posts/:id/comments` inserted `parent_id` without validation (`src/index.ts`).
- No guard ensured `parent_id` belonged to the same `post_id`.

## Proposed Solutions

### Option 1: Validate parent comment (implemented)

**Approach:** Look up `parent_id` for the same post and reject if missing.

**Pros:**
- Preserves data integrity
- Minimal code change

**Cons:**
- Adds one extra query on reply creation

**Effort:** < 1 hour

**Risk:** Low

---

### Option 2: Enforce via FK constraints

**Approach:** Introduce a composite constraint or trigger to ensure parent comment is on the same post.

**Pros:**
- Strong database-level integrity

**Cons:**
- More complex migration; D1 constraints are limited

**Effort:** 2-4 hours

**Risk:** Medium

## Recommended Action

Implemented a parent comment lookup and return 404 when the parent is invalid.

## Technical Details

**Affected files:**
- `src/index.ts` - parent comment validation before insert

## Resources

- **Endpoint:** `POST /api/v1/posts/:id/comments`

## Acceptance Criteria

- [x] Invalid `parent_id` returns a 404 error
- [x] Valid parent reply is stored successfully

## Work Log

### 2026-01-31 - Fix implemented

**By:** Codex

**Actions:**
- Added parent comment lookup and validation
- Reused existing error helper for consistent responses

**Learnings:**
- Small guardrails avoid corrupting comment thread structure

## Notes

None.
