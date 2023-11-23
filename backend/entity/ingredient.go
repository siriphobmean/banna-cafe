package entity // no mean

import (
	"gorm.io/gorm"
)

type Ingredient struct {
	gorm.Model

	IngredientName string
	IngredientCost int
	IngredientAmount int
	IngredientSource string
	IngredientImage string `gorm:"type:longtext"`

	IngredientMenu []IngredientMenu `gorm:"foreignKey:IngredientID"`
} // Clear!