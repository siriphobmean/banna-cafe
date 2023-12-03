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
	TotalAmount float32

	//Accounting []Accounting `gorm:"foreignKey:PaymentID"`

	//FK
	PromotionID *uint
	Promotion Promotion `gorm:"references:id"`

	PreorderID *uint
	Preorder PreOrder `gorm:"references:id"`

	EmployeeID *uint
	Employee Employee `gorm:"references:id"`

	StatusPaymentID *uint
	StatusPayment StatusPayment `gorm:"references:id"`


}
type StatusPayment struct{
	gorm.Model
	Name string
	Payment []Payment `gorm:"foreignKey:StatusPaymentID"`
}