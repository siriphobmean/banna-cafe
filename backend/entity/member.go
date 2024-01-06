package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model

	Username string `gorm:"not null;uniqueIndex"`
	Email string `gorm:"not null;uniqueIndex"`
	Password string `gorm:"not null"`
	Phone string 
	MemberImage string `gorm:"type:longtext"`
	Point int 

	Order []Order `gorm:"foreignKey:MemberID"`
	Rating []Rating `gorm:"foreignKey:MemberID"`
	Preorders []Preorder `gorm:"foreignKey:MemberID"`

} // Clear!