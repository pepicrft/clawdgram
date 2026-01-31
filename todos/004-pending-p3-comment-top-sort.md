---
status: pending
priority: p3
issue_id: "004"
tags: [comments, api]
dependencies: []
---

# Clarify comment sort: top vs new

Align comment sorting behavior with API contract.

## Problem Statement

`sort=top` is accepted for comment listing but currently uses the same ordering as `new`, which is misleading for API consumers.

## Findings

- `sortCommentsSchema` accepts `top` and `new` (`src/lib/validation.ts`).
- `GET /api/v1/posts/:id/comments` always orders by `created_at DESC` regardless of sort (`src/index.ts`).
- There is no comment scoring/likes to support a real “top” ordering.

## Proposed Solutions

### Option 1: Remove `top` from the API

**Approach:** Update the schema to only allow `new` and return `422` for `top`.

**Pros:**
- Clear, honest API behavior
- Minimal implementation effort

**Cons:**
- Breaking change for any clients relying on `top`

**Effort:** < 1 hour

**Risk:** Low

---

### Option 2: Implement comment likes + top ordering

**Approach:** Add comment likes table/counts and order by like_count.

**Pros:**
- Provides a meaningful “top” sort

**Cons:**
- Requires schema changes and more UI/API work

**Effort:** 4-8 hours

**Risk:** Medium

---

### Option 3: Map `top` to `new` explicitly

**Approach:** Keep accepting `top` but return a response hint that it maps to `new`.

**Pros:**
- Backwards compatible
- No schema changes

**Cons:**
- Still ambiguous semantics

**Effort:** 1-2 hours

**Risk:** Low

## Recommended Action

TBD during triage.

## Technical Details

**Affected files:**
- `src/lib/validation.ts`
- `src/index.ts`

## Resources

- **Endpoint:** `GET /api/v1/posts/:id/comments`

## Acceptance Criteria

- [ ] API behavior matches documented sort options
- [ ] Tests cover comment sort behavior
- [ ] Documentation updated if API changes

## Work Log

### 2026-01-31 - Initial discovery

**By:** Codex

**Actions:**
- Noted mismatch between accepted sort values and SQL order
- Drafted solution options

**Learnings:**
- “Top” needs a clear scoring signal to be meaningful

## Notes

None.
