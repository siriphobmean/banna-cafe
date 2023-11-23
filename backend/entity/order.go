package entity // no mean

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	TotalAmount int // default decimal?

	OrderMenu []OrderMenu `gorm:"foreignKey:OrderID"`

	// FK
	EmployeeID *uint
	Employee Employee `gorm:"references:id"`
} // Clear!