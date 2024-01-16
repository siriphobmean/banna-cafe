package entity

import (
	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model
	Score 		int 	`valid:"required~Score ไม่อยู่ในช่วง 0 ถึง 5, range(0|5)~กรุณาเลือกคะแนนใหม่"`

	// FK
	MemberID 	*uint  	`valid:"required~Member is required"`
	Member   	Member 	`gorm:"references:id" valid:"-"`

	MenuID        *uint       `valid:"required~Menu is required"`
	Menu          Menu        `gorm:"references:id" valid:"-"`
}
