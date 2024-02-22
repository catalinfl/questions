package models

type Answer struct {
	ID         int    `json:"id" gorm:"primaryKey"`
	Answer     string `json:"answer"`
	Author     string `json:"author"`
	Reputation int    `json:"reputation" default:"0"`
	QuestionID int    `json:"question_id"`
}
