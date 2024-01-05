package entity
import (
	"gorm.io/gorm"
)
type PreorderMenu struct {
	gorm.Model
	Quantity  int
	TotalCost float32 `gorm:"type:decimal(7,2)"`

	// FK
	PreorderID *uint
	Preorder   Preorder `gorm:"references:id"`
	// FK
	MenuSizeID *uint
	MenuSize   MenuSize `gorm:"references:id"`
	// FK
	SweetnessID *uint
	Sweetness   Sweetness `gorm:"references:id"`
	// FK
	DrinkOptionID *uint
	DrinkOption   DrinkOption `gorm:"references:id"`

	// FK
	MenuID *uint
	Menu   Menu `gorm:"references:id"`
}