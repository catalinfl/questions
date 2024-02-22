package models

type Question struct {
	ID          int      `json:"id" gorm:"primaryKey"`
	Question    string   `json:"question"`
	Answers     []Answer `json:"answer" gorm:"foreignKey:QuestionID"`
	Description string   `json:"description"`
	Author      string   `json:"author"`
	Category    string   `json:"category"`
}
