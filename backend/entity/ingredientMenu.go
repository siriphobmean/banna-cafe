package entity // mean-nop

import (
	"gorm.io/gorm"
)

type IngredientMenu struct {
	gorm.Model
	Amount int `gorm:"not null"`

	// FK
	IngredientID *uint
	Ingredient Ingredient `gorm:"references:id"`

	// MenuID *uint `gorm:"uniqueIndex"` // new ทำให้ตอนกรอกลำดับซ้ำมา ข้อมูลไม่ถูกเก็บเข้า entity: ingredient_menus(menu_id.FK)
	MenuID *uint
	Menu Menu `gorm:"references:id"`

	IngredientUnitID *uint // edit 15/12/66
	IngredientUnit IngredientUnit `gorm:"references:id"` // more 13/12/66
} // Clear!