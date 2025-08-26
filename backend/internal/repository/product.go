package repository

import (
	"context"

	"foodapp/backend/internal/domain"

	"github.com/jmoiron/sqlx"
)

type ProductRepository interface {
	List(ctx context.Context) ([]domain.Product, error)
	GetByID(ctx context.Context, id string) (*domain.Product, error)
}

// Postgres implementation

type productRepoPG struct {
	db *sqlx.DB
}

func NewProductRepositoryPG(db *sqlx.DB) ProductRepository {
	return &productRepoPG{db: db}
}

func (r *productRepoPG) List(ctx context.Context) ([]domain.Product, error) {
	products := []domain.Product{}
	err := r.db.SelectContext(ctx, &products, `SELECT id, name, description, base_price, currency, tags, allergens FROM products`)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (r *productRepoPG) GetByID(ctx context.Context, id string) (*domain.Product, error) {
	var p domain.Product
	err := r.db.GetContext(ctx, &p, `SELECT id, name, description, base_price, currency, tags, allergens FROM products WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}
	return &p, nil
}
