package entity

import (
	"gorm.io/gorm"
)

type PreorderStatusApprove struct {
	gorm.Model

	// FK
	PreorderID              *uint                 `valid:"required~Preorder is required"`
	Preorder                Preorder              `gorm:"references:id" valid:"-"`
	StatusApprovePreorderID *uint                 `valid:"required~StatusApprovePreorder is required"`
	StatusApprovePreorder   StatusApprovePreorder `gorm:"references:id" valid:"-"`
}

