package entity

import (
	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model

	Score int

	Menu []Menu `gorm:"foreignKey:RatingID"`

	// FK
	MemberID *uint
	Member Member `gorm:"references:id"`
} // Clear!