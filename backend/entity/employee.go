package entity

import (
	"gorm.io/gorm"
	"math"
	"github.com/asaskevich/govalidator"
)

type Employee struct {
	gorm.Model

	FirstName string `valid:"required~FirstName is required, maxstringlength(30)~ชื่อจริงต้องมีตัวอักษรไม่เกิน 30 ตัว"`
	LastName string `valid:"required~LastName is required, maxstringlength(30)~นามสกุลต้องมีตัวอักษรไม่เกิน 30 ตัว"`
	Email string `gorm:"uniqueIndex" valid:"required~Email is required, email~รูปแบบอีเมลไม่ถูกต้อง"`
	Password string `valid:"required~Password is required, minstringlength(5)~รหัสผ่านต้องไม่ต่ำกว่า 5 ตัว"`
	Age int `valid:"required~กรุณากรอกอายุ !"`
	Salary float64 `gorm:"type:decimal(9,2)" valid:"required~กรุณากรอกเงินเดือน !,ValidSalary~เงินเดือนต้องเป็นทศนิยม 2 ตำแหน่ง"`

	Order []Order `gorm:"foreignKey:EmployeeID;"`
	Promotion []Promotion `gorm:"foreignKey:EmployeeID"`
	// Payment []Payment `gorm:"foreignKey:EmployeeID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity Payment
	// Accounting []Accounting `gorm:"foreignKey:EmployeeID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity Account

	// FK
	RoleID uint `valid:"required~Role is required"`
	Role Role `gorm:"references:id"`
	GenderID uint `valid:"required~Gender is required"`
	Gender Gender `gorm:"references:id"`
} // Clear!

func init() {
	govalidator.CustomTypeTagMap.Set("ValidSalary", govalidator.CustomTypeValidator(validateSalary))
}

func validateSalary(i interface{}, context interface{}) bool {
    value, ok := i.(float64)
    if !ok {
        return false
    }

    fractionalPart := float64(value*100) - math.Floor(float64(value*100))
    return fractionalPart == 0.00
}