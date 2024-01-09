package entity

import (
	"gorm.io/gorm"
)

type PreorderStatusRecive struct {
	gorm.Model
	// FK
	PreorderID             *uint                `valid:"required~Preorder is required"`
	Preorder               Preorder             `gorm:"references:id" valid:"-"`
	StatusRecivePreorderID *uint                `valid:"required~StatusRecivePreorder is required"`
	StatusRecivePreorder   StatusRecivePreorder `gorm:"references:id" valid:"-"`
}
