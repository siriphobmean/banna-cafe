package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
	"github.com/siriphobmean/sa-66-mean/entity"
)
type preoderPayload struct {
	PreoderID   string
	TotalAmount float32 
	PickUpDateTime  time.Time
	// PickUpTime  time.Time
	// PickUpDate  time.Time
	Note        string
	Respound    string
	MemberID 	*uint
	StatusApprovePreorderID *uint
	StatusRecivePreorderID *uint
}
// GET /menus
func ListMenusByMenuTypeID(c *gin.Context) {
	var menus []entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE menu_type_id = ?", id).Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// GET /menus/:name
func ListMenusByName(c *gin.Context) {
	var menus []entity.Menu
	name := c.Param("name")
	if err := entity.DB().Raw("SELECT * FROM menus WHERE menu_name_eng LIKE ? OR menu_name LIKE ?", "%"+name+"%", "%"+name+"%").Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// POST //preorders
func CreatePreorder(c *gin.Context) {
	var data preoderPayload
	var member entity.Member

	// bind เข้าตัวแปร preorders
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(data); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", data.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// สร้าง Preorder
	u := entity.Preorder{
		TotalAmount: 	data.TotalAmount,
		PickUpDateTime: &data.PickUpDateTime,
		// PickUpTime:  data.PickUpTime,
		// PickUpDate:  data.PickUpDate,
		Note:        	data.Note,
		Respound:    	"",
		Member:      	member,
		MemberID: 		&member.ID,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}	
	
	var statusApprovePreorder entity.StatusApprovePreorder
	var preorder entity.Preorder
	// ค้นหา statusApprovePreorder ด้วย id
	if tx := entity.DB().Where("id = ?", data.StatusApprovePreorderID).First(&statusApprovePreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusApprovePreorder not found"})
		return
	}
	
	if tx := entity.DB().Where("id = ?", &u.ID).First(&preorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}

	// สร้าง Menu
	pa := entity.PreorderStatusApprove{
		Preorder:              preorder,
		PreorderID:            &preorder.ID,
		StatusApprovePreorder: statusApprovePreorder,
		StatusApprovePreorderID: &statusApprovePreorder.ID,
	}
	if _, err := govalidator.ValidateStruct(pa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} 
	// บันทึก
	if err := entity.DB().Create(&pa).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var statusRecivePreorder entity.StatusRecivePreorder
	// ค้นหา statusRecivePreorder ด้วย id
	if tx := entity.DB().Where("id = ?", data.StatusRecivePreorderID).First(&statusRecivePreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusRecivePreorder not found"})
		return
	}

	// สร้าง statusRecivePreorder
	pr := entity.PreorderStatusRecive{
		Preorder:              preorder,
		PreorderID:            &preorder.ID,
		StatusRecivePreorder: statusRecivePreorder,
		StatusRecivePreorderID: &statusRecivePreorder.ID,
	}
	if _, err := govalidator.ValidateStruct(pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} 
	// บันทึก
	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": gin.H{"preoder": u, "preorderStatusApprove": pa , "preorderStatusRecive": pr}})
}

// GET /preorder/:id
func GetPreorderByID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM preorders WHERE id = ?", id).Find(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorder})
}

// GET /preorderMember/:id
func GetPreorderStatusPaymentByMemberID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Where("member_id = ?", id).Last(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var preorderStatusApprove entity.PreorderStatusApprove
	if err := entity.DB().Preload("Preorder").Where("preorder_id = ?", preorder.ID).Last(&preorderStatusApprove).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var statusApprovePreorder entity.StatusApprovePreorder
	if err := entity.DB().Where("id = ?", preorderStatusApprove.StatusApprovePreorderID).Last(&statusApprovePreorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusApprovePreorder})
}

// GET /NewpreorderMember/:id
func GetNewPreorderByMemberID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Where("member_id = ?", id).Last(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": preorder})
}

// PATCH /preorders
func UpdatePreorder(c *gin.Context) {
	var preorder entity.Preorder
	var existingPreorder entity.Preorder

	if err := c.ShouldBindJSON(&preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} 

	// ค้นหา preorder ด้วย id
	if tx := entity.DB().Where("id = ?", preorder.ID).First(&existingPreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}

	// existingPreorder.PickUpTime = preorder.PickUpTime .Local()
	// existingPreorder.PickUpDate = preorder.PickUpDate.Local()
	existingPreorder.PickUpDateTime = preorder.PickUpDateTime
	existingPreorder.Note = preorder.Note
	existingPreorder.Respound = preorder.Respound
	existingPreorder.Member = preorder.Member
	existingPreorder.MemberID = preorder.MemberID
	existingPreorder.TotalAmount = preorder.TotalAmount

	if err := entity.DB().Save(&existingPreorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": existingPreorder})
}

// func (t *LocalTime) MarshalJSON() ([]byte, error) {
//     tTime := time.Time(*t)
//     return []byte(fmt.Sprintf("\"%v\"", tTime.Format("2006-01-02 15:04:05"))), nil
// }
// POST //preorders
// func CreatePreorderStatusApprove(c *gin.Context) {
// 	var StatusApprove entity.PreorderStatusApprove
// 	var preorder entity.Preorder
// 	var statusApprovePreorder entity.StatusApprovePreorder
// 	// bind เข้าตัวแปร StatusApprove
// 	if err := c.ShouldBindJSON(&StatusApprove); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ค้นหา preorder ด้วย id
// 	if tx := entity.DB().Where("id = ?", StatusApprove.PreorderID).First(&preorder); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
// 		return
// 	}
// 	// ค้นหา statusApprovePreorder ด้วย id
// 	if tx := entity.DB().Where("id = ?", StatusApprove.StatusApprovePreorderID).First(&statusApprovePreorder); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
// 		return
// 	}

// 	// สร้าง Menu
// 	u := entity.PreorderStatusApprove{
// 		Preorder:              preorder,
// 		StatusApprovePreorder: statusApprovePreorder,
// 	}

// 	// บันทึก
// 	if err := entity.DB().Create(&u).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": u})
// }
