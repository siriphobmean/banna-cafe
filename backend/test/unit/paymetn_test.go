package unit

import (
	
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/siriphobmean/sa-66-mean/entity"
)
var i = uint(1);
func TestPaymentImage(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run("slipt is require", func (t *testing.T)  {
		payment := entity.Payment{
			Image: "",
			Time: time.Now(),
			Code: "winter",
			TotalAmount: 100,
			PromotionID: &i,
			PreorderID: &i,
			EmployeeID: &i,
		}
		ok,err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("slipt is require"))
	})
}

func TestPaymentTime(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run("time is require", func(t *testing.T){
		payment := entity.Payment{
			Image: "abc",
			Code: "winter",
			Time: time.Time{},
			TotalAmount: 100,
			PromotionID: &i,
			PreorderID: &i,
			EmployeeID: &i,
		}
		ok,err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("time is require"))
	})
}

func TestPatmentTotalAmount(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run("TotalAmount is require",func(t *testing.T){
		payment := entity.Payment{
			Image: "abc",
			Code: "winter",
			Time: time.Now(),
			PromotionID: &i,
			PreorderID: &i,
			EmployeeID: &i,
		}
		ok,err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalAmount is require"))
	})
	t.Run("TotalAmount need to more than 0",func(t *testing.T){
		payment := entity.Payment{
			Image: "abc",
			Code: "winter",
			Time: time.Now(),
			TotalAmount: 0,
			PromotionID: &i,
			PreorderID: &i,
			EmployeeID: &i,
		}
		ok,err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalAmount is require"))
	})
}