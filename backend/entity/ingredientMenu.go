package entity // mean-nop

import (
	"gorm.io/gorm"
)

type IngredientMenu struct {
	gorm.Model
	Amount int `gorm:"not null"`

	// FK
	IngredientID uint `gorm:"uniqueIndex" valid:"required~IngredientID is required"`
	Ingredient Ingredient `gorm:"references:id"`

	// MenuID *uint `gorm:"uniqueIndex"` // new ทำให้ตอนกรอกลำดับซ้ำมา ข้อมูลไม่ถูกเก็บเข้า entity: ingredient_menus(menu_id.FK)
	MenuID uint `valid:"required~MenuID is required"`
	Menu Menu `gorm:"references:id"`

	IngredientUnitID uint `valid:"required~IngredientUnitID is required"`
	IngredientUnit IngredientUnit `gorm:"references:id"` // more 13/12/66
} // Clear!