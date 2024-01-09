package entity

import (
	"math"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Preorder struct {
	gorm.Model
	// PickUpTime  time.Time
	// PickUpDate time.Time
	TotalAmount 		float32 	  `gorm:"type:decimal(9,2)" valid:"required~กรุณาตรวจสอบ TotalAmount,ValidTotalAmount~TotalAmount ต้องมีทศนิยม 2 ตำแหน่ง"`
	PickUpDateTime      *time.Time    `valid:"Upcoming~กรุณาสั่งจองล่วงหน้าอย่างน้อย 45 นาที"`
	Note                string        `valid:"maxstringlength(100)~Note ความยาวไม่เกิน 100 ตัวอักษร"`
	Respond            string        `valid:"maxstringlength(100)~Respound ความยาวไม่เกิน 100 ตัวอักษร"`
	MemberID            *uint         `valid:"required~Member is required"`
	// MemberID            *uint         
	Member              Member        `gorm:"references:id" valid:"-"`
	
	PreorderStatusApproves []PreorderStatusApprove `gorm:"foreignKey:PreorderID"`
	PreorderStatusRecives  []PreorderStatusRecive  `gorm:"foreignKey:PreorderID"`
	PreorderMenus          []PreorderMenu          `gorm:"foreignKey:PreorderID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("Upcoming", govalidator.CustomTypeValidator(validateUpcoming))
	govalidator.CustomTypeTagMap.Set("ValidTotalAmount", govalidator.CustomTypeValidator(validateTotalAmount))
}

func validateUpcoming(i interface{}, context interface{}) bool {
	pickUpDateTime, ok := i.(*time.Time)
	if !ok || pickUpDateTime == nil {
		return true
	}

	minimumPickUpTime := time.Now().Add(45 * time.Minute)
	return pickUpDateTime.After(minimumPickUpTime)
}

func validateTotalAmount(i interface{}, context interface{}) bool {
    value, ok := i.(float32)
    if !ok {
        return false
    }

    fractionalPart := float64(value*100) - math.Floor(float64(value*100))
    return fractionalPart == 0.00
}
