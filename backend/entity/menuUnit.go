package entity

import (
	"gorm.io/gorm"
)

type MenuUnit struct {
	gorm.Model

	UnitName string `gorm:"uniqueIndex"`

	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuUnitID"`
} // more 13/12/66