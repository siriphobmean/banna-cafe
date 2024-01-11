package entity

import (
	"gorm.io/gorm"
)

type PreorderMenu struct {
	gorm.Model
	Quantity  int     `valid:"required~กรุณากรอก Quantity !, range(1|20)~กรุณาเลือกจำนวนใหม่ที่อยู่ในช่วง 1 ถึง 20"`
	TotalCost float32 `gorm:"type:decimal(9,2)" valid:"required~กรุณากรอก TotalCost !,ValidTotalAmount~TotalAmount ต้องมีทศนิยม 2 ตำแหน่ง"`

	// FK
	PreorderID    *uint       `valid:"required~Preorder is required"`
	Preorder      Preorder    `gorm:"references:id" valid:"-"`
	MenuSizeID    *uint       `valid:"required~MenuSize is required"`
	MenuSize      MenuSize    `gorm:"references:id" valid:"-"`
	SweetnessID   *uint       `valid:"required~Sweetness is required"`
	Sweetness     Sweetness   `gorm:"references:id" valid:"-"`
	DrinkOptionID *uint       `valid:"required~DrinkOption is required"`
	DrinkOption   DrinkOption `gorm:"references:id" valid:"-"`
	MenuID        *uint       `valid:"required~Menu is required"`
	Menu          Menu        `gorm:"references:id" valid:"-"`
}
