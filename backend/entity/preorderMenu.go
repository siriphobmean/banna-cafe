package entity
import (
	"gorm.io/gorm"
)
type PreorderMenu struct {
	gorm.Model
	Quantity  int
	TotalCost float32 `gorm:"type:decimal(7,6);"`
	Size      string
	Sweetness string
	Option    string

	// FK
	PreorderID *uint
	Preorder   Preorder `gorm:"references:id"`

	// FK
	MenuID *uint
	Menu   Menu `gorm:"references:id"`
}