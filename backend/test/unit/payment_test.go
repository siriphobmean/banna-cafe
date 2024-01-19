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
	t.Run("image is needed", func (t *testing.T)  {
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
		g.Expect(err.Error()).To(Equal("image is needed"))
	})
}

func TestPaymentTime(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run("time is required", func(t *testing.T){
		payment := entity.Payment{
			Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
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
		g.Expect(err.Error()).To(Equal("time is required"))
	})
}

func TestPaymentTotalAmount(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run("total amount should be at least 0",func(t *testing.T){
		payment := entity.Payment{
			Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
			Code: "winter",
			Time: time.Now(),
			TotalAmount: -1,
			PromotionID: &i,
			PreorderID: &i,
			EmployeeID: &i,
		}
		ok,err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("total amount should be at least 0"))
	})
}

func TestPaymentAllValid(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run("total amount should be at least 0",func(t *testing.T){
		payment := entity.Payment{
			Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
			Code: "winter",
			Time: time.Now(),
			TotalAmount: 500,
			PromotionID: &i,
			PreorderID: &i,
			EmployeeID: &i,
		}
		ok,err := govalidator.ValidateStruct(payment)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}