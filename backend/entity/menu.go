package entity

import (
	"gorm.io/gorm"
)

type Menu struct {
	gorm.Model

	MenuID int `gorm:"uniqueIndex"` // more 12:43 AM 29/11/2023 -> // new ทำให้ตอนกรอกลำดับซ้ำมา ข้อมูลไม่ถูกเก็บเข้า entity: menus(menu_id ท้ายสุด)
	MenuName string `gorm:"uniqueIndex"`
	MenuNameEng string `gorm:"uniqueIndex"`
	MenuCost float64
	MenuImage string `gorm:"type:longtext"`
	MenuStatus int

	OrderMenu []OrderMenu `gorm:"foreignKey:MenuID"`
	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuID"`
	// PreOrderMenu []PreOrderMenu `gorm:"foreignKey:MenuID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity PreOrder, PreOrder Menu

	// FK
	MenuTypeID *uint
	MenuType MenuType `gorm:"references:id"`
	RatingID *uint
	Rating Rating `gorm:"references:id"`
} // Clear!