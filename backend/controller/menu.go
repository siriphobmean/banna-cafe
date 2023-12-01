package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /menus
func CreateMenu(c *gin.Context) {
	var menu entity.Menu
	var menuType entity.MenuType

	// bind เข้าตัวแปร menu
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา menuType ด้วย id
	if tx := entity.DB().Where("id = ?", menu.MenuTypeID).First(&menuType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuType not found"})
		return
	}

	// สร้าง Menu
	u := entity.Menu{
		MenuType:  menuType, // โยงความสัมพันธ์กับ Entity MenuType
		MenuTypeID: menu.MenuTypeID, // more 8:58 AM 28/11/2023
		MenuID: menu.MenuID, // more 12:43 AM 29/11/2023 เก็บตารางท้ายสุด
		// -> ถ้าไม่มีส่วนนี้ จะเก็บเป็น 0 (คนละส่วนกับ ID แรก ฟีลเอามาเก็บอิงไว้เฉย ๆ)
		MenuName:  menu.MenuName, // ตั้งค่าฟิลด์ MenuName
		MenuNameEng:  menu.MenuNameEng, // ตั้งค่าฟิลด์ MenuName
		MenuCost:  menu.MenuCost, // ตั้งค่าฟิลด์ MenuCost
		MenuImage: menu.MenuImage, // ตั้งค่าฟิลด์ MenuImage
		MenuStatus: menu.MenuStatus, // ตั้งค่าฟิลด์ MenuStatus // more
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /menu/:id
func GetMenu(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE id = ?", id).Find(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// GET /menus
func ListMenus(c *gin.Context) {
	var menus []entity.Menu
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus").Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// DELETE /menus/:id
func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /menus
func UpdateMenu(c *gin.Context) {
	var menu entity.Menu
	var result entity.Menu

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", menu.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}

	if err := entity.DB().Save(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menu})
}
