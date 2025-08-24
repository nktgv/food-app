package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS (разрешаем все для разработки)
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, User-Agent")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Обрабатываем preflight запросы
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// Health
	r.GET("/health", func(c *gin.Context) { c.JSON(200, gin.H{"status": "ok"}) })

	api := r.Group("/api")
	{
		// Auth (OTP stubs)
		api.POST("/auth/request-otp", func(c *gin.Context) { c.JSON(200, gin.H{"ok": true}) })
		api.POST("/auth/verify-otp", func(c *gin.Context) { c.JSON(200, gin.H{"access_token": "dev", "refresh_token": "dev"}) })
		api.POST("/auth/refresh", func(c *gin.Context) { c.JSON(200, gin.H{"access_token": "dev2"}) })

		// Catalog
		api.GET("/catalog", handleCatalog)
		api.GET("/products", handleProducts)
		api.GET("/products/:id", handleProductByID)

		// Cart
		api.POST("/cart", handleCartCreate)
		api.POST("/cart/items", handleCartAddItem)
		api.PATCH("/cart/items/:id", handleCartPatchItem)
		api.POST("/cart/apply-promo", handleCartApplyPromo)
		api.POST("/cart/apply-bonuses", handleCartApplyBonuses)
		api.GET("/cart/totals", handleCartTotals)

		// Checkout
		api.POST("/checkout/quote", handleCheckoutQuote)
		api.POST("/checkout/place", handleCheckoutPlace)
		api.GET("/orders/:id", func(c *gin.Context) { c.JSON(200, gin.H{"id": c.Param("id"), "status": "NEW"}) })

		// Profile/Wallet
		api.GET("/me", func(c *gin.Context) { c.JSON(200, gin.H{"id": "u_dev", "name": "Dev User"}) })
		api.GET("/me/wallet", func(c *gin.Context) { c.JSON(200, gin.H{"balance": 0}) })
	}

	r.Run(":8080")
}

// --- Handlers & simple in-memory models ---

type Product struct {
	ID          string     `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Media       []string   `json:"media"`
	BasePrice   float64    `json:"base_price"`
	Currency    string     `json:"currency"`
	Variants    []Variant  `json:"variants"`
	Modifiers   []ModGroup `json:"modifier_groups"`
	Allergens   []string   `json:"allergens"`
	Tags        []string   `json:"tags"`
}

type Variant struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	PriceDelta float64 `json:"price_delta"`
}

type ModGroup struct {
	ID        string     `json:"id"`
	Name      string     `json:"name"`
	MinSelect int        `json:"min_select"`
	MaxSelect int        `json:"max_select"`
	Required  bool       `json:"required"`
	Modifiers []Modifier `json:"modifiers"`
}

type Modifier struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	PriceDelta float64 `json:"price_delta"`
	IsDefault  bool    `json:"is_default,omitempty"`
}

var demoProduct = Product{
	ID:          "p_123",
	Name:        "Маргарита",
	Description: "Классическая пицца",
	Media:       []string{"https://cdn/.../p_123.webp"},
	BasePrice:   8.5,
	Currency:    "EUR",
	Variants: []Variant{
		{ID: "v_small", Name: "25 см", PriceDelta: 0},
		{ID: "v_large", Name: "35 см", PriceDelta: 4.0},
	},
	Modifiers: []ModGroup{
		{ID: "mg_cheese", Name: "Сыры", MinSelect: 0, MaxSelect: 3, Required: false, Modifiers: []Modifier{
			{ID: "m_mozz", Name: "Моцарелла", PriceDelta: 1.0, IsDefault: true},
			{ID: "m_parm", Name: "Пармезан", PriceDelta: 1.5},
		}},
	},
	Allergens: []string{"gluten", "milk"},
	Tags:      []string{"vegetarian"},
}

func handleCatalog(c *gin.Context) {
	c.JSON(200, gin.H{"categories": []gin.H{{"id": "cat_pizza", "name": "Пицца"}}})
}

func handleProducts(c *gin.Context) {
	c.JSON(200, []Product{demoProduct})
}

func handleProductByID(c *gin.Context) {
	if c.Param("id") == demoProduct.ID {
		c.JSON(200, demoProduct)
		return
	}
	c.JSON(404, gin.H{"error": "not_found"})
}

type CartItem struct {
	ItemID     string  `json:"item_id"`
	ProductID  string  `json:"product_id"`
	VariantID  string  `json:"variant_id"`
	Qty        int     `json:"qty"`
	UnitPrice  float64 `json:"unit_price"`
	ModifiersT float64 `json:"modifiers_total"`
	LineSub    float64 `json:"line_subtotal"`
}

type CartTotals struct {
	Items          []CartItem `json:"items"`
	Subtotal       float64    `json:"subtotal"`
	Discounts      float64    `json:"discounts"`
	BonusesApplied float64    `json:"bonuses_applied"`
	Fees           float64    `json:"fees"`
	Tax            float64    `json:"tax"`
	Total          float64    `json:"total"`
	Currency       string     `json:"currency"`
}

var lastTotals = CartTotals{
	Items: []CartItem{{
		ItemID:     "ci_1",
		ProductID:  "p_123",
		VariantID:  "v_large",
		Qty:        2,
		UnitPrice:  12.5,
		ModifiersT: 2.5,
		LineSub:    30.0,
	}},
	Subtotal:       30.0,
	Discounts:      3.0,
	BonusesApplied: 9.9,
	Fees:           2.0,
	Tax:            0.0,
	Total:          19.1,
	Currency:       "EUR",
}

func handleCartCreate(c *gin.Context)       { c.JSON(200, gin.H{"id": "cart_dev"}) }
func handleCartAddItem(c *gin.Context)      { c.JSON(200, gin.H{"ok": true}) }
func handleCartPatchItem(c *gin.Context)    { c.JSON(200, gin.H{"ok": true}) }
func handleCartApplyPromo(c *gin.Context)   { c.JSON(200, gin.H{"ok": true}) }
func handleCartApplyBonuses(c *gin.Context) { c.JSON(200, gin.H{"ok": true}) }
func handleCartTotals(c *gin.Context)       { c.JSON(200, lastTotals) }

func handleCheckoutQuote(c *gin.Context) {
	c.JSON(200, gin.H{"eta": 25, "fees": 2.0, "available_slots": []string{"ASAP"}})
}

func handleCheckoutPlace(c *gin.Context) {
	c.JSON(200, gin.H{"order_id": "o_dev_1", "payment_status": "AUTHORIZED"})
}
