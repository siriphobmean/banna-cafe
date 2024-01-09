package unit

import (
	//"fmt" -> not use :D
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/siriphobmean/sa-66-mean/entity"
)

func TestMenuName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`menu_name is required`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "", // incorrect :( -> null
			MenuNameEng: "Black Coffee",
			MenuCost:    55.55,
			MenuImage:   "", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกชื่อเมนู !")))
	})

	t.Run(`menu_name pattern is not true`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "กาแฟดำที่อร่อยที่สุดในสามโลก กินแล้วสุขภาพดีร่ำรวยทุกวันวันปีตลอดกาล", // incorrect :( -> longest > 50
			MenuNameEng: "Black Coffee",
			MenuCost:    55.55,
			MenuImage:   "", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		// g.Expect(err.Error()).To(Equal(fmt.Sprintf("MenuName: %s does not validate as maxstringlength(50)", menu.MenuName)))
		g.Expect(err.Error()).To(Equal(("ชื่อเมนูต้องมีตัวอักษรไม่เกิน 50 ตัว")))
	})
}

func TestMenuCost(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`menu_cost is required`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "โกโก้",
			MenuNameEng: "CoCoa",
			MenuCost:    0, // incorrect :( -> null
			MenuImage:   "", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกเป็นเลขทศนิยม !")))
	})

	t.Run(`menu_cost pattern is not true`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "โกโก้",
			MenuNameEng: "CoCoa",
			MenuCost:    55.123, // incorrect :( -> decimal > .xx (2)
			MenuImage:   "", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกเลขทศนิยม 2 ตำแหน่ง")))
	})

}

func TestMenuStatus(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`menu_status is required`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "ชาไทย",
			MenuNameEng: "Thai Tea",
			MenuCost:    55.55,
			MenuImage:   "", // longtext
			MenuStatus:  0, // incorrect :( -> range 1|2 don't have 0
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกสถานะเมนู !")))
	})

	t.Run(`menu_status pattern is not true`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "ชาไทย",
			MenuNameEng: "Thai Tea",
			MenuCost:    55.55,
			MenuImage:   "", // longtext
			MenuStatus:  3, // incorrect :( -> range 1|2 don't have 3
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		// g.Expect(err.Error()).To(Equal(fmt.Sprintf("MenuStatus: %d does not validate as range(1|2)", menu.MenuStatus)))
		g.Expect(err.Error()).To(Equal(("กรุณากรอกเฉพาะเลข 1 หรือ 2 เท่านั้น")))
	})

}

func TestMenuValidAll(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Menu pattern is valid all`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "ชาเขียว",
			MenuNameEng: "Green Tea",
			MenuCost:    55.05,
			MenuImage:   "", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}