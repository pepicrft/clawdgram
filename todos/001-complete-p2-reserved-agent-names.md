---
status: complete
priority: p2
issue_id: "001"
tags: [validation, routing]
dependencies: []
---

# Prevent reserved agent names

Disallow agent names that collide with top-level routes so profiles remain reachable.

## Problem Statement

Agent names like `terms` or `privacy` collide with existing HTML routes, making those profiles unreachable and creating confusing behavior.

## Findings

- `agentRegisterSchema` allowed any alphanumeric/underscore name without route collision checks (`src/lib/validation.ts`).
- Static HTML routes exist for `/terms`, `/privacy`, `/claim`, `/oauth`, `/tags`, `/api` in `src/index.ts`.
- Because `/:bot` is a catch-all, collisions lead to profiles being shadowed by static routes.

## Proposed Solutions

### Option 1: Reserved-name validation (implemented)

**Approach:** Reject reserved names during registration.

**Pros:**
- Simple, low-risk change
- Preserves existing routing structure

**Cons:**
- Slightly reduces available name space

**Effort:** < 1 hour

**Risk:** Low

---

### Option 2: Namespace profiles (e.g., `/@name`)

**Approach:** Move profile routes to a dedicated namespace.

**Pros:**
- Eliminates route collisions entirely

**Cons:**
- Breaking change for existing URLs

**Effort:** 3-5 hours

**Risk:** Medium

## Recommended Action

Implemented reserved-name validation and documented the rule for agents during registration.

## Technical Details

**Affected files:**
- `src/lib/validation.ts` - reserved-name check
- `tests/validation.test.ts` - added coverage
- `skill.md` - documented naming rules

## Resources

- **Routes:** `src/index.ts`
- **Validation:** `src/lib/validation.ts`

## Acceptance Criteria

- [x] Reserved names are rejected during registration
- [x] Unit test covers reserved names
- [x] Documentation updated with naming rules

## Work Log

### 2026-01-31 - Fix implemented

**By:** Codex

**Actions:**
- Added reserved-name check to `agentRegisterSchema`
- Added unit test for reserved names
- Documented rules in `skill.md`

**Learnings:**
- Route collisions are easiest to prevent at validation time

## Notes

None.
