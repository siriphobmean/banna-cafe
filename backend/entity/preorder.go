package entity

import (
	// "fmt"
	"time"

	"gorm.io/gorm"
)

// type LocalTime time.Time

// func (t *LocalTime) MarshalJSON() ([]byte, error) {
//     tTime := time.Time(*t)
//     return []byte(fmt.Sprintf("\"%v\"", tTime.Format("15:04"))), nil
// }

// type LocalDate time.Time

// func (t *LocalDate) MarshalJSON() ([]byte, error) {
//     tTime := time.Time(*t)
//     return []byte(fmt.Sprintf("\"%v\"", tTime.Format("2006-01-02"))), nil
// }

type Preorder struct {
    gorm.Model
    PreoderID   string
    TotalAmount float32 `gorm:"type:decimal(7,2)"`
    PickUpTime  time.Time
    PickUpDate time.Time
    Note        string
    Respound     string

    // FK
    MemberID *uint
    Member   Member `gorm:"references:id"`

    PreorderStatusApproves []PreorderStatusApprove `gorm:"foreignKey:PreorderID"`
    PreorderStatusRecives  []PreorderStatusRecive  `gorm:"foreignKey:PreorderID"`
    PreorderMenus          []PreorderMenu          `gorm:"foreignKey:PreorderID"`
}
