package handlers

import (
	"strconv"

	"github.com/catalinfl/questions/config"
	"github.com/catalinfl/questions/models"
	"github.com/gofiber/fiber/v2"
)

// import (
// 	"github.com/catalinfl/questions/models"
// 	"github.com/gofiber/fiber/v2"
// )

func CreateAnswer(c *fiber.Ctx) error {
	var answer models.Answer

	if err := c.BodyParser(&answer); err != nil {
		return err
	}

	answer.Author = c.Cookies("user")

	if answer.Author == "" {
		answer.Author = "Guest"
	}

	if answer.Answer == "" || len(answer.Answer) < 10 {
		return c.JSON(fiber.Map{
			"message": "Answer is too short",
		})
	}

	id := c.Params("id")

	questionID, err := strconv.Atoi(id)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	answer.QuestionID = questionID

	config.Database.Create(&answer)

	return c.JSON(fiber.Map{
		"message": "Answer created",
		"answer":  answer,
	})

}

func GetAnswers(c *fiber.Ctx) error {
	id := c.Params("id")

	var answers []models.Answer

	config.Database.Where("question_id = ?", id).Find(&answers)

	return c.JSON(answers)

}
