package entity // mean-nop

import (
	"gorm.io/gorm"
)

type IngredientMenu struct {
	gorm.Model
	Amount int

	// FK
	IngredientID *uint
	Ingredient Ingredient `gorm:"references:id"`

	MenuID *uint `gorm:"uniqueIndex"` // new ทำให้ตอนกรอกลำดับซ้ำมา ข้อมูลไม่ถูกเก็บเข้า entity: ingredient_menus(menu_id.FK)
	Menu Menu `gorm:"references:id"`
} // Clear!