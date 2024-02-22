package handlers

import (
	"github.com/catalinfl/questions/config"
	"github.com/catalinfl/questions/models"
	"github.com/gofiber/fiber/v2"
)

func CreateQuestion(c *fiber.Ctx) error {
	var question models.Question

	question.Author = c.Cookies("user")

	if question.Author == "" {
		question.Author = "Guest"
	}

	if err := c.BodyParser(&question); err != nil {
		return c.JSON(fiber.Map{
			"message": "Error parsing question",
		})
	}

	if question.Question == "" || len(question.Question) < 10 {
		return c.JSON(fiber.Map{
			"message": "Question is too short",
		})
	}

	if question.Description == "" || len(question.Description) < 10 {
		return c.JSON(fiber.Map{
			"message": "Description is too short",
		})
	}

	config.Database.Create(&question)

	return c.JSON(fiber.Map{
		"message":  "Question created",
		"question": question,
	})
}

func GetQuestions(c *fiber.Ctx) error {
	var questions []models.Question

	config.Database.Find(&questions)

	return c.JSON(questions)
}

func GetQuestion(c *fiber.Ctx) error {
	id := c.Params("id")

	var question models.Question

	config.Database.Where("id = ?", id).First(&question)

	if question.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Question not found",
		})
	}

	return c.JSON(question)
}

func GetQuestionWithAnswers(c *fiber.Ctx) error {
	id := c.Params("id")

	var answers []models.Answer
	var question models.Question

	config.Database.Preload("Answer").Where("question_id = ?", id).Find(&answers)

	config.Database.Where("id = ?", id).First(&question)

	if question.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Question not found",
		})
	}

	question.Answers = answers

	return c.JSON(question)

}

func SearchQuestion(c *fiber.Ctx) error {
	search := c.Query("question")

	if len(search) < 3 {
		return c.JSON(fiber.Map{
			"message": "Search query too short",
		})
	}

	var questions []models.Question

	config.Database.Where("question LIKE ?", "%"+search+"%").Limit(2).Find(&questions)

	if len(questions) == 0 {
		config.Database.Where("description LIKE ?", "%"+search+"%").Limit(2).Find(&questions)
	}

	if len(questions) == 0 {
		config.Database.Where("category LIKE ?", "%"+search+"%").Find(&questions)
	}

	return c.JSON(questions)
}
