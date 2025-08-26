package config

import (
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

// Config holds application configuration parsed from environment variables and optional config file.
type Config struct {
	HTTP struct {
		Port string `mapstructure:"port"`
	} `mapstructure:"http"`

	Postgres struct {
		Host     string `mapstructure:"host"`
		Port     int    `mapstructure:"port"`
		DB       string `mapstructure:"db"`
		User     string `mapstructure:"user"`
		Password string `mapstructure:"password"`
		SSLMode  string `mapstructure:"sslmode"`
	} `mapstructure:"postgres"`

	JWT struct {
		Secret        string `mapstructure:"secret"`
		AccessTTLMin  int    `mapstructure:"access_ttl_min"`
		RefreshTTLHrs int    `mapstructure:"refresh_ttl_hrs"`
	} `mapstructure:"jwt"`
}

// Load loads configuration from the following sources (in priority order):
// 1. Environment variables (optionally from .env file)
// 2. config.{yaml|json|toml}
// 3. Defaults embedded in the struct
func Load() (*Config, error) {
	// Step 1: load .env if present
	_ = godotenv.Load()

	// Step 2: set up viper
	v := viper.New()
	v.SetConfigName("config")
	v.SetConfigType("yaml")
	v.AddConfigPath(".")
	v.AddConfigPath("./backend")

	// Read environment variables automatically
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	v.AutomaticEnv()

	// Provide sensible defaults
	v.SetDefault("http.port", "8080")
	v.SetDefault("postgres.sslmode", "disable")

	// Optional config file.
	if err := v.ReadInConfig(); err != nil {
		// Ignore "not found" errors; other errors are fatal.
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, err
		}
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, err
	}

	// Allow override via explicit env vars (highest priority)
	if port := os.Getenv("HTTP_PORT"); port != "" {
		cfg.HTTP.Port = port
	}
	if h := os.Getenv("PG_HOST"); h != "" {
		cfg.Postgres.Host = h
	}
	if p := os.Getenv("PG_PORT"); p != "" {
		if i, err := strconv.Atoi(p); err == nil {
			cfg.Postgres.Port = i
		}
	}
	if db := os.Getenv("PG_DB"); db != "" {
		cfg.Postgres.DB = db
	}
	if u := os.Getenv("PG_USER"); u != "" {
		cfg.Postgres.User = u
	}
	if pw := os.Getenv("PG_PASSWORD"); pw != "" {
		cfg.Postgres.Password = pw
	}
	if sm := os.Getenv("PG_SSLMODE"); sm != "" {
		cfg.Postgres.SSLMode = sm
	}

	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		cfg.JWT.Secret = secret
	}

	return &cfg, nil
}
