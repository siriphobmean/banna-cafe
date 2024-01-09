package entity
import (
	"gorm.io/gorm"
)
type StatusRecivePreorder struct {
	gorm.Model
	Name string `gorm:"not null;uniqueIndex"`

	PreorderStatusRecives []PreorderStatusRecive `gorm:"foreignKey:StatusRecivePreorderID"`
}