package router

import (
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"

	"foodapp/backend/internal/config"
	h "foodapp/backend/internal/handler"
	"foodapp/backend/internal/middleware"
	"foodapp/backend/internal/repository"
	"foodapp/backend/internal/service"
)

func New(db *sqlx.DB, cfg config.Config) *gin.Engine {
	r := gin.Default()

	// Middlewares
	r.Use(middleware.CORS())

	r.GET("/health", h.Health)

	api := r.Group("/api")

	// Catalog routes using DB-backed implementation
	productRepo := repository.NewProductRepositoryPG(db)
	productSvc := service.NewProductService(productRepo)
	catalogHandler := h.NewCatalogHandler(productSvc)

	api.GET("/products", catalogHandler.ListProducts)
	api.GET("/products/:id", catalogHandler.GetProduct)

	// Cart
	api.POST("/cart", h.HandleCartCreate)
	api.POST("/cart/items", h.HandleCartAddItem)
	api.PATCH("/cart/items/:id", h.HandleCartPatchItem)
	api.POST("/cart/apply-promo", h.HandleCartApplyPromo)
	api.POST("/cart/apply-bonuses", h.HandleCartApplyBonuses)
	api.GET("/cart/totals", h.HandleCartTotals)

	// Checkout
	api.POST("/checkout/quote", h.HandleCheckoutQuote)
	api.POST("/checkout/place", h.HandleCheckoutPlace)

	// TODO: Auth, profile, orders etc.

	return r
}
