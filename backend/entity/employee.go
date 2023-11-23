package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model

	FirstName string
	LastName string
	Email string
	Password string
	Gender string
	Age int
	Salary float64 // db = float

	Order []Order `gorm:"foreignKey:EmployeeID"`
	Promotion []Promotion `gorm:"foreignKey:EmployeeID"`

	// FK
	RoleID *uint
	Role Role `gorm:"references:id"`
} // Clear!