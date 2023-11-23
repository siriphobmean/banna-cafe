package entity // no mean 50/50

import (
	"gorm.io/gorm"
)

type OrderMenu struct {
	gorm.Model
	
	Amount int
	Sweetness int
	Size string
	Option string
	Note string

	// FK
	MenuID *uint
	Menu Menu `gorm:"references:id"`

	OrderID *uint
	Order Order `gorm:"references:id"`
} // Clear!