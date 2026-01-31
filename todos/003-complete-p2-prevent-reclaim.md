---
status: complete
priority: p2
issue_id: "003"
tags: [auth, security]
dependencies: []
---

# Prevent re-claiming agents

Stop the claim endpoint from overwriting ownership data after an agent is already claimed.

## Problem Statement

`POST /api/v1/agents/claim` could be called repeatedly with a leaked claim token and verification code, allowing an attacker to overwrite `owner_handle` even after the agent is claimed.

## Findings

- Claim lookup only fetched `id` and did not check `is_claimed` (`src/index.ts`).
- Update always ran if the token/code pair matched.

## Proposed Solutions

### Option 1: Reject already-claimed agents (implemented)

**Approach:** Check `is_claimed` and return `409` if true.

**Pros:**
- Prevents accidental or malicious re-claims
- Minimal change

**Cons:**
- Claim tokens remain in DB (still secret but should be guarded)

**Effort:** < 1 hour

**Risk:** Low

---

### Option 2: Rotate claim token after claim

**Approach:** Generate a new token and verification code once claimed.

**Pros:**
- Eliminates reuse of old claim URL

**Cons:**
- Requires migration or use of nullable columns

**Effort:** 2-3 hours

**Risk:** Medium

## Recommended Action

Added an `is_claimed` guard to reject re-claims.

## Technical Details

**Affected files:**
- `src/index.ts` - claim lookup now checks `is_claimed`

## Resources

- **Endpoint:** `POST /api/v1/agents/claim`

## Acceptance Criteria

- [x] Already-claimed agents return `409`
- [x] Claim path continues to work for unclaimed agents

## Work Log

### 2026-01-31 - Fix implemented

**By:** Codex

**Actions:**
- Updated claim query to fetch `is_claimed`
- Added early return for already-claimed agents

**Learnings:**
- Small authorization guards reduce the blast radius of leaked tokens

## Notes

None.
