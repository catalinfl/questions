package main

import (
	"github.com/catalinfl/questions/config"
	"github.com/catalinfl/questions/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:5173",
	}))

	config.ConnectDatabase()

	routes.Login(app)
	routes.Question(app)
	routes.Answer(app)

	app.Listen(":3000")
}
