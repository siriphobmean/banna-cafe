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
	// Payment []Payment `gorm:"foreignKey:EmployeeID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity Payment
	// Account []Account `gorm:"foreignKey:EmployeeID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity Account

	// FK
	RoleID *uint
	Role Role `gorm:"references:id"`
} // Clear!