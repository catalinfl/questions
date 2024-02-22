package routes

import (
	"github.com/catalinfl/questions/handlers"
	"github.com/gofiber/fiber/v2"
)

func Question(app *fiber.App) {

	api := app.Group("/api")

	api.Get("/questions", handlers.GetQuestions)
	api.Get("/question/search", handlers.SearchQuestion)
	api.Get("/question/:id", handlers.GetQuestion)
	api.Get("/question/answers/:id", handlers.GetQuestionWithAnswers)
	api.Post("/create-question", handlers.CreateQuestion)
}
