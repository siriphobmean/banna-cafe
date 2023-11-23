package entity // no mean

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	TotalAmount int // default decimal?
	// TimeOfCreate
	// Income

	OrderMenu []OrderMenu `gorm:"foreignKey:OrderID"`
	// Status ?

	// FK
	EmployeeID *uint
	Employee Employee `gorm:"references:id"`
	// MemberID
	// Code ?

} // Clear!