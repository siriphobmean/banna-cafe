package entity
import (
	"gorm.io/gorm"
)
type StatusApprovePreorder struct {
	gorm.Model
	Name string

	PreorderStatusApproves []PreorderStatusApprove `gorm:"foreignKey:StatusApprovePreorderID"`
}