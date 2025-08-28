-- +goose Up
-- Add categories and seed full menu for MVP

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(128) NOT NULL,
    slug        VARCHAR(64) UNIQUE NOT NULL,
    icon        VARCHAR(16),
    sort        INT NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Add category_id to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);

-- 3. Seed categories (fixed uuids for deterministic references)
INSERT INTO categories (id, name, slug, icon, sort) VALUES
  ('00000000-0000-0000-0000-000000000101', 'Шаурма', 'shaurma', '🌯', 1),
  ('00000000-0000-0000-0000-000000000102', 'Закуски', 'snacks', '🍿', 2),
  ('00000000-0000-0000-0000-000000000103', 'Бургеры', 'burger', '🍔', 3),
  ('00000000-0000-0000-0000-000000000104', 'Напитки', 'drink', '🥤', 4),
  ('00000000-0000-0000-0000-000000000105', 'Соусы', 'sauces', '🍯', 5),
  ('00000000-0000-0000-0000-000000000106', 'Бабл Шаверма', 'bablshaurma', '🫧', 6),
  ('00000000-0000-0000-0000-000000000107', 'Десерты', 'dessert', '🍰', 7),
  ('00000000-0000-0000-0000-000000000108', 'Рыба и морепродукты', 'seafood', '🐟', 8);

-- 4. Seeding продуктов перенесено в миграцию 0005_seed_menu_json.sql
-- Здесь оставляем только категории и изменение схемы, чтобы избежать SQL-ошибок.

-- +goose Down
DELETE FROM products WHERE category_id IN (SELECT id FROM categories WHERE slug IN ('shaurma','snacks','burger','drink','sauces','bablshaurma','dessert','seafood'));
ALTER TABLE products DROP COLUMN IF EXISTS category_id;
DROP TABLE IF EXISTS categories;
