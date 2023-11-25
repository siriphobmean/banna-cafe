package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /ratings
func CreateRating(c *gin.Context) {
	var rating entity.Rating
	var menu entity.Menu // แทน menuType ใน Menu
	var member entity.Member

	// bind เข้าตัวแปร rating
	if err := c.ShouldBindJSON(&rating); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", rating.MenuID).First(&menu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuType not found"})
		return
	}

	// สร้าง rating
	u := entity.Rating{
		Score: rating.Score,
		Menu: menu,
		Member: member,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /rating/:id
func GetRating(c *gin.Context) {
	var rating entity.Rating
	id := c.Param("id")
	if err := entity.DB().Preload("Menu").Raw("SELECT * FROM ratings WHERE id = ?", id).Find(&rating).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rating})
}

// GET /ratings
func ListRatings(c *gin.Context) {
	var ratings []entity.Rating
	if err := entity.DB().Preload("Menu").Raw("SELECT * FROM ratings").Find(&ratings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ratings})
}

// DELETE /ratings/:id
func DeleteRating(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ratings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ratings
func UpdateRating(c *gin.Context) {
	var rating entity.Rating
	var result entity.Rating

	if err := c.ShouldBindJSON(&rating); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา rating ด้วย id
	if tx := entity.DB().Where("id = ?", rating.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}

	if err := entity.DB().Save(&rating).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rating})
}
