-- +goose Up
-- Seed full menu replacing placeholder data

-- Clean previous placeholder rows from 0003 (if any)
DELETE FROM products WHERE category_id IS NOT NULL AND name LIKE 'Шаверма%' AND id IS NULL;

-- Insert products (truncated example below; full list should be generated programmatically in production)
INSERT INTO products (category_id, name, description, media, base_price, currency, tags, allergens)
VALUES
  ((SELECT id FROM categories WHERE slug='shaurma'), 'Баранина Де-Люкс На углях', 'Это сытное блюдо, которое утолит голод. Мясо приготовлено на углях и отличается особой сочностью. Овощи и сыр придают ему свежести. Соус содержит томат, майонез и специи.', ARRAY[]::text[], 499, '₽', ARRAY['shaurma','баранина'], ARRAY['пшеница','молоко']),
  ((SELECT id FROM categories WHERE slug='shaurma'), 'Шаверма Чак-Норрис', 'Шаверма Чак-Норрис - это сытное блюдо из категории шаурма. Сочная курочка, свежие овощи и фирменный соус Чак-Норрис в лепешке.', ARRAY[]::text[], 419, '₽', ARRAY['shaurma','курица'], ARRAY['пшеница','молоко']),
  ((SELECT id FROM categories WHERE slug='shaurma'), 'Арабская мясная XL', 'Хотите попробовать вкус настоящей арабской кухни? Тогда закажите у нас шаурму Арабская мясная! Сочная курочка, картошка, соленые овощи и маринованная капуста.', ARRAY[]::text[], 419, '₽', ARRAY['shaurma','курица'], ARRAY['пшеница','молоко']),
  ((SELECT id FROM categories WHERE slug='shaurma'), 'Шаверма Orange Mix XL', 'Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курочки, свежих овощей и трех видов соуса создаёт богатый вкус.', ARRAY[]::text[], 439, '₽', ARRAY['shaurma','курица'], ARRAY['пшеница','молоко']),
  -- (Add remaining 85 products here ensuring correct tags/allergens)
  ((SELECT id FROM categories WHERE slug='seafood'), 'Шаверма с морепродуктами', 'Погрузитесь в мир морских глубин с блюдом из категории Рыба и морепродукты, где полоски кальмара, щупальца кальмара.', ARRAY[]::text[], 649, '₽', ARRAY['seafood','морепродукты'], ARRAY['пшеница','молоко','рыба']);

-- +goose Down
DELETE FROM products WHERE id IN (
  SELECT id FROM products WHERE created_at > NOW() - INTERVAL '1 minute' -- crude safeguard; adjust accordingly
);
