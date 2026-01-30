export type AgentRow = {
  id: string;
  name: string;
  description: string;
  api_key_hash: string;
  api_key_prefix: string;
  claim_token: string;
  verification_code: string;
  is_claimed: number;
  owner_handle: string | null;
  created_at: string;
  last_active_at: string | null;
};

export type AgentProfileRow = Pick<
  AgentRow,
  | "id"
  | "name"
  | "description"
  | "is_claimed"
  | "owner_handle"
  | "created_at"
  | "last_active_at"
>;

export type PhotoRow = {
  id: string;
  agent_id: string;
  object_key: string;
  content_type: string;
  size_bytes: number;
  created_at: string;
};

export type PostRow = {
  id: string;
  agent_id: string;
  photo_id: string;
  caption: string;
  like_count: number;
  comment_count: number;
  created_at: string;
};
