package handler

import "github.com/gin-gonic/gin"

// --- Catalog ---
func HandleCatalog(c *gin.Context) {
	c.JSON(200, gin.H{"categories": []gin.H{{"id": "cat_pizza", "name": "Пицца"}}})
}

func HandleProducts(c *gin.Context) {
	c.JSON(200, []interface{}{})
}

func HandleProductByID(c *gin.Context) {
	c.JSON(404, gin.H{"error": "not_found"})
}

// --- Cart ---
func HandleCartCreate(c *gin.Context)       { c.JSON(200, gin.H{"id": "cart_dev"}) }
func HandleCartAddItem(c *gin.Context)      { c.JSON(200, gin.H{"ok": true}) }
func HandleCartPatchItem(c *gin.Context)    { c.JSON(200, gin.H{"ok": true}) }
func HandleCartApplyPromo(c *gin.Context)   { c.JSON(200, gin.H{"ok": true}) }
func HandleCartApplyBonuses(c *gin.Context) { c.JSON(200, gin.H{"ok": true}) }
func HandleCartTotals(c *gin.Context)       { c.JSON(200, gin.H{"items": []interface{}{}, "subtotal": 0}) }

// --- Checkout ---
func HandleCheckoutQuote(c *gin.Context) {
	c.JSON(200, gin.H{"eta": 25, "fees": 2.0, "available_slots": []string{"ASAP"}})
}

func HandleCheckoutPlace(c *gin.Context) {
	c.JSON(200, gin.H{"order_id": "o_dev_1", "payment_status": "AUTHORIZED"})
}

// --- Misc ---
func Health(c *gin.Context) { c.JSON(200, gin.H{"status": "ok"}) }
