package entity

import (
	"time"

	"gorm.io/gorm"
)

type PreOrder struct {
	gorm.Model

	TotalAmount int
	CreateTime  time.Time
	PickupTime  time.Time
	Note        string
	Respond     string

	//FK
	MemberID *uint
	Member   Member `gorm:"references:id"`
}
type StatusApprovePreorder struct {
	gorm.Model

	//FK
	PreorderID *uint
	Preorder   PreOrder `gorm:"references:id"`

	ApproveStatusID *uint
	ApproveStatus   StatusApprove `gorm:"references:id"`
}
type StatusApprove struct {
	gorm.Model
	Name                  string
	ApproveStatusPreorder []StatusApprovePreorder `gorm:"foreignKey:ApproveStatusID"`
}

type StatusReceivePreorder struct {
	gorm.Model

	//FK
	PreorderID *uint
	Preorder   PreOrder `gorm:"references:id"`

	ReceiveStatusID *uint
	ReceiveStatus   StatusReceive `gorm:"references:id"`
}
type StatusReceive struct {
	gorm.Model
	Name                  string
	ReceiveStatusPreorder []StatusReceivePreorder `gorm:"foreignKey:ReceiveStatusID"`
}
