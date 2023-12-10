package entity
import (
	"time"
	"gorm.io/gorm"
)
type Preorder struct {
	gorm.Model
	TotalAmount int64
	CreateTime  time.Time
	PickUpTime  time.Time
	PickUpDate  time.Time
	Note        string
	Respound    string

	// FK
	MemberID *uint
	Member   Member `gorm:"references:id"`

	PreorderStatusApproves []PreorderStatusApprove `gorm:"foreignKey:PreorderID"`
	PreorderStatusRecives  []PreorderStatusRecive `gorm:"foreignKey:PreorderID"`
	PreorderMenus          []PreorderMenu           `gorm:"foreignKey:PreorderID"`
}