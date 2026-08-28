CREATE TABLE IF NOT EXISTS supporters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  supporter_type TEXT NOT NULL CHECK (supporter_type IN ('citizen', 'public_official', 'expert', 'organization')),
  role_title TEXT NOT NULL DEFAULT '',
  organization TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  email_normalized TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL CHECK (locale IN ('pt', 'en')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  consent_version TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_supporters_status_published_at
ON supporters(status, published_at DESC);
