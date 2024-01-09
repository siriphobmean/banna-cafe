package unit

import (
	//"fmt" -> not use :D
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/siriphobmean/sa-66-mean/entity"
)

func TestTotalAmount(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`TotalAmount is required`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			TotalAmount:    0,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบ TotalAmount !"))	
	})

	t.Run(`TotalAmount should have 2 decimal places`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			TotalAmount:    122.0989,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalAmount ต้องมีทศนิยม 2 ตำแหน่ง"))	
	})

	t.Run(`TotalAmount pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestPickUpDateTime(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`TotalAmount is required`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(40 * time.Minute)
		preorder := entity.Preorder{
			TotalAmount:    112.22,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบ TotalAmount !"))	
	})

	t.Run(`TotalAmount should have 2 decimal places`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			TotalAmount:    122.0989,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalAmount ต้องมีทศนิยม 2 ตำแหน่ง"))	
	})

	t.Run(`TotalAmount pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}