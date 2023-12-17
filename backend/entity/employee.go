package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model

	FirstName string `gorm:"not null"`
	LastName string `gorm:"not null"`
	Email string `gorm:"not null"`
	Password string `gorm:"not null"`
	Age int `gorm:"not null"`
	Salary float64 `gorm:"not null"`

	Order []Order `gorm:"foreignKey:EmployeeID;"`
	Promotion []Promotion `gorm:"foreignKey:EmployeeID"`
	// Payment []Payment `gorm:"foreignKey:EmployeeID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity Payment
	// Accounting []Accounting `gorm:"foreignKey:EmployeeID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity Account

	// FK
	RoleID *uint
	Role Role `gorm:"references:id"`
	GenderID *uint
	Gender Gender `gorm:"references:id"`
} // Clear!