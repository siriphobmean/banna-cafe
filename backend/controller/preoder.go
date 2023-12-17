package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

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
	var preorder entity.Preorder
	var member entity.Member

	// bind เข้าตัวแปร menu
	if err := c.ShouldBindJSON(&preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา menuType ด้วย id
	if tx := entity.DB().Where("id = ?", preorder.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// สร้าง Menu
	u := entity.Preorder{
		TotalAmount: preorder.TotalAmount,
		CreateTime:  preorder.UpdatedAt,
		PickUpTime:  preorder.PickUpTime,
		PickUpDate:  preorder.PickUpDate,
		Note:        preorder.Note,
		Respound:    "",
		Member:		 member,
	}
	
	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /preorder/:id
func GetPreorderByID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM preoders WHERE id = ?", id).Find(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorder})
}


// // PATCH /preorders
// func UpdatePreorder(c *gin.Context) {
// 	var menu entity.Menu
// 	var result entity.Menu

// 	if err := c.ShouldBindJSON(&menu); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	// ค้นหา menu ด้วย id
// 	if tx := entity.DB().Where("id = ?", menu.ID).First(&result); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&menu).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": menu})
// }
