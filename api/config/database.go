package config

import (
	"os"

	"github.com/catalinfl/questions/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Database *gorm.DB

func ConnectDatabase() {
	godotenv.Load()

	dbURL := os.Getenv("DB_URL")

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	db.AutoMigrate(models.Question{}, models.Answer{})

	Database = db

}
