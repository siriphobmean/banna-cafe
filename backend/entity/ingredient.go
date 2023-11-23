package entity // nop

import (
	"gorm.io/gorm"
)

type Ingredient struct {
	gorm.Model

	IngredientName string
	IngredientCost float64
	IngredientAmount int
	IngredientSource string
	// IngredientImage string `gorm:"type:longtext"`

	IngredientMenu []IngredientMenu `gorm:"foreignKey:IngredientID"`
} // Clear! but Entity not finish