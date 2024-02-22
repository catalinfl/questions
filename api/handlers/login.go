package handlers

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/catalinfl/questions/config"
	"github.com/gofiber/fiber/v2"
)

type User struct {
	Id    string
	Name  string
	Email string
}

func GoogleLogin(c *fiber.Ctx) error {
	url := config.GoogleConfig().Endpoint.AuthURL + "?client_id=" + config.GoogleConfig().ClientID + "&redirect_uri=" + config.GoogleConfig().RedirectURL + "&response_type=code&scope=openid%20profile%20email&state=state"

	c.Status(fiber.StatusSeeOther)
	isRedirected := false

	if !isRedirected {
		isRedirected = true
		c.Redirect(url)
	}

	return c.JSON(url)
}

func Callback(c *fiber.Ctx) error {
	state := c.Query("state")

	if state != "state" {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	code := c.Query("code")

	googlecon := config.GoogleConfig()

	token, err := googlecon.Exchange(context.Background(), code)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	defer resp.Body.Close()

	var user User

	userData, err := io.ReadAll(resp.Body)
	json.Unmarshal(userData, &user)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	c.Status(fiber.StatusOK)

	c.Cookie(&fiber.Cookie{
		Name:     "user",
		Value:    user.Name,
		Expires:  token.Expiry,
		Path:     "/",
		HTTPOnly: true,
		Secure:   true,
		SameSite: "Strict",
	})

	c.Cookie(&fiber.Cookie{
		Name:     "connected",
		Value:    "true",
		Expires:  token.Expiry,
		Path:     "/",
		Secure:   true,
		HTTPOnly: false,
		SameSite: "Strict",
	})

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token.AccessToken,
		Expires:  token.Expiry,
		Path:     "/",
		HTTPOnly: true,
		Secure:   true,
		SameSite: "Strict",
	})

	return c.Redirect("http://localhost:5173/create-question")

}
