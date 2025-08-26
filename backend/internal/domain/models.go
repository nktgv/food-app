package domain

import "time"

// Product base info
// Table: products
type Product struct {
	ID          string     `gorm:"primaryKey;type:uuid" json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Media       []string   `gorm:"type:text[]" json:"media"`
	BasePrice   float64    `json:"base_price"`
	Currency    string     `json:"currency"`
	Tags        []string   `gorm:"type:text[]" json:"tags"`
	Allergens   []string   `gorm:"type:text[]" json:"allergens"`
	Variants    []Variant  `gorm:"foreignKey:ProductID" json:"variants"`
	ModGroups   []ModGroup `gorm:"foreignKey:ProductID" json:"modifier_groups"`
	CreatedAt   time.Time  `json:"-"`
	UpdatedAt   time.Time  `json:"-"`
}

// Variant of a product (size, etc.)
type Variant struct {
	ID         string  `gorm:"primaryKey;type:uuid" json:"id"`
	ProductID  string  `gorm:"type:uuid;index" json:"-"`
	Name       string  `json:"name"`
	PriceDelta float64 `json:"price_delta"`
}

// ModGroup groups modifiers (extra cheese, etc.)
type ModGroup struct {
	ID        string     `gorm:"primaryKey;type:uuid" json:"id"`
	ProductID string     `gorm:"type:uuid;index" json:"-"`
	Name      string     `json:"name"`
	MinSelect int        `json:"min_select"`
	MaxSelect int        `json:"max_select"`
	Required  bool       `json:"required"`
	Modifiers []Modifier `gorm:"foreignKey:GroupID" json:"modifiers"`
}

type Modifier struct {
	ID         string  `gorm:"primaryKey;type:uuid" json:"id"`
	GroupID    string  `gorm:"type:uuid;index" json:"-"`
	Name       string  `json:"name"`
	PriceDelta float64 `json:"price_delta"`
	IsDefault  bool    `json:"is_default"`
}

// Cart holds cart status
// Table: carts
// We store minimal info; items in separate table.
type Cart struct {
	ID        string     `gorm:"primaryKey;type:uuid" json:"id"`
	UserID    *string    `gorm:"type:uuid" json:"user_id,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	Items     []CartItem `gorm:"foreignKey:CartID" json:"items"`
}

type CartItem struct {
	ID         string  `gorm:"primaryKey;type:uuid" json:"item_id"`
	CartID     string  `gorm:"type:uuid;index" json:"-"`
	ProductID  string  `gorm:"type:uuid" json:"product_id"`
	VariantID  string  `gorm:"type:uuid" json:"variant_id"`
	Qty        int     `json:"qty"`
	UnitPrice  float64 `json:"unit_price"`
	ModifiersT float64 `json:"modifiers_total"`
	LineSub    float64 `json:"line_subtotal"`
}

// Order info
type Order struct {
	ID        string    `gorm:"primaryKey;type:uuid" json:"id"`
	UserID    string    `gorm:"type:uuid" json:"user_id"`
	CartID    string    `gorm:"type:uuid" json:"cart_id"`
	Status    string    `json:"status"`
	Total     float64   `json:"total"`
	Currency  string    `json:"currency"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// User basic profile
type User struct {
	ID        string    `gorm:"primaryKey;type:uuid" json:"id"`
	Phone     string    `gorm:"uniqueIndex" json:"phone"`
	Name      string    `json:"name"`
	Email     *string   `json:"email,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
