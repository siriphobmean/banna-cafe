package entity // no mean

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	TotalAmount int // default in db is Decimal(4,2)
	// TimeOfCreate
	// Income

	OrderMenu []OrderMenu `gorm:"foreignKey:OrderID"`
	// Status []Status `gorm:"foreignKey:OrderID"`

	// FK
	EmployeeID *uint
	Employee Employee `gorm:"references:id"`

	MemberID *uint
	Member Member `gorm:"references:id"`

	// Code ?

} // Clear!