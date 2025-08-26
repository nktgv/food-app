-- +goose Up
-- Seed demo data

INSERT INTO products (id, name, description, media, base_price, currency, tags)
VALUES ('00000000-0000-0000-0000-000000000001', 'Маргарита', 'Классическая пицца с томатами и сыром', ARRAY['https://example.com/margarita.jpg'], 7.90, 'EUR', ARRAY['vegan']);

INSERT INTO variants (product_id, name, price_delta)
VALUES ('00000000-0000-0000-0000-000000000001', 'Большая', 2.00),
       ('00000000-0000-0000-0000-000000000001', 'Средняя', 0.00);

INSERT INTO modifier_groups (product_id, name, min_select, max_select, required)
VALUES ('00000000-0000-0000-0000-000000000001', 'Соусы', 0, 2, false);

-- capture generated group id
WITH grp AS (
    SELECT id FROM modifier_groups WHERE product_id='00000000-0000-0000-0000-000000000001' LIMIT 1
)
INSERT INTO modifiers (group_id, name, price_delta, is_default)
SELECT id, 'Томатный', 0.00, true FROM grp UNION ALL
SELECT id, 'Чесночный', 0.50, false FROM grp;

-- +goose Down
DELETE FROM modifiers;
DELETE FROM modifier_groups;
DELETE FROM variants;
DELETE FROM products WHERE id='00000000-0000-0000-0000-000000000001';
