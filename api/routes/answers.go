package routes

import (
	"github.com/catalinfl/questions/handlers"
	"github.com/gofiber/fiber/v2"
)

func Answer(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/answer/question/:id", handlers.GetAnswers)
	api.Post("/answer/:id", handlers.CreateAnswer)
}
