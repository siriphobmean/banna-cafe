package entity
import (
	"gorm.io/gorm"
)
type StatusRecivePreorder struct {
	gorm.Model
	Name string

	PreorderStatusRecives []PreorderStatusRecive `gorm:"foreignKey:StatusRecivePreorderID"`
}