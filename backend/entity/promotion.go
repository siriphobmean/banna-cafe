package entity // no mean

import (
	"gorm.io/gorm"
)

type Promotion struct {
	gorm.Model

	PromotionName string
	PromotionImage string `gorm:"type:longtext"`
	TimeOfBegin string
	TimeOfEnd string

	// FK
	EmployeeID *uint
	Employee Employee `gorm:"references:id"`
} // Clear!