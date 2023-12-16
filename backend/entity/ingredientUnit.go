package entity

import (
	"gorm.io/gorm"
)

type IngredientUnit struct { // edit 15/12/66
	gorm.Model

	UnitName string `gorm:"uniqueIndex"`

	IngredientMenu []IngredientMenu `gorm:"foreignKey:IngredientUnitID"`
	Ingredient []Ingredient `gorm:"foreignKey:IngredientUnitID"` // more 15/12/66
} // more 13/12/66