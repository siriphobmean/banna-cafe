package entity

import (
	"gorm.io/gorm"
	"strings"
	"github.com/asaskevich/govalidator"
)

type Member struct {
	gorm.Model

	Username    string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อ !,maxstringlength(50)~ชื่อผู้ใช้ความยาวต้องไม่เกิน 50 อักษร"`
	Email       string `gorm:"uniqueIndex" valid:"required~กรุณากรอก Email !, email~Email ผิดพลาด"`
	Password 	string `valid:"required~กรุณากรอกรหัสผ่าน !,validatePassword~รหัสผ่านต้อง 8 ตัวมีอย่างน้อยหนึ่งตัวอักษรใหญ่ หนึ่งตัวอักษรเล็ก หนึ่งตัวเลข และอักขระพิเศษ @$!%*?&"`	// Password    string `valid:"required~กรุณากรอกรหัสผ่าน !,validatePassword~password should contain at least one uppercase letter, lowercase letter, digit, and special symbol"`
	Phone 	    string `valid:"matches(^\\+[0-9]+$)~กรุณากรอกหมายเลขโทรศัพท์เป็นตัวเลข 0-9"`
	MemberImage string `gorm:"type:longtext" valid:"image_valid~รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"`
	Point       int    

	// Order     []Order    `gorm:"foreignKey:MemberID"`
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
	str, ok := i.(string)
	if !ok {
		return false
	}

	// Check if the password has a length of 8 or more.
	if len(str) < 8 {
		return false
	}

	// Check for at least one uppercase letter.
	if !strings.ContainsAny(str, "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
		return false
	}

	// Check for at least one lowercase letter.
	if !strings.ContainsAny(str, "abcdefghijklmnopqrstuvwxyz") {
		return false
	}

	// Check for at least one digit.
	if !strings.ContainsAny(str, "0123456789") {
		return false
	}

	// Check for at least one special symbol.
	specialSymbols := " @$!%*?&"
	if !strings.ContainsAny(str, specialSymbols) {
		return false
	}

	return true
}
// Username    string `gorm:"uniqueIndex" valid:"required~กรุณากรากชื่อ !,maxstringlength(50)~ความยาวต้องไม่เกิน 50 อักษร"`
// 	Email       string `gorm:"uniqueIndex" valid:"required~กรุณากราก Email !, email~Email ผิดพลาด"`
// 	Password    string `valid:"required~กรุณากรอกรหัสผ่าน !,matches(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$]).*$)~should contain at least one uppercase letter, lowercase letter, digit, and special symbol"`
// 	Phone       string `valid:"matches(^\\+[0-9]+$)~กรุณากรอกหมายเลขโทรศัพท์เป็นตัวเลข 0-9"`
// 	MemberImage string `gorm:"type:longtext" valid:"image_valid~รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"`
// 	Point    