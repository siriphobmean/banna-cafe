package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model

	Username string `gorm:"uniqueIndex"`
	Email string `gorm:"uniqueIndex"`
	Password string
	Phone string
	Age int
	MemberImage string `gorm:"type:longtext"`
	Point int

	Order []Order `gorm:"foreignKey:MemberID"`
	Rating []Rating `gorm:"foreignKey:MemberID"`
	PreOrder []PreOrder `gorm:"foreignKey:MemberID"` // ตอนรวมไฟล์กับเพื่อน ค่อยเอา comment ออก -> เพราะยังไม่ได้สร้าง entity PreOrder

} // Clear!