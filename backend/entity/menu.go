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
	// PreOrderMenu []PreOrderMenu `gorm:"foreignKey:MenuID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity PreOrder, PreOrder Menu

	// FK
	MenuTypeID *uint
	MenuType MenuType `gorm:"references:id"`
} // Clear!