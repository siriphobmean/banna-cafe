package entity // no mean

import (
	"gorm.io/gorm"
)

type Promotion struct {
	gorm.Model

	Code string
	PromotionName string
	PromotionImage string `gorm:"type:longtext"`
	TimeOfBegin string
	TimeOfEnd string
	Discount float64 // default in db is Decimal(4,2)

	// FK
	EmployeeID *uint
	Employee Employee `gorm:"references:id"`
} // Clear!