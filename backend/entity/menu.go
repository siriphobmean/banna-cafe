package entity

import (
	"gorm.io/gorm"
)

type Menu struct {
	gorm.Model

	MenuName string `gorm:"uniqueIndex"`
	MenuNameEng string `gorm:"uniqueIndex"`
	MenuCost float64
	MenuImage string `gorm:"type:longtext"`

	OrderMenu []OrderMenu `gorm:"foreignKey:MenuID"`
	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuID"`

	// FK
	MenuTypeID *uint
	MenuType MenuType `gorm:"references:id"`
} // Clear!