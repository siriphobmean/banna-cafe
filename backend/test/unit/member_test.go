package unit

import (
	//"fmt" -> not use :D
	"testing"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/siriphobmean/sa-66-mean/entity"
)
//  Username    string `gorm:"uniqueIndex" valid:"required~กรุณากรากชื่อ !,maxstringlength(50)~ความยาวต้องไม่เกิน 50 อักษร"`
// 	Email       string `gorm:"uniqueIndex" valid:"required~กรุณากราก Email !, email~Email ผิดพลาด"`
// 	Password    string `valid:"required~กรุณากรอกรหัสผ่าน !,matches(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$]).*$)~password should contain at least one uppercase letter, lowercase letter, digit, and special symbol"`
// 	Phone       string `valid:"matches(^\\+[0-9]+$)~กรุณากรอกหมายเลขโทรศัพท์เป็นตัวเลข 0-9"`
// 	MemberImage string `gorm:"type:longtext" valid:"image_valid~รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"`
// 	Point       int    
func TestUsername(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Username is required", func(t *testing.T) {
		Member := entity.Member{
			Username:     "", // Empty username for testing the required validation
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ !"))
	})

	t.Run(`Username should not exceed 50 characters`, func(t *testing.T) {
		Member := entity.Member{
			Username:     "BhuwadolSriton na suraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanaaaaaaaaaaaaaaaaaaaaaareeeeeeeeeeeeee",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ชื่อผู้ใช้ความยาวต้องไม่เกิน 50 อักษร"))	
	})

	t.Run(`Username pattern is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Email is required", func(t *testing.T) {
		Member := entity.Member{
			Username:     "Bhuwadol Sriton", 
			Email:        "",// Empty Email for testing the required validation
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอก Email !"))
	})

	t.Run(`Email is invalid`, func(t *testing.T) {
		Member := entity.Member{
			Username:     "Bhuwadol Sriton",
			Email:        "b6419455g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Email ผิดพลาด"))	
	})

	t.Run(`Email pattern is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestPassword(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Password is required", func(t *testing.T) {
		Member := entity.Member{
			Username:    "Bhuwadol Sriton",
			Email:       "b6419455@g.sut.ac.th",
			Password:    "",
			Phone:       "0987654321",
			MemberImage: "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:       100,
		}

		ok, err := govalidator.ValidateStruct(Member)
		g.Expect(ok).NotTo(BeTrue())          
		g.Expect(err).NotTo(BeNil())               
		g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน !"))  
	})

	t.Run(`Password is invalid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "bcd12355",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("password should contain at least one uppercase letter, lowercase letter, digit, and special symbol"))	
	})

	t.Run(`Password pattern is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}


func TestPhone(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Phone is't number`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "098765432dve",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเลขโทรศัพท์เป็นตัวเลข 0-9"))	
	})
	t.Run(`Phone should not exceed 9-10 digit`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd123!@",
			Phone:        "098765123456",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเลขโทรศัพท์อยู่ในช่วง 10 ตัว"))	
	})

	// t.Run(`Phone pattern is valid`, func(t *testing.T) {
	// 	Member := entity.Member{
	// 		Username: 	  "Bhuwadol Sriton",
	// 		Email:        "b6419455@g.sut.ac.th",
	// 		Password:     "Abcd123!@",
	// 		Phone:        "0987654321",
	// 		MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
	// 		Point:        100,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(Member)

	// 	g.Expect(ok).To(BeTrue())
	// 	g.Expect(err).To(BeNil())
	// })

}