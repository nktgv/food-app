package main

import (
	"log"

	"foodapp/backend/internal/config"
	"foodapp/backend/internal/database"
	"foodapp/backend/internal/router"
)

func main() {
	// Load config
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config load: %v", err)
	}

	// Connect to Postgres
	db, err := database.NewPostgres(*cfg)
	if err != nil {
		log.Fatalf("db connect: %v", err)
	}
	defer db.Close()

	// Init router with deps
	r := router.New(db, *cfg)

	if err := r.Run(":" + cfg.HTTP.Port); err != nil {
		log.Fatal(err)
	}
}
