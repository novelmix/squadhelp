WITH cashback_customer_user as (
  SELECT sum((prize * 10 / 100)::INTEGER) as cashback, user_id FROM contests as c
  JOIN users as u ON c.user_id = u.id
  WHERE c.created_at BETWEEN '2023-12-25' AND '2024-01-14'
  GROUP BY c.user_id
) UPDATE users as u
SET balance = balance + cashback_customer_user.cashback
FROM cashback_customer_user
WHERE u.id = cashback_customer_user.user_id
AND u."role" = 'customer'