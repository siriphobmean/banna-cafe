package entity

import (
	"gorm.io/gorm"
	"math"
	"github.com/asaskevich/govalidator"
)

type Menu struct {
	gorm.Model

	//MenuID int `gorm:"uniqueIndex" valid:"required~MenuID is required"` // ok!
	MenuName string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อเมนู !, maxstringlength(30)~ชื่อเมนูต้องมีตัวอักษรไม่เกิน 30 ตัว"` // ok!
	MenuNameEng string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อเมนู !, maxstringlength(30)~ชื่อเมนูต้องมีตัวอักษรไม่เกิน 30 ตัว"` // ok!
	// MenuCost float64 `valid:"required~กรุณากรอกเป็นเลขทศนิยม !, float~กรุณากรอกเป็นเลขทศนิยม 2 ตำแหน่ง"` // ok!...
	MenuCost float64 `gorm:"type:decimal(9,2)" valid:"required~กรุณากรอกเป็นเลขทศนิยม !, ValidCost~ราคามีทศนิยมไม่เกิน 2 ตำแหน่ง"`
	MenuImage string `gorm:"type:longtext"` // ok!
	MenuStatus int `valid:"required~กรุณากรอกสถานะเมนู !, range(1|2)~กรุณากรอกเฉพาะสถานะ 1 หรือ 2 เท่านั้น"` // ok

	// OrderMenu []OrderMenu `gorm:"foreignKey:MenuID"`
	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuID"`
	PreorderMenus []PreorderMenu `gorm:"foreignKey:MenuID"`
	Ratings []Rating `gorm:"foreignKey:MenuID"`

	// FK
	MenuTypeID uint `valid:"required~MenuType is required"`
	MenuType MenuType `gorm:"references:id"`

} // Clear!

func init() {
	govalidator.CustomTypeTagMap.Set("ValidCost", govalidator.CustomTypeValidator(validateCost))
}

func validateCost(i interface{}, context interface{}) bool {
    value, ok := i.(float64)
    if !ok {
        return false
    }

    fractionalPart := float64(value*100) - math.Floor(float64(value*100))
    return fractionalPart == 0.00
}