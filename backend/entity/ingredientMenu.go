package entity // no mean 50/50

import (
	"gorm.io/gorm"
)

type IngredientMenu struct {
	gorm.Model
	Amount int

	// FK
	IngredientID *uint
	Ingredient Ingredient `gorm:"references:id"`

	MenuID *uint
	Menu Menu `gorm:"references:id"`
} // Clear!