package entity
import (
	"gorm.io/gorm"
)
type StatusReceivePreorder struct {
	gorm.Model
	Name string `gorm:"not null;uniqueIndex"`

	PreorderStatusReceives []PreorderStatusReceive `gorm:"foreignKey:StatusReceivePreorderID"`
}