package entity // nop

import (
	"time"

	"gorm.io/gorm"
)

type Ingredient struct {
	gorm.Model

	IngredientName   string `gorm:"uniqueIndex"`
	IngredientCost   float64
	IngredientAmount int
	IngredientImage  string `gorm:"type:longtext"`
	IngredientExpert time.Time
	// IngredientImage string `gorm:"type:longtext"`

	IngredientMenu   []IngredientMenu `gorm:"foreignKey:IngredientID"`
	IngredientTypeID *uint
	IngredientType   IngredientType `gorm:"references:id"`

	IngredientUnitID *uint // by mean 15/12/66
	IngredientUnit IngredientUnit `gorm:"references:id"` // by mean 15/12/66
} // Clear! but Entity not finish
