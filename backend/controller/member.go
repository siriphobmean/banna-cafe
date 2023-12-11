package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /members
func CreateMember(c *gin.Context) {
	var member entity.Member

	// bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // ค้นหา role ด้วย id
	// if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
	// 	return
	// }

	// สร้าง Member
	u := entity.Member{

		Username: member.Username,
		Email:     member.Email,
		Password:  member.Password,
		Phone:   	member.Phone,
		MemberImage: member.MemberImage,
		Point:		member.Point,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET /members
func ListMembers(c *gin.Context) {
	var members []entity.Member
	if err := entity.DB().Raw("SELECT * FROM members").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": members})
}

// DELETE /members/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /members
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var result entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", member.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	if err := entity.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}
