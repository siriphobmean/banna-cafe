package entity

import (
	"gorm.io/gorm"
)

type PreorderStatusReceive struct {
	gorm.Model
	// FK
	PreorderID              *uint                 `valid:"required~Preorder is required"`
	Preorder                Preorder              `gorm:"references:id" valid:"-"`
	StatusReceivePreorderID *uint                 `valid:"required~StatusReceivePreorder is required"`
	StatusReceivePreorder   StatusReceivePreorder `gorm:"references:id" valid:"-"`
}
