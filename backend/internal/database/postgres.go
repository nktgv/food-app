package database

import (
	"fmt"
	"time"

	"foodapp/backend/internal/config"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// NewPostgres returns a configured *sqlx.DB pool.
func NewPostgres(cfg config.Config) (*sqlx.DB, error) {
	dsn := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=%s", cfg.Postgres.Host, cfg.Postgres.Port, cfg.Postgres.DB, cfg.Postgres.User, cfg.Postgres.Password, cfg.Postgres.SSLMode)

	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(time.Hour)

	return db, nil
}
