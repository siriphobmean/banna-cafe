package entity

import (
	"time"
	"gorm.io/gorm"
)
type PreOrder struct{
	gorm.Model

	TotalAmount int
	CreateTime time.Time
	PickupTime time.Time
	Note string
	Respond string

	//FK
	MemberID *uint
	Member Member `gorm:"references:id"`
}
type ApproveStatusPreorder struct{
	gorm.Model

	//FK
	PreorderID *uint
	Preorder PreOrder `gorm:"references:id"`

	ApproveStatusID *uint
	ApproveStatus ApproveStatus `gorm:"references:id"`
}
type ApproveStatus struct{
	gorm.Model
	Name string
	ApproveStatusPreorder []ApproveStatusPreorder `gorm:"foreignKey:ApproveStatusID"`
}

type ReceiveStatusPreorder struct{
	gorm.Model

	//FK
	PreorderID *uint
	Preorder PreOrder `gorm:"references:id"`

	ReceiveStatusID *uint
	ReceiveStatus ReceiveStatus `gorm:"references:id"`
}
type ReceiveStatus struct{
	gorm.Model
	Name string
	ReceiveStatusPreorder []ReceiveStatusPreorder `gorm:"foreignKey:ReceiveStatusID"`
}