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

	if answer.Answer == "" {
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

func ModifyReputation(c *fiber.Ctx) error {
	id := c.Params("id")

	var answer models.Answer

	user := c.Cookies("user")

	if user == "" {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	config.Database.Where("id = ?", id).First(&answer)

	answer.Reputation++

	config.Database.Save(&answer)

	return c.JSON(fiber.Map{
		"message": "Reputation modified",
		"answer":  answer,
	})
}
