package service

import (
	"context"

	"foodapp/backend/internal/domain"
	"foodapp/backend/internal/repository"
)

type ProductService interface {
	List(ctx context.Context) ([]domain.Product, error)
	Get(ctx context.Context, id string) (*domain.Product, error)
}

type productSvc struct {
	repo repository.ProductRepository
}

func NewProductService(r repository.ProductRepository) ProductService {
	return &productSvc{repo: r}
}

func (s *productSvc) List(ctx context.Context) ([]domain.Product, error) {
	return s.repo.List(ctx)
}

func (s *productSvc) Get(ctx context.Context, id string) (*domain.Product, error) {
	return s.repo.GetByID(ctx, id)
}
