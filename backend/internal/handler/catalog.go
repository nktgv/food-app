package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"foodapp/backend/internal/service"
)

type CatalogHandler struct {
	productSvc service.ProductService
}

func NewCatalogHandler(p service.ProductService) *CatalogHandler {
	return &CatalogHandler{productSvc: p}
}

func (h *CatalogHandler) ListProducts(c *gin.Context) {
	products, err := h.productSvc.List(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

func (h *CatalogHandler) GetProduct(c *gin.Context) {
	id := c.Param("id")
	p, err := h.productSvc.Get(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not_found"})
		return
	}
	c.JSON(http.StatusOK, p)
}
