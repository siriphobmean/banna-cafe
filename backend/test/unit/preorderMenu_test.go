package unit

import (
	//"fmt" -> not use :D
	"testing"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/siriphobmean/sa-66-mean/entity"
)

func TestQuantity(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Quantity is required`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)
		preorderMenu := entity.PreorderMenu{
			Quantity: 0,
			TotalCost: 129,
			PreorderID: &preorderID,
			MenuSizeID: &menuSizeID,
			SweetnessID: &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID: &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอก Quantity !"))	
	})

	t.Run(`Quantity should be within the range of 1 to 20`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)

		preorderMenu := entity.PreorderMenu{
			Quantity:      25,
			TotalCost:     129,
			PreorderID:    &preorderID,
			MenuSizeID:    &menuSizeID,
			SweetnessID:   &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID:        &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)

		g.Expect(ok).NotTo(BeTrue())    
		g.Expect(err).NotTo(BeNil())    
		g.Expect(err.Error()).To(Equal("กรุณาเลือกจำนวนใหม่ที่อยู่ในช่วง 1 ถึง 20"))
	})

	t.Run(`Quantity pattern is valid`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)
		preorderMenu := entity.PreorderMenu{
			Quantity: 2,
			TotalCost: 129,
			PreorderID: &preorderID,
			MenuSizeID: &menuSizeID,
			SweetnessID: &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID: &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestTotalCost(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`TotalCost is required`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)
		preorderMenu := entity.PreorderMenu{
			Quantity: 1,
			TotalCost: 0,
			PreorderID: &preorderID,
			MenuSizeID: &menuSizeID,
			SweetnessID: &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID: &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอก TotalCost !"))	
	})

	t.Run(`TotalCost should have 2 decimal places`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)

		preorderMenu := entity.PreorderMenu{
			Quantity:      2,
			TotalCost:     129.505,
			PreorderID:    &preorderID,
			MenuSizeID:    &menuSizeID,
			SweetnessID:   &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID:        &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)

		g.Expect(ok).NotTo(BeTrue())    
		g.Expect(err).NotTo(BeNil())    
		g.Expect(err.Error()).To(Equal("TotalAmount ต้องมีทศนิยม 2 ตำแหน่ง"))
	})

	t.Run(`TotalCost pattern is valid`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)
		preorderMenu := entity.PreorderMenu{
			Quantity: 2,
			TotalCost: 129,
			PreorderID: &preorderID,
			MenuSizeID: &menuSizeID,
			SweetnessID: &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID: &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

// func TestMemberID(t *testing.T) {

// 	g := NewGomegaWithT(t)

// 	t.Run(`MemberID is required`, func(t *testing.T) {
// 		pickUpDateTime := time.Now().Add(50 * time.Minute)
// 		preorder := entity.Preorder{
// 			TotalAmount:    12.22,
// 			PickUpDateTime: &pickUpDateTime,
// 			Note:           "ไม่รับถั่ว",
// 			Respond:        "",
// 			MemberID:       nil,
// 		}

// 		ok, err := govalidator.ValidateStruct(preorder)
// 		g.Expect(ok).NotTo(BeTrue())
// 		g.Expect(err).NotTo(BeNil())
// 		g.Expect(err.Error()).To(Equal("Member is required !"))	
// 	})

// 	t.Run(`MemberID pattern is valid`, func(t *testing.T) {
// 		memberID := uint(1)
// 		pickUpDateTime := time.Now().Add(50 * time.Minute)
// 		preorder := entity.Preorder{
// 			TotalAmount:    122.09,
// 			PickUpDateTime: &pickUpDateTime,
// 			Note:           "ไม่รับถั่ว",
// 			Respond:        "",
// 			MemberID:       &memberID,
// 		}

// 		ok, err := govalidator.ValidateStruct(preorder)

// 		g.Expect(ok).To(BeTrue())
// 		g.Expect(err).To(BeNil())
// 	})
// }