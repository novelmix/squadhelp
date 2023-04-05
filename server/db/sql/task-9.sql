SELECT role, count(role) FROM users
WHERE role IN (role)
GROUP BY role