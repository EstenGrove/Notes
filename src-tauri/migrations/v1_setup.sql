-- We store various settings, like the theme, language, local folder path to store the notes on disk etc.
CREATE TABLE
  IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

-- The notes are stored on disk, but we keep a reference to them in the db for ease of access
CREATE TABLE
  IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT 'Untitled',
    file_name TEXT NOT NULL UNIQUE, -- No path, just the file name (eg. 'Docker_Common_Commands.md')
    content TEXT NOT NULL DEFAULT '',
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_viewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

-- Tags for notes (eg categories, keywords etc.)
CREATE TABLE
  IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    file_count INTEGER NOT NULL DEFAULT 0
  );

-- Associate note to tag(s)
CREATE TABLE
  IF NOT EXISTS note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id)
  );

-- User favorite notes
CREATE TABLE
  IF NOT EXISTS favorites (
    note_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (note_id)
  );

CREATE TABLE
  recently_viewed (
    id INTEGER NOT NULL, -- noteID or tagID
    type TEXT NOT NULL, -- "note" or "tag"
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id, type, created_at),
    INDEX (created_at)
  )