package middleware

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/catalinfl/questions/config"
	"github.com/gofiber/fiber/v2"
)

type Tokeninfo struct {
	Audience      string `json:"aud"`
	Subject       string `json:"sub"`
	Email         string `json:"email"`
	EmailVerified string `json:"email_verified"`
	Expires       string `json:"exp"`
	ExpiresIn     string `json:"expires_in"`
}

func VerifyToken(c *fiber.Ctx) error {

	token := c.Cookies("token")

	if token == "" {
		return c.Redirect("/api/login")
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var tokenInfo Tokeninfo

	err = json.Unmarshal(body, &tokenInfo)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if tokenInfo.Audience != config.GoogleConfig().ClientID {
		return c.Redirect("/api/login")
	}

	return c.Next()
}
