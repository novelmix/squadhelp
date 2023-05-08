UPDATE users SET balance = balance + 10 WHERE id IN (
  SELECT id FROM users WHERE role = 'creator' and rating > 0
  ORDER BY rating DESC
  LIMIT 3
)