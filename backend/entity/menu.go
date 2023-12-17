package entity

import (
	"gorm.io/gorm"
)

type Menu struct {
	gorm.Model

	MenuID int `gorm:"not null;uniqueIndex"` // more 12:43 AM 29/11/2023 -> // new ทำให้ตอนกรอกลำดับซ้ำมา ข้อมูลไม่ถูกเก็บเข้า entity: menus(menu_id ท้ายสุด)
	MenuName string `gorm:"not null;uniqueIndex"`
	MenuNameEng string `gorm:"not null;uniqueIndex"`
	MenuCost float64 `gorm:"not null"`
	MenuImage string `gorm:"type:longtext"`
	MenuStatus int `gorm:"not null"`

	// OrderMenu []OrderMenu `gorm:"foreignKey:MenuID"`
	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuID"`
	PreorderMenus []PreorderMenu `gorm:"foreignKey:MenuID"`

	// FK
	MenuTypeID *uint
	MenuType MenuType `gorm:"references:id"`
	RatingID *uint
	Rating Rating `gorm:"references:id"` // in now don't have not null
} // Clear!