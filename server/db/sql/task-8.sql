CREATE TABLE conversations (
  id SERIAL,
  participants INTEGER[] NOT NULL,
  black_list BOOLEAN[] DEFAULT (ARRAY[false, false]) NOT NULL,
  favorite_list BOOLEAN[] DEFAULT (ARRAY[false, false]) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE catalogs (
  id SERIAL,
  user_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE messages (
  id SERIAL,
  user_id INT NOT NULL,
  conversation_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);
CREATE TABLE catalog_to_conversations (
  id SERIAL,
  catalog_id INT NOT NULL,
  conversation_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (catalog_id) REFERENCES catalogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);