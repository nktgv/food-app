-- +goose Up
-- Seed full menu using JSON array → INSERT SELECT (89 items)

WITH raw(json_data) AS (
    SELECT $json$
[
  {"category":"shaurma","name":"Баранина Де-Люкс На углях","description":"Это сытное блюдо, которое утолит голод. Мясо приготовлено на углях и отличается особой сочностью. Овощи и сыр придают ему свежести. Соус содержит томат, майонез и специи.","base_price":499,"currency":"₽","tags":["shaurma","баранина"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Чак-Норрис","description":"Шаверма Чак-Норрис - это сытное блюдо из категории шаурма. Сочная курочка, свежие овощи и фирменный соус Чак-Норрис в лепешке.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Арабская мясная XL","description":"Хотите попробовать вкус настоящей арабской кухни? Тогда закажите у нас шаурму Арабская мясная! Сочная курочка, картошка, соленые овощи и маринованная капуста.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Orange Mix XL","description":"Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курочки, свежих овощей и трех видов соуса создаёт богатый вкус.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Манго-чили XL","description":"Ищете новое гастрономическое приключение? Попробуйте наше блюдо из категории шаурма. Сочная курочка, свежие овощи, фирменный манго-чили соус.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Триумф XL","description":"Шаверма Триумф - это сытное блюдо из категории шаурма. Сочная курочка, свежие овощи и три оригинальных соуса в тонком лаваше.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Гриль-люкс с мраморной говядиной на углях","description":"Сочная мраморная говядина, гриль-болгарский перец, гриль-красный лук, свежие овощи, фирменный чесночный соус, фирменный соус.","base_price":499,"currency":"₽","tags":["shaurma","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Карри XL","description":"Это сытное блюдо, которое отлично утолит голод. Мясо курицы мягкое и сочное, овощи свежие и хрустящие. Два соуса придают вкус.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Дубай с грецким орехом XL","description":"Сытное блюдо из категории Шаурма с нежным мясом курицы, свежими овощами, грецким орехом и пикантным соусом в тонкой лепешке.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко","орехи"]},
  {"category":"shaurma","name":"Шаверма Песто итальяно","description":"Если вы любите морепродукты, то вам обязательно стоит попробовать эту шаурму.","base_price":519,"currency":"₽","tags":["shaurma","морепродукты"],"allergens":["пшеница","молоко","рыба"]},
  {"category":"shaurma","name":"Япона Мама Терияки XL","description":"Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курочки и овощей.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко","соя"]},
  {"category":"shaurma","name":"Шаверма по-русски XL","description":"Сочная курица, ароматная морковь по-корейски, хрустящая капуста и картофель фри.","base_price":449,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма По-питерски XL","description":"Шаверма по-питерски с курицей, картофелем фри, свежими овощами и соусами.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Гранат spicy (острая) XL","description":"Сочная курочка, нежный сыр чеддер, свежие овощи и пряные соусы - всё это завернуто в лаваш.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Хижина в лесу XL","description":"Внутри нежной лепешки - ароматная курочка с овощами и соусом. Сочетание трав и специй делает блюдо особенным.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма с дымком XL","description":"Сочная курочка, пикантный соус BBQ, свежие овощи и фирменный лаваш.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Длинная классика","description":"Шаверма Длинная классика - это сытное блюдо. Сочная курочка, свежие овощи, фирменный чесночный соус и тонкий лаваш.","base_price":409,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма на тарелке Big Size XXL с картошкой фри","description":"Порция XXL с картофелем фри на тарелке.","base_price":649,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Острая мраморная говядина на углях","description":"Шаверма с мраморной говядиной.","base_price":519,"currency":"₽","tags":["shaurma","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Греческая XL","description":"Гармоничное сочетание курочки и овощей.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма коченая XL","description":"Курица, копченый сыр, свежие овощи.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Самурай XL (терияки)","description":"Яркие вкусы азиатского соуса.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко","соя"]},
  {"category":"shaurma","name":"Шаверма Брюс Ли XL","description":"Шаверма с азиатскими соусами.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма BBQ spicy (острая) XL","description":"Большая острая шаурма с BBQ.","base_price":419,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Сочный гранат XL","description":"Курочка, моцарелла, овощи, пикантные соусы.","base_price":439,"currency":"₽","tags":["shaurma","курица"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Шальная креветка","description":"Креветки в панировке, свежие овощи.","base_price":499,"currency":"₽","tags":["shaurma","морепродукты"],"allergens":["пшеница","молоко","рыба"]},
  {"category":"shaurma","name":"Шаверма Жоль Моцарелла с грибами XL","description":"С грибами и моцареллой.","base_price":439,"currency":"₽","tags":["shaurma","грибы"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма Сыр-бор (много сыра) XL","description":"Курочка, овощи и много сыра.","base_price":439,"currency":"₽","tags":["shaurma","сыр"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаурма в сырном лаваше с картошечкой по-домашнему XL","description":"Сочный курочка, фирменные соусы, картофель.","base_price":409,"currency":"₽","tags":["shaurma","картофель"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"В лаваше с картошечкой по-домашнему XL","description":"Курочка, картошка, овощи, фирменный соус.","base_price":409,"currency":"₽","tags":["shaurma","картофель"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Де-люкс Мраморная говядина на углях","description":"Мраморная говядина де-люкс, свежие овощи.","base_price":499,"currency":"₽","tags":["shaurma","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Чили острая XL","description":"Пикантная курочка с овощами.","base_price":439,"currency":"₽","tags":["shaurma","острая"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма в лаваше XL","description":"Классическая шаверма с курицей.","base_price":389,"currency":"₽","tags":["shaurma","классическая"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма по-сирийски двойная острая","description":"Курочка, картошка, аджика, свежие овощи.","base_price":389,"currency":"₽","tags":["shaurma","острая"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма на тарелке XXL","description":"Большая порция шавермы на тарелке.","base_price":549,"currency":"₽","tags":["shaurma","большая"],"allergens":["пшеница","молоко"]},
  {"category":"shaurma","name":"Шаверма в сырном лаваше XL","description":"Сочная курочка и сырный лаваш.","base_price":399,"currency":"₽","tags":["shaurma","сыр"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Шарики Сырные Моцарелла","description":"Сырные шарики — идеальная закуска для большой компании! В порции 6 шариков.","base_price":399,"currency":"₽","tags":["snacks","сыр"],"allergens":["молоко","пшеница"]},
  {"category":"snacks","name":"Луковые колечки","description":"7 шт. Хрустящие луковые колечки в золотистой панировке.","base_price":299,"currency":"₽","tags":["snacks","лук"],"allergens":["пшеница"]},
  {"category":"snacks","name":"Crazy Box Айдахо","description":"Сочная курица с картофелем и фирменными соусами в удобной коробочке.","base_price":469,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Картофель по-деревенски","description":"Золотистый картофель, приготовленный по-деревенски с ароматными специями.","base_price":299,"currency":"₽","tags":["snacks","картофель"],"allergens":[]},
  {"category":"snacks","name":"Crazy Box Манго-Чили","description":"Сочная курочка и картошка с фирменным манго-чили соусом.","base_price":439,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Сырный Box","description":"Курочка, тягучий сырный соус и нежный сыр.","base_price":449,"currency":"₽","tags":["snacks","сыр"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy box по-русски","description":"Crazy box по-русски – курица, картофель по-домашнему, маринованные овощи.","base_price":419,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy Box Батька Питер","description":"Курочка и картошечка по-домашнему.","base_price":419,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy Box Батька Карри","description":"Курочка, картошка, сыр моцарелла.","base_price":439,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy Box Батька Дубай","description":"Курочка, моцарелла, жареный лук.","base_price":449,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy box Ниндзя","description":"Нежное куриное филе и моцарелла со сладко-солёным вкусом соевого соуса.","base_price":439,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко","соя"]},
  {"category":"snacks","name":"Crazy Box Pesto","description":"Курочка, картошка по-домашнему, моцарелла с соусом песто.","base_price":499,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Spicy-Box","description":"Нежная моцарелла, курица, пикантный лук и острый халапеньо.","base_price":439,"currency":"₽","tags":["snacks","острая"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Гриб-Box","description":"Курица, шампиньоны, моцарелла под грибным соусом.","base_price":439,"currency":"₽","tags":["snacks","грибы"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy Box Говядина","description":"Нежная говядина с картошкой и моцареллой в коробочке.","base_price":499,"currency":"₽","tags":["snacks","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Crazy box от Батьки","description":"Аппетитная закуска с курицей и фирменными соусами.","base_price":419,"currency":"₽","tags":["snacks","курица"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Картошка от Батьки","description":"Картошка по-домашнему с зеленью и красной паприкой.","base_price":199,"currency":"₽","tags":["snacks","картофель"],"allergens":[]},
  {"category":"snacks","name":"Шримп-box","description":"Креветки в панировке, картошка фри и три соуса.","base_price":599,"currency":"₽","tags":["snacks","креветки"],"allergens":["рыба","молоко","пшеница"]},
  {"category":"snacks","name":"Сырные палочки моцарелла","description":"Хрустящие снаружи и мягкие внутри палочки из моцареллы.","base_price":399,"currency":"₽","tags":["snacks","сыр"],"allergens":["молоко","пшеница"]},
  {"category":"snacks","name":"Креветочки в панировке","description":"Сочные креветки (5 шт) в золотистой панировке.","base_price":499,"currency":"₽","tags":["snacks","креветки"],"allergens":["рыба","пшеница"]},
  {"category":"snacks","name":"Crazy Box Free","description":"Сытная закуска без мяса для вегетарианцев и не только.","base_price":439,"currency":"₽","tags":["snacks","вегетарианская"],"allergens":["пшеница","молоко"]},
  {"category":"snacks","name":"Картофель фри","description":"Классический картофель фри, золотистый и хрустящий.","base_price":249,"currency":"₽","tags":["snacks","картофель"],"allergens":[]},
  {"category":"burger","name":"Бургер Dolce Vita","description":"Элегантный бургер с изысканными ингредиентами.","base_price":599,"currency":"₽","tags":["burger","премиум"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Тропический","description":"Классический бургер, яркий вкус; говядина с ананасом.","base_price":499,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Папа Песто","description":"Бургер с мраморной говядиной, булочка бриош и фирменный соус песто.","base_price":599,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Альпийский бургер","description":"Вдохновлённый альпийскими травами бургер.","base_price":599,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Пацанский","description":"Простой и сытный бургер для настоящих мужчин.","base_price":499,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Фермерский","description":"Натуральные фермерские продукты в одном бургере.","base_price":499,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Папа сыр","description":"Двойная порция сыра для любителей.","base_price":549,"currency":"₽","tags":["burger","сыр"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"БигБургер","description":"Мраморная говядина, три соуса, хрустящий салат.","base_price":699,"currency":"₽","tags":["burger","большой"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Вестерн","description":"Бургер на углях из мраморной говядины.","base_price":499,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Мехико","description":"Говядина, овощи, фирменный соус, ароматная булочка.","base_price":499,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"burger","name":"Бургер Олд Фешен","description":"Мраморная говядина, сыр чеддер, свежие овощи, ароматная булочка.","base_price":499,"currency":"₽","tags":["burger","говядина"],"allergens":["пшеница","молоко"]},
  {"category":"drink","name":"Морс Черная смородина Фирменная","description":"Черная смородина и сок, вода, сахар.","base_price":150,"currency":"₽","tags":["drink","морс"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Байкал","description":"Освежающий напиток Байкал.","base_price":150,"currency":"₽","tags":["drink","газировка"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Кола без сахара","description":"Кола без сахара.","base_price":150,"currency":"₽","tags":["drink","кола"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Лимонад","description":"Сладкий лимонад с кислинкой.","base_price":150,"currency":"₽","tags":["drink","лимонад"],"allergens":[]},
  {"category":"drink","name":"Черноголовка кола лайм-мята","description":"Кола лайм-мята – освежающий вкус.","base_price":120,"currency":"₽","tags":["drink","кола"],"allergens":[]},
  {"category":"drink","name":"Черноголовка дикий апельсин юдзу","description":"Освежающий апельсин юдзу.","base_price":120,"currency":"₽","tags":["drink","апельсин"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Кола","description":"Классическая кола.","base_price":150,"currency":"₽","tags":["drink","кола"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Дюшес","description":"Газировка со вкусом дюшес.","base_price":150,"currency":"₽","tags":["drink","дюшес"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Лимон-лайм-лемонграсс","description":"Лимон-лайм-лемонграсс – эксперименты со вкусом.","base_price":120,"currency":"₽","tags":["drink","лимон"],"allergens":[]},
  {"category":"drink","name":"Черноголовка Кола (банка)","description":"Кола в удобной банке.","base_price":120,"currency":"₽","tags":["drink","кола"],"allergens":[]},
  {"category":"sauces","name":"1000 островов","description":"Соус морской.","base_price":59,"currency":"₽","tags":["sauces","морской"],"allergens":["молоко"]},
  {"category":"sauces","name":"Соус Сырный","description":"Кремовый сырный соус.","base_price":59,"currency":"₽","tags":["sauces","сыр"],"allergens":["молоко"]},
  {"category":"sauces","name":"Соус Барбекю Heinz","description":"Классический соус барбекю Heinz.","base_price":59,"currency":"₽","tags":["sauces","барбекю"],"allergens":[]},
  {"category":"sauces","name":"Соус Коктейльчик","description":"Микс BBQ, чесночного соуса и острой аджики.","base_price":79,"currency":"₽","tags":["sauces","коктейль"],"allergens":["молоко"]},
  {"category":"sauces","name":"Острый","description":"Острый соус шрирача.","base_price":59,"currency":"₽","tags":["sauces","острый"],"allergens":[]},
  {"category":"sauces","name":"Чесночный фирменный","description":"Чесночный соус на кефирной основе без майонеза.","base_price":49,"currency":"₽","tags":["sauces","чеснок"],"allergens":["молоко"]},
  {"category":"sauces","name":"Сладкий чили","description":"Соус сладкий чили.","base_price":59,"currency":"₽","tags":["sauces","чили"],"allergens":[]},
  {"category":"bablshaurma","name":"Бабл Шаверма Манго","description":"Курочка, свежие овощи и манго-соусы.","base_price":539,"currency":"₽","tags":["bablshaurma","манго"],"allergens":["пшеница","молоко"]},
  {"category":"dessert","name":"Турецкая пахлава шоколадная","description":"Традиционная турецкая пахлава с шоколадом.","base_price":150,"currency":"₽","tags":["dessert","пахлава"],"allergens":["пшеница","молоко","орехи"]},
  {"category":"seafood","name":"Шаверма с морепродуктами","description":"Шаверма с морепродуктами, кальмар.","base_price":649,"currency":"₽","tags":["seafood","морепродукты"],"allergens":["пшеница","молоко","рыба"]}
]
$json$::jsonb
)
, items AS (
    SELECT jsonb_array_elements(json_data) AS item FROM raw
)
INSERT INTO products (category_id,name,description,media,base_price,currency,tags,allergens)
SELECT
  (SELECT id FROM categories WHERE slug = item->>'category'),
  item->>'name',
  item->>'description',
  ARRAY[]::text[],
  (item->>'base_price')::numeric,
  item->>'currency',
  (SELECT COALESCE(array_agg(value::text), ARRAY[]::text[]) FROM jsonb_array_elements_text(item->'tags')),
  (SELECT COALESCE(array_agg(value::text), ARRAY[]::text[]) FROM jsonb_array_elements_text(item->'allergens'))
FROM items;

-- +goose Down
DELETE FROM products WHERE name IN (
  SELECT item->>'name' FROM (
    SELECT jsonb_array_elements($json$[]$json$::jsonb) item) sub
);
