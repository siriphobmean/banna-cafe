package entity

import (
	"regexp"

	"gorm.io/gorm"

	"github.com/asaskevich/govalidator"
)

type Member struct {
	gorm.Model

	Username    string `gorm:"uniqueIndex" valid:"required~กรุณากรากชื่อ !,maxstringlength(50)~ความยาวต้องไม่เกิน 50 อักษร"`
	Email       string `gorm:"uniqueIndex" valid:"required~กรุณากราก Email !, email~Email ผิดพลาด"`
	Password    string `valid:"required~กรุณากรอกรหัสผ่าน !,matches(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$]).*$)~should contain at least one uppercase letter, lowercase letter, digit, and special symbol"`
	Phone       string `valid:"matches(^\\+[0-9]+$)~กรุณากรอกหมายเลขโทรศัพท์เป็นตัวเลข 0-9"`
	MemberImage string `gorm:"type:longtext" valid:"image_valid~รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"`
	Point       int    

	Order     []Order    `gorm:"foreignKey:MemberID"`
	Rating    []Rating   `gorm:"foreignKey:MemberID"`
	Preorders []Preorder `gorm:"foreignKey:MemberID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("Password", govalidator.CustomTypeValidator(validatePassword))
	govalidator.TagMap["image_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^(data:image(.+);base64,.+)$")
	})
}

func validatePassword(i interface{}, context interface{}) bool {
	password, ok := i.(string)
	if !ok {
		return false
	}

	passwordRegex := `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*]).*$`

	regExp, err := regexp.Compile(passwordRegex)
	if err != nil {
		return false
	}

	// Test the password against the regular expression
	return regExp.MatchString(password)
}
