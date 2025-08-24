# Команды для запуска Food App

## 🚀 Быстрый старт (рекомендуется)

```bash
# 1. Установка всех зависимостей
npm run install:all

# 2. Запуск backend и mobile одновременно
npm run dev
```

## 📱 Альтернативные способы запуска

### Вариант 1: Docker Compose
```bash
# Запуск backend + PostgreSQL + Redis
docker-compose up -d

# Запуск mobile отдельно
cd mobile && npm start
```

### Вариант 2: Ручной запуск
```bash
# Terminal 1: Backend
cd backend && go run main.go

# Terminal 2: Mobile  
cd mobile && npm start
```

### Вариант 3: Только backend
```bash
npm run start:backend
```

### Вариант 4: Только mobile
```bash
npm run start:mobile
```

## 🛠️ Команды разработки

### Установка зависимостей
```bash
# Все зависимости
npm run install:all

# Только backend
cd backend && go mod tidy

# Только mobile
cd mobile && npm install
```

### Тестирование
```bash
# TypeScript проверка
npm run test:mobile

# Go тесты
npm run test:backend
```

### Сборка
```bash
# Backend
npm run build:backend

# Docker образ
docker build -t foodapp-backend ./backend
```

### Очистка
```bash
npm run clean
```

## 🔧 Docker команды

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f backend

# Остановка
docker-compose down

# Пересборка
docker-compose up --build

# Удаление всех контейнеров и образов
docker-compose down --rmi all --volumes
```

## 📱 Expo команды

```bash
cd mobile

# Запуск
npm start

# iOS симулятор
npm run ios

# Android эмулятор  
npm run android

# Web версия
npm run web

# Сборка для продакшена
expo build:android
expo build:ios
```

## 🔍 Отладка

### Проверка статуса
```bash
# Backend health check
curl http://localhost:8080/health

# API каталог
curl http://localhost:8080/api/catalog
```

### Логи
```bash
# Backend логи
cd backend && go run main.go

# Docker логи
docker-compose logs -f

# Expo логи
cd mobile && npm start
```

## 🐛 Решение проблем

### Mobile не подключается к backend
```bash
# Проверьте, что backend запущен
curl http://localhost:8080/health

# Для физических устройств измените API_BASE в mobile/src/api/client.ts
# EXPO_PUBLIC_API_BASE=http://<your-ip>:8080/api
```

### TypeScript ошибки
```bash
cd mobile && npx tsc --noEmit
```

### Go модули
```bash
cd backend && go mod tidy && go mod download
```

### Очистка кеша
```bash
# Expo кеш
cd mobile && npx expo start --clear

# Go кеш
cd backend && go clean -cache

# Docker кеш
docker system prune -a
```

## 📊 Мониторинг

### Порты
- Backend: http://localhost:8080
- Expo DevTools: http://localhost:8081
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Переменные окружения
```bash
# Создайте .env файл в корне проекта
BACKEND_PORT=8080
DATABASE_URL=postgresql://foodapp:foodapp123@localhost:5432/foodapp
REDIS_URL=redis://localhost:6379
EXPO_PUBLIC_API_BASE=http://localhost:8080/api
```

## 🚀 Продакшен деплой

### Backend
```bash
# Сборка
cd backend && go build -o foodapp-backend .

# Запуск
./foodapp-backend

# Docker
docker run -p 8080:8080 foodapp-backend
```

### Mobile
```bash
cd mobile

# Android APK
expo build:android

# iOS IPA
expo build:ios

# Web
expo build:web
```
