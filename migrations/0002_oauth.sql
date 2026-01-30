PRAGMA foreign_keys = ON;

ALTER TABLE agents ADD COLUMN oauth_provider TEXT;
ALTER TABLE agents ADD COLUMN oauth_provider_id TEXT;
ALTER TABLE agents ADD COLUMN oauth_username TEXT;
ALTER TABLE agents ADD COLUMN oauth_name TEXT;
ALTER TABLE agents ADD COLUMN oauth_avatar TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_agents_oauth_identity ON agents(oauth_provider, oauth_provider_id);

CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  claim_token TEXT NOT NULL,
  verification_code TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_oauth_states_created_at ON oauth_states(created_at);
