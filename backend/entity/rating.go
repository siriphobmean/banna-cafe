package entity

import (
	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model

	Score int

	MenuID *uint
	Menu Menu `gorm:"references:id"`

	// FK
	MemberID *uint
	Member Member `gorm:"references:id"`
} // Clear!