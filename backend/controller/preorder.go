package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

type preoderPayload struct {
	PreoderID      string
	TotalAmount    float32
	PickUpDateTime time.Time
	// PickUpTime  time.Time
	// PickUpDate  time.Time
	Note                    string
	Respound                string
	MemberID                *uint
	StatusApprovePreorderID *uint
	StatusRecivePreorderID  *uint
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
		TotalAmount:    data.TotalAmount,
		PickUpDateTime: &data.PickUpDateTime,
		// PickUpTime:  data.PickUpTime,
		// PickUpDate:  data.PickUpDate,
		Note:     data.Note,
		Respond:  "",
		Member:   member,
		MemberID: &member.ID,
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
		Preorder:                preorder,
		PreorderID:              &preorder.ID,
		StatusApprovePreorder:   statusApprovePreorder,
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
	var statusReceivePreorder entity.StatusReceivePreorder
	// ค้นหา statusRecivePreorder ด้วย id
	if tx := entity.DB().Where("id = ?", data.StatusRecivePreorderID).First(&statusReceivePreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusRecivePreorder not found"})
		return
	}

	// สร้าง statusRecivePreorder
	pr := entity.PreorderStatusReceive{
		Preorder:                preorder,
		PreorderID:              &preorder.ID,
		StatusReceivePreorder:   statusReceivePreorder,
		StatusReceivePreorderID: &statusReceivePreorder.ID,
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

	c.JSON(http.StatusOK, gin.H{"data": gin.H{"preoder": u, "preorderStatusApprove": pa, "preorderStatusRecive": pr}})
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
	fmt.Print(c)
	var preorder entity.Preorder
	var existingPreorder entity.Preorder

	
	if err := c.ShouldBindJSON(&preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Print(preorder.PickUpDateTime)
	if _, err := govalidator.ValidateStruct(preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา preorder ด้วย id
	if tx := entity.DB().Where("id = ?", preorder.ID).First(&existingPreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	
	fmt.Print(preorder.PickUpDateTime)
	// existingPreorder.PickUpTime = preorder.PickUpTime .Local()
	// existingPreorder.PickUpDate = preorder.PickUpDate.Local()
	existingPreorder.PickUpDateTime = preorder.PickUpDateTime
	existingPreorder.Note = preorder.Note
	existingPreorder.Respond = preorder.Respond
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

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Ball//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

func ListMP(c *gin.Context) {
	var mp []struct {
		PreorderID    int    `json:"PreorderID"`
		//CreateTime    string `json:"CreateTime"`
		PickupTime    string `json:"PickupTime"`
		ApproveStatus string `json:"ApproveStatus"`
		ReceiveStatus string `json:"ReceiveStatus"`
		Price         int    `json:"Price"`
		MemberID      string `json:"MemberID"`
		MemberName    string `json:"MemberName"`
		Slipt         string `json:"Slipt"`
		Respond       string `json:"Respond"`
		Note          string `json:"Note"`
	}
	query := fmt.Sprint("SELECT preorders.id as PreorderID,preorders.pick_up_date_time as PickupTime,status_approve_preorders.name as ApproveStatus,status_receive_preorders.name as ReceiveStatus,preorders.total_amount as Price,members.id as MemberID,payments.image as Slipt,username as MemberName,respond as Respond,note ",
		"FROM preorders ",
		"JOIN members ON preorders.member_id = members.id ",
		"JOIN preorder_status_approves ON preorder_status_approves.preorder_id = preorders.id ",
		"JOIN status_approve_preorders ON status_approve_preorders.id = preorder_status_approves.status_approve_preorder_id ",
		"JOIN preorder_status_receives ON preorder_status_receives.preorder_id = preorders.id ",
		"JOIN status_receive_preorders ON status_receive_preorders.id = preorder_status_receives.status_receive_preorder_id ",
		"JOIN payments ON payments.preorder_id = preorders.id ",
	)

	if err := entity.DB().Raw(query).Scan(&mp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mp})
}

func ListMPByID(c *gin.Context) {
	i := c.Param("id")
	var mp struct {
		PreorderID    int    `json:"PreorderID"`
		//CreateTime    string `json:"CreateTime"`
		PickupTime    string `json:"PickupTime"`
		ApproveStatus string `json:"ApproveStatus"`
		ReceiveStatus string `json:"ReceiveStatus"`
		Price         int    `json:"Price"`
		MemberID      string `json:"MemberID"`
		MemberName    string `json:"MemberName"`
		Slipt         string `json:"Slipt"`
		Respond       string `json:"Respond"`
		Note 		  string `json:"Note"`
	}
	query := fmt.Sprint("SELECT preorders.id as PreorderID,preorders.pick_up_date_time as PickupTime,status_approve_preorders.name as ApproveStatus,status_receive_preorders.name as ReceiveStatus,preorders.total_amount as Price,members.id as MemberID,payments.image as Slipt,username as MemberName,respond as Respond,note ",
	"FROM preorders ",
	"JOIN members ON preorders.member_id = members.id ",
	"JOIN preorder_status_approves ON preorder_status_approves.preorder_id = preorders.id ",
	"JOIN status_approve_preorders ON status_approve_preorders.id = preorder_status_approves.status_approve_preorder_id ",
	"JOIN preorder_status_receives ON preorder_status_receives.preorder_id = preorders.id ",
	"JOIN status_receive_preorders ON status_receive_preorders.id = preorder_status_receives.status_receive_preorder_id ",
	"JOIN payments ON payments.preorder_id = preorders.id ",
	"WHERE preorders.id = ", i)
	if err := entity.DB().Raw(query).Scan(&mp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mp})
}

func GetPreOrderByID(c *gin.Context) {
	i := c.Param("id")
	var p entity.Preorder
	if err := entity.DB().Preload("Member").Preload("PreorderStatusApproves").Preload("PreorderStatusReceives").Raw("SELECT * FROM preorders WHERE id = ?", i).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}
func GetStatusReveivesPreorderByPreorderID(c *gin.Context) {
	i := c.Param("id")
	var p entity.PreorderStatusReceive
	if err := entity.DB().Preload("Preorder").Preload("StatusReceivePreorder").Raw("SELECT * FROM preorder_status_receives WHERE preorder_id = ?", i).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func UpdatePreOrder(c *gin.Context) {
	var preorder entity.Preorder
	var result entity.Preorder

	if err := c.ShouldBindJSON(&preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Raw("Select * FROM preorders WHERE id = ?", preorder.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	preorder.PickUpDateTime = result.PickUpDateTime
	preorder.CreatedAt = result.CreatedAt

	if err := entity.DB().Table("preorders").Save(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorder})
}

func UpdateStatusReceivePreorder(c *gin.Context) {
	var s entity.PreorderStatusReceive
	var result entity.PreorderStatusReceive

	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Raw("Select * FROM preorders WHERE id = ?", s.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	s.CreatedAt = result.CreatedAt
	s.Preorder = result.Preorder
	s.PreorderID = result.PreorderID

	if err := entity.DB().Table("preorders").Save(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": s})
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Ball//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
