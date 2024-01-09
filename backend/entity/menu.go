package entity

import (
	"gorm.io/gorm"
)

type Menu struct {
	gorm.Model

	MenuID int `gorm:"uniqueIndex" valid:"required~MenuID is required"` // ok!
	MenuName string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อเมนู !, maxstringlength(50)~ชื่อเมนูต้องมีตัวอักษรไม่เกิน 50 ตัว"` // ok!
	MenuNameEng string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อเมนู !, maxstringlength(50)~ชื่อเมนูต้องมีตัวอักษรไม่เกิน 50 ตัว"` // ok!
	MenuCost float64 `valid:"required~กรุณากรอกเป็นเลขทศนิยม !, float~กรุณากรอกเป็นเลขทศนิยม"` // ok!...
	MenuImage string `gorm:"type:longtext"` // ok!
	MenuStatus int `valid:"required~กรุณากรอกสถานะเมนู !, range(1|2)~กรุณากรอกเฉพาะเลข 1 หรือ 2 เท่านั้น"` // ok

	// OrderMenu []OrderMenu `gorm:"foreignKey:MenuID"`
	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuID"`
	PreorderMenus []PreorderMenu `gorm:"foreignKey:MenuID"`

	// FK
	MenuTypeID uint `valid:"required~MenuType is required"`
	MenuType MenuType `gorm:"references:id"`

	RatingID *uint
	Rating Rating `gorm:"references:id" valid:"-"`
} // Clear!