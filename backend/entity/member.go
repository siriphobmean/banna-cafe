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
	MemberImage string `gorm:"type:longtext"`
	Point int

	Order []Order `gorm:"foreignKey:MemberID"`
	Rating []Rating `gorm:"foreignKey:MemberID"`
	Preorders []Preorder `gorm:"foreignKey:MemberID"`

} // Clear!