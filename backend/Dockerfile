FROM golang:1.24-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY go.mod go.sum ./

# Скачиваем зависимости
RUN go mod download

# --- install goose ---
RUN go install github.com/pressly/goose/v3/cmd/goose@latest

# Копируем исходный код
COPY . .

# Собираем приложение
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o foodapp-backend .

# Финальный образ
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Копируем бинарный файл и goose из builder
COPY --from=builder /app/foodapp-backend .
COPY --from=builder /go/bin/goose /usr/local/bin/goose

# Копируем миграции
COPY migrations ./migrations

# Открываем порт
EXPOSE 8080

# Запускаем приложение
CMD ["./foodapp-backend"]
