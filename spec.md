Версия: 1.0 • Дата: 20.08.2025 • Владелец: Product/Tech Lead

---

## **0. Краткое резюме проекта**

  

Мобильное приложение для заказа еды с каталогом, конструктором блюд (добавить/убрать ингредиенты), корзиной, оформлением заказа с тремя способами получения (доставка, самовывоз, «заказ в предприятии, забрать в зале»), личным кабинетом и реферально‑бонусной программой. Архитектура модульная, «как конструктор», переиспользуемая для разных брендов/сетей.

---

## **1. Цели и KPI**

### **1.1 Бизнес‑цели**

- Увеличение среднего чека на 10–15% за счёт доп. ингредиентов и апсейлов.
    
- Сокращение времени оформления заказа < 90 сек (P50) и < 150 сек (P90).
    
- Доля заказов в приложении ≥ 40% от всех заказов сети.


### **1.2 KPI продукта**

- CR добавления в корзину ≥ 12% от просмотров карточек.
    
- Успешные платежи ≥ 97% от попыток.
    
- Повторные покупки D30 ≥ 20%.
    
- LTV↑ за счёт реферальной системы и бонусов.


### **1.3 Ограничения**

- Time-to-MVP ≤ 10–12 недель.
    
- Бюджет MVP: условно N (TBD) с фокусом на re-use и модульность.

---

## **2. Область и сценарии (PRD)**

### **2.1 Основные пользовательские роли**

- **Гость**: просмотр каталога, сбор локальной корзины, регистрация/логин при оформлении.
    
- **Покупатель**: размещение заказов, управление профилем и адресами, использование бонусов, рефералка.
    
- **Оператор/менеджер** (админка): управление меню, ценами, акциями, Stories, заказами.
    
- **Курьер/партнёр** (опционально): подтверждение статусов доставки через интеграции.
  

### **2.2 Пользовательские сценарии (эпики → истории → критерии приёмки)**
**E1. Каталог и карточка товара**

- Просмотр категорий и товаров; фильтры (веган/острота/без глютена).
    
- Карточка товара: описание, фото, цена, ингредиенты.
    
- Конструктор: убрать/заменить/добавить ингредиенты, размеры/вариации.
    
- **AC**: изменения цены пересчитываются мгновенно; валидация лимитов модификаторов; кеширование картинок.
    

  

**E2. Корзина и расчёт**

- Увеличение/уменьшение количеств, редактирование кастомизаций.
    
- Промокоды, бонусы (до 99% покрытия), чаевые.
    
- **AC**: точность округления цен до валютного стандарта; одновременно применимы промо и бонусы по правилам приоритета.
    

  

**E3. Оформление заказа**

- Выбор способа получения: доставка / самовывоз / заказ в предприятии (забрать в зале).
    
- Адрес: ручной ввод, выбор из сохранённых, геолокация, валидация в зоне доставки.
    
- Выбор филиала для самовывоза (карта, расписание, ETA).
    
- Оплата: карточка (tokenized), Apple/Google Pay, оплата бонусами.
    
- **AC**: state machine заказа; авторизация/списание платежа; печать на кухню/передача в KDS; push/SMS статусы.
    

  

**E4. Личный кабинет**

- Профиль, история заказов, повтор заказа, адреса, способы оплаты.
    
- Баланс бонусов, транзакции кошелька.
    
- Реферальная программа: уникальный код/ссылка, статистика, начисления.
    
- **AC**: экспорт чеков/счётов; GDPR-процедуры (download/delete my data).
    

  

**E5. Главная + Stories**

- Лендинг внутри приложения: баннеры, подборки, акции.
    
- Stories: изображения/видео, заголовок, CTA, время жизни, таргетинг (опционально).
    
- **AC**: Stories кэшируются, уважают расписание публикации, клики трекаются.
    

  

**E6. Админ‑панель**

- CRUD меню/категорий/ингредиентов/модификаторов.
    
- Управление ценами, вариантами, расписаниями филиалов.
    
- Stories, промо, купоны, delivery‑зоны.
    
- Заказы: поиск, статусы, возвраты/частичные возвраты, ручные корректировки бонусов.
    
- Роли и права доступов (RBAC).
    

---

## **3. Нефункциональные требования**

- **Производительность**: TTFB API < 200 мс (P50), < 500 мс (P95). Каталог Offline‑First (кеш 24 ч, инкрементальные обновления).
    
- **Надёжность**: 99.9% uptime core API; graceful degradation при падении внешних сервисов (платежи, карты).
    
- **Безопасность**: OWASP ASVS/Mobile Top‑10; TLS 1.2+; хранение токенов по best practices; PII шифрование at rest.
    
- **Масштабируемость**: горизонтальное масштабирование API и очередей; read‑replicas БД.
    
- **Соответствие**: GDPR (DPA, DPIA, consent), PCI DSS SAQ‑A (при токенизации), налоговые требования (НДС/VAT).
    
- **Локализация**: i18n, формат валют и времени, мультивалютность (опц.).
    
- **Доступность**: WCAG 2.1 AA для цветовых контрастов и размеров шрифтов.
    

---

## **4. Архитектура (Solution Architecture)**

  

### **4.1 Компоненты**

- **Mobile App (React Native, TypeScript)**
    
    - Модули: Onboarding/Auth, Catalog, Product, Cart, Checkout, Delivery/Pickup, Profile, Wallet/Bonuses, Referrals, Stories, Notifications.
        
    - Стейт: Redux Toolkit/Zustand + RTK Query, нормализованные сущности.
        
    - Offline: local DB (SQLite/WatermelonDB) + background sync.
        
    
- **Backend API (Node.js + NestJS, TypeScript)**
    
    - REST/GraphQL (REST предпочтительно для интеграций), OpenAPI контракт.
        
    - Модули (DDD): Users, Auth, Menu, Pricing, Cart, Orders, Payments, Logistics, Wallet, Referrals, Promotions, Stories, Notifications, Admin, Reporting.
        
    - Асинхронщина: очереди (RabbitMQ/SQS), event‑driven (domain events).
        
    
- **DB**: PostgreSQL (основная), Redis (кеш/сессии/блокировки), S3‑совместимое хранилище медиа.
    
- **Admin Panel (Web)**: Next.js + NestJS Admin API, RBAC, аудит логов.
    
- **Интеграции**:
    
    - Платежи: Stripe/Mollie/Adyen (регионально).
        
    - Карты/геокодинг: Google Maps/Mapbox/Here.
        
    - Push: Firebase/OneSignal.
        
    - KDS/принтеры кухни: через вебхуки/партнёрские API.
        
    
- **Observability**: OpenTelemetry (traces), Prometheus (metrics), Loki/ELK (logs), Grafana (dashboards).
    

  

### **4.2 Диаграмма взаимодействий (словесно)**

  

App ↔ API (REST, JWT/refresh). API → Payments (tokenize, auth/capture). API → Queue → Kitchen service/KDS. API → Maps (ETA, distance). API ↔ DB. API → Push/SMS. Admin → Admin API → DB.

  

### **4.3 Состояния заказа (state machine)**

  

NEW → PAYMENT_AUTHORIZED → KITCHEN_CONFIRMED → IN_PREPARATION → READY_FOR_PICKUP → OUT_FOR_DELIVERY → DELIVERED

  

Ветви:

- Отмена: NEW | PAYMENT_AUTHORIZED | KITCHEN_CONFIRMED → CANCELED (с правилами возвратов).
    
- Отказ оплаты: NEW → PAYMENT_FAILED.
    
- Возврат: DELIVERED → REFUND_REQUESTED → REFUNDED (полный/частичный).
    

---

## **5. Модель данных (ключевые сущности)**

  

### **5.1 Меню/Каталог**

- **Category**(id, name, slug, order, is_active)
    
- **Product**(id, category_id, name, description, media[], base_price, sku, tax_rate_id, is_active, tags[])
    
- **Variant**(id, product_id, name, price_delta, size_code)
    
- **ModifierGroup**(id, name, min_select, max_select, required, applies_to_variant_ids[])
    
- **Modifier (Ingredient/Addon)**(id, group_id, name, price_delta, is_default, hides[])
    
- **Allergen**(id, code, label) • **ProductAllergen**(product_id, allergen_id)
    

  

### **5.2 Корзина/Заказ**

- **Cart**(id, user_id/null, session_id, totals, currency)
    
- **CartItem**(id, cart_id, product_id, variant_id, qty, item_price, modifiers[])
    
- **Order**(id, user_id, cart_snapshot, totals, status, type: delivery/pickup/dinein, store_id, scheduled_at?, currency, bonus_applied, promo_id?)
    
- **OrderItem**(id, order_id, … как CartItem snapshot)
    

  

### **5.3 Пользователи/Платежи/Адреса**

- **User**(id, phone/email, name, referral_code, referred_by?, consent_flags, delete_at?)
    
- **Address**(id, user_id, label, geo{lat,lng}, street, city, zip, intercom, comment)
    
- **PaymentMethod**(id, user_id, token, brand, last4, exp_month/year)
    
- **Transaction**(id, order_id, provider, type: AUTH/CAPTURE/REFUND, amount, status, raw_payload)
    

  

### **5.4 Бонусы/Рефералы**

- **Wallet**(id, user_id, balance)
    
- **WalletLedger**(id, wallet_id, type: EARN/SPEND/ADJUST/EXPIRE, amount, order_id?, referral_user_id?, created_at, expires_at?)
    
- **Referral**(referrer_user_id, referee_user_id, status: REGISTERED|FIRST_ORDER|ACTIVE, reward_rules_snapshot)
    

  

### **5.5 Прочее**

- **Story**(id, title, media_url, cta, deeplink, starts_at, ends_at, targeting_rules)
    
- **Promotion/Coupon**(id, code, rules, budget, active_range)
    
- **Store**(id, name, address, geo, open_hours, pickup_enabled, dinein_enabled, delivery_zones)
    
- **DeliveryZone**(id, store_id, polygon, min_order_amount, fee)
    

---

## **6. API контракт (основные эндпоинты, OpenAPI‑набросок)**

  

### **6.1 Аутентификация**

- POST /auth/request-otp { phone/email }
    
- POST /auth/verify-otp { phone/email, code } → { access_token, refresh_token }
    
- POST /auth/refresh { refresh_token }
    

  

### **6.2 Каталог**

- GET /catalog → категории + подборки.
    
- GET /products?category=...&filters=...
    
- GET /products/{id} → продукт + варианты + модификаторы + аллергенная информация.
    

  

### **6.3 Корзина**

- POST /cart → создать/получить активную корзину.
    
- POST /cart/items { product_id, variant_id?, qty, modifiers[] }
    
- PATCH /cart/items/{itemId} { qty?, modifiers? }
    
- POST /cart/apply-promo { code }
    
- POST /cart/apply-bonuses { amount }
    
- GET /cart/totals → пересчёт (server‑side pricing).
    

  

### **6.4 Оформление**

- POST /checkout/quote { cart_id, fulfillment_type, store_id?, address? } → { eta, fees, available_slots }
    
- POST /checkout/place { cart_id, payment_method, fulfillment_details, tips?, schedule? } → { order_id, payment_status }
    
- GET /orders/{id} → статус и таймлайн.
    
- Webhooks: /webhooks/payments, /webhooks/kitchen, /webhooks/courier.
    

  

### **6.5 Профиль/Адреса/Кошелёк**

- GET /me, PATCH /me
    
- GET /me/addresses, POST /me/addresses, …
    
- GET /me/wallet, GET /me/wallet/ledger
    

  

### **6.6 Рефералка**

- GET /referrals/my-code → { code, share_url }
    
- POST /referrals/apply { code } (при регистрации)
    
- GET /referrals/stats → приглашённые, начисления.
    

  

### **6.7 Stories**

- GET /stories?now=... → активные, с таргетингом по платформе/версии/гео.
    

  

> Полный OpenAPI.yaml генерируется из кода (NestJS Swagger) и используется для codegen мобильного клиента.

---

## **7. Правила ценообразования и расчётов**

  

### **7.1 Очерёдность применения**

1. Базовая цена + вариант (size) + модификаторы → subtotal
    
2. Промо/купон → скидка
    
3. Бонусы (к оплате — до 99% от **итого после скидки**, но без доставки/чаевых, если правило таково)
    
4. Доставка/сервисные сборы
    
5. Налоги/НДС (если не включён в цену)
    

  

### **7.2 Округления**

- Денежные операции — банковское округление к денежной единице.
    
- Бонусы — целые единицы (или две десятичные), настраивается.
    

  

### **7.3 Примеры**

- Чек 100.00, скидка купона 10% → 90.00. Бонусами можно покрыть до 89.10 (99%), остальное 0.90.
    

---

## **8. Реферально‑бонусная программа**

  

### **8.1 Бонусные правила**

- Начисление: **3%** от суммы покупок (после скидок, до доставки/чаевых — настраивается).
    
- Списание: до **99%** стоимости товаров (настраивается), нельзя ушедать сборы (по умолчанию).
    
- Срок жизни бонусов: по умолчанию 365 дней (конфиг).
    
- Антифрод: уникальность устройства + минимальный чек для начисления + задержка T+24h перед списанием начисленных бонусов.
    

  

### **8.2 Рефералка**

- Код реферера применяется при регистрации/первом заказе.
    
- Вознаграждения:
    
    - Реферер: 3% от заказов приглашённого (постоянно/первые N заказов — конфиг).
        
    - Реферал: приветственный бонус (фикс/процент) — конфиг.
        
    
- Ограничения: max начислений/месяц, антифрод-триггеры (одно платёжное средство/адрес/IP‑кластер).
    

  

### **8.3 Ledger‑модель**

  

Все движения по бонусам — только через **WalletLedger**; заказ хранит snapshot правил.

---

## **9. Интеграции и внешние сервисы**

- **Платежи**: Stripe/Mollie/Adyen — токенизация, 3DS, Auth‑Capture, Partial Refunds, Webhooks idempotent.
    
- **Карты/гео**: геокодинг адресов, построение зон доставки (polygons), расчёт ETA/дистанций.
    
- **Push/SMS**: транзакционные и маркетинговые каналы, отписки и frequency caps.
    
- **KDS/принтеры**: печать чеков/стикеров, подтверждения готовности.
    

---

## **10. Админ‑панель (подробно)**

- **Меню**: категории, продукты, варианты, модификаторы, аллегрены, медиа. Массовые операции, импорт/экспорт CSV.
    
- **Цены/раскладки**: прайс‑зоны, временные прайсы, happy hours.
    
- **Филиалы**: расписания, blackout dates, delivery‑зоны (редактор полигона), min‑order, fees.
    
- **Заказы**: поиск, фильтры по статусам, экспорт, ручная смена статусов (с аудитом).
    
- **Промо/купоны**: конструктор правил (Bogo, basket %, item %, fixed, bundle).
    
- **Stories**: планировщик, deeplinks (открыть категорию/товар/акцию).
    
- **Пользователи/кошельки**: корректировки с двойной авторизацией и комментарием причины.
    
- **Роли/доступы**: Admin/Content/Support/Finance.
    
- **Отчёты**: продажи, воронки, LTV, рефералка, возвраты.
    

---

## **11. Безопасность и соответствие**

- **Auth**: JWT access + refresh (rotating), device‑binding для refresh, короткий TTL.
    
- **PII**: шифрование колонок (pgcrypto/KMS).
    
- **Секреты**: Vault/Parameter Store, ни в коде.
    
- **ACL**: RBAC + атрибуты (ABAC) для филиалов.
    
- **Валидации**: server‑side для цен/скидок/бонусов (не доверять клиенту).
    
- **Rate limiting** и защита OTP.
    
- **GDPR**: consent storage, data export/delete, минимизация данных.
    
- **PCI DSS SAQ‑A**: только токены платежей, без хранения PAN.
    

---

## **12. Производительность, кеширование, офлайн**

- **Клиент**: каталог и сториз — кеш на диск; стратегии stale‑while‑revalidate.
    
- **API**: Redis на справочники (TTL, инвалидация по событиям).
    
- **CDN**: медиа через CDN, WebP/AVIF.
    
- **Прайсинг**: server‑side calc + idempotency key.
    
- **Batching**: N+1 избегается (JOINs, кеши, dataloaders для GraphQL при необходимости).
    

---

## **13. Тестирование и качество**

- **Юнит‑тесты**: 70%+ критических модулей (Pricing, Wallet, Orders).
    
- **Интеграционные**: API + БД + очереди (Testcontainers).
    
- **Контрактные**: Pact (провайдер API ↔ мобильный клиент).
    
- **E2E мобильные**: Detox/Appium.
    
- **Нагрузочные**: k6 для checkout/каталога.
    
- **Безопасность**: SAST/DAST, dependency scanning.
    
- **QA**: тест‑планы по эпикам, чек‑листы регрессии, smoke после деплоя.
    

---

## **14. DevEx: репо, CI/CD, ветвление**

- **Monorepo** (pnpm workspaces): mobile, api, admin, shared‑libs (contracts/types).
    
- **CI**: GitHub Actions — lint, tests, build, Docker, SAST.
    
- **CD**: staging/prod, blue‑green/rolling, миграции БД (Prisma/TypeORM).
    
- **Git‑flow**: trunk‑based, feature branches, PR checks, codeowners.
    
- **Версионирование**: semantic‑release, Канареечные релизы для мобилы (Firebase App Distribution/TestFlight).
    

---

## **15. Фичефлаги и конфигурация**

- **Feature Flags**: Unleash/ConfigCat/LaunchDarkly для включения рефералок/сториз/новых платежей.
    
- **Remote Config**: лимиты бонусов, пороги минимального чека, расписания.
    

---

## **16. Локализация, дизайн‑система, доступность**

- **Дизайн‑система**: UI kit (Figma) → tokens → RN components; dark mode.
    
- **A11y**: larger text, screen readers, контрасты, hit‑areas ≥ 44pt.
    
- **Правила UX**: оформлять заказ ≤ 5 экранов, прогресс‑индикатор, сохранение состояния при краше.
    

---

## **17. Аналитика и события (Product Analytics)**

- Инструменты: Amplitude/Mixpanel + server events.
    
- **Ключевые события**: app_open, view_category, view_product, add_to_cart, start_checkout, apply_promo, apply_bonus, select_fulfillment, payment_attempt, order_placed, order_status_changed, story_view, story_click, referral_share, referral_apply.
    
- UTM/Deeplinks для Stories/рефералок.
    

---

## **18. План работ (по очередности)**

  

### **Этап 0 — Подготовка (1 нед.)**

- Выбор стека/провайдеров (платежи, карты, пуш).
    
- Настройка репо, CI/CD, IaC (Terraform частично), окружения (dev/stage/prod).
    
- Базовые scaffold‑проекты (mobile, api, admin), дизайн‑черновики.
    

  

### **Этап 1 — MVP ядро (4–5 нед.)**

1. **Каталог и карточка** (API + мобила): сущности, фильтры, офлайн‑кеш.
    
2. **Корзина/прайсинг** (server‑side calc, модификаторы).
    
3. **Checkout** (quote → place, валидаторы зон/расписаний).
    
4. **Платежи** (tokenize, auth‑capture, webhooks).
    
5. **Личный кабинет (база)** + адреса.
    
6. **Админка (база)**: меню, цены, заказы (read‑only на старте).
    

  

### **Этап 2 — Расширение (3–4 нед.)**

7. **Stories** (админ, клиент, аналитика).
    
8. **Рефералка/бонусы** (кошелёк, ledger, списания до 99%).
    
9. **Push/SMS** (статусы заказов, маркетинговые — фичефлаг).
    
10. **Отчётность/мониторинг** (dashboards).
    

  

### **Этап 3 — Полировка (2–3 нед.)**

11. Фильтры/рекомендации, UX‑улучшения, анимации.
    
12. Антифрод правил, rate limits, безопасная админка.
    
13. Нагрузочное тестирование, баг‑фикс, релиз в сторах.
    

---

## **19. Риски и подводные камни**

- **Инфляция требований**: фиксировать MVP scope, фичефлаги для остального.
    
- **Сложность модификаторов**: валидаторы min/max, несовместимости (hides), каскады цен.
    
- **Платёжные edge‑cases**: 3DS timeouts, дубли вебхуков (idempotency).
    
- **Зоны доставки**: точность геокодинга, дрейф адресов, большие полигоны (перфоманс).
    
- **Офлайн‑стейт**: конфликты при синхронизации корзины.
    
- **Фрод рефералок**: мультиаккаунты, возвраты после начислений → отложенное начисление T+24h.
    

---

## **20. Definition of Done / Release Checklist**

- Code reviewed, 0 high/critical в SAST/DAST.
    
- 95% успешных платёжных флоу на staging с тестовыми картами.
    
- Нагрузочный тест: 300 rps checkout P95 < 700 мс.
    
- Crash‑free sessions ≥ 99.5% на бете.
    
- Полные инструкции On‑call, runbooks, алерты.
    

---

## **21. Примеры контрактов (JSON)**

  

### **21.1 Product (GET /products/{id})**

```
{
  "id": "p_123",
  "name": "Маргарита",
  "description": "Классическая пицца",
  "media": ["https://cdn/.../p_123.webp"],
  "base_price": 8.5,
  "currency": "EUR",
  "variants": [
    {"id":"v_small","name":"25 см","price_delta":0},
    {"id":"v_large","name":"35 см","price_delta":4.0}
  ],
  "modifier_groups": [
    {
      "id": "mg_cheese",
      "name": "Сыры",
      "min_select": 0,
      "max_select": 3,
      "required": false,
      "modifiers": [
        {"id":"m_mozz","name":"Моцарелла","price_delta":1.0,"is_default":true},
        {"id":"m_parm","name":"Пармезан","price_delta":1.5}
      ]
    }
  ],
  "allergens": ["gluten", "milk"],
  "tags": ["vegetarian"]
}
```

### **21.2 Cart totals (GET /cart/totals)**

```
{
  "items": [
    {
      "item_id": "ci_1",
      "product_id": "p_123",
      "variant_id": "v_large",
      "qty": 2,
      "unit_price": 12.5,
      "modifiers_total": 2.5,
      "line_subtotal": 30.0
    }
  ],
  "subtotal": 30.0,
  "discounts": 3.0,
  "bonuses_applied": 9.9,
  "fees": 2.0,
  "tax": 0.0,
  "total": 19.1,
  "currency": "EUR"
}
```

---

## **22. SQL‑набросок (PostgreSQL, упрощённо)**

```
create table users (
  id uuid primary key,
  phone text unique,
  email text unique,
  name text,
  referral_code text unique,
  referred_by uuid references users(id),
  created_at timestamptz default now()
);

create table wallets (
  id uuid primary key,
  user_id uuid references users(id),
  balance numeric(12,2) not null default 0
);

create table wallet_ledger (
  id uuid primary key,
  wallet_id uuid references wallets(id),
  type text check (type in ('EARN','SPEND','ADJUST','EXPIRE')),
  amount numeric(12,2) not null,
  order_id uuid,
  referral_user_id uuid,
  expires_at timestamptz,
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key,
  name text,
  slug text unique,
  is_active boolean default true,
  sort int default 0
);

-- и т.д. для products, variants, modifiers, orders, order_items
```

---

## **23. Руководство по разработке (код‑стайл, структуры)**

- **Backend**: NestJS модули по доменам; контроллеры → сервисы → репозитории; DTO валидации (class‑validator); Prisma/TypeORM Migrations.
    
- **Mobile**: фиче‑папки; UI компоненты атомарные; RTK Query для API; error boundaries; deep links.
    
- **Admin**: Next.js, серверные рендеры там, где уместно; form‑генераторы для сущностей.
    

---

## **24. План релизов и маршрутизация фич**

- **v1.0 (MVP)**: каталог, корзина, checkout, платежи, профиль, адреса, админка базовая.
    
- **v1.1**: Stories, аналитика, push.
    
- **v1.2**: Рефералка/бонусы.
    
- **v1.3**: Акции‑конструктор, рекомендации.
    

---

## **25. Гайд по деплою и окружениям**

- **Envs**: dev (feature flags свободны), staging (прод‑подобные интеграции), prod.
    
- **Секреты**: через Secrets Manager; разные ключи на окружение.
    
- **БД миграции**: только через CI, строго версионированные.
    
- **Rollbacks**: сохранять обратимые миграции, фича‑флаги для мгновенного отключения.
    

---

## **26. Runbooks (операции)**

- **Платёж упал**: проверить вебхук, idempotency key, состояние транзакции у провайдера; не менять заказ вручную без синхронизации.
    
- **Завис чек на кухне**: ретраи события, проверка очереди/консюмера, ручной перевод с записью в аудит.
    
- **Авария карт/гео**: флаг выключает доставку, доступен только самовывоз.
    

---

## **27. Чек‑листы UX и контента**

- Фото WebP/AVIF ≥ 1200px, сжатие ≤ 200KB, alt‑тексты.
    
- Названия и описания без caps‑lock, allergens явно.
    
- Story: 1080×1920, ≤ 2MB, CTA обязателен, deeplink протестирован.
    

---

## **28. Расширяемость и «конструкторность»**

- Темизация (бренды): конфиги стилей/логотипов/палитры, мульти‑тенант в БД.
    
- Плагины правил ценообразования/промо (стратегия + DSL на JSON).
    
- Провайдеры платежей/карт — смена через интерфейсы (ports/adapters).
    
- Экспорт меню/заказов для сторонних систем (CSV/JSON, webhooks).
    

---

## **29. Приложения (упрощённые диаграммы)**

- ERD, state machine, sequence diagrams — к версии 1.1 документа, формируются в PlantUML/Structurizr на базе моделей.
    

---

### **Заключение**

  

Документ определяет достаточный объём для начала разработки и безопасного выхода MVP. Все параметры программы лояльности, лимиты и интеграции — через конфиг и фичефлаги, что обеспечивает переиспользуемость и масштабирование под разные бренды/регионы.
