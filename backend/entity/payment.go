package entity

import (
	"time"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Image string `gorm:"type:longtext"`
	Time time.Time
	Code string
	TotalAmount int

	Accounting []Accounting `gorm:"foreignKey:PaymentID"`
	PaymentID []PaymentStatus `gorm:"foreignKey:PaymentID"`


	//FK
	PromotionID *uint
	Promotion Promotion `gorm:"references:id"`

	PreorderID *uint
	Preorder Preorder `gorm:"references:id"`

	EmployeeID *uint
	Employee Employee `gorm:"references:id"`


}

type PaymentStatus struct{
	gorm.Model

	PaymentID *uint
	Payment Payment `gorm:"references:id"`

	StatusPaymentID *uint
	StatusPayment StatusPayment `gorm:"references:id"`
}

type StatusPayment struct{
	gorm.Model
	Name string
	PaymentStatus []PaymentStatus `gorm:"foreignKey:StatusPaymentID"`
}
