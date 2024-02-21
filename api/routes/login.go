package routes

import (
	"github.com/catalinfl/questions/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func Login(app *fiber.App) {

	godotenv.Load()

	api := app.Group("/api")

	api.Get("/login", handlers.GoogleLogin)
	api.Get("/callback", handlers.Callback)
	// api.Post("/callback", handlers.Callback)

}
