package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// GET /menus
func ListMenusByPreoderTypeID(c *gin.Context) {
	var menus []entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE menu_type_id = ?", id).Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// POST //preorders
func CreatePreorderMenu(c *gin.Context) {
	var preorderMenu entity.PreorderMenu
	var preorder entity.Preorder
	var menu entity.Menu
	var menuSize entity.MenuSize
	var sweetness entity.Sweetness
	var drinkOption entity.DrinkOption
	// bind เข้าตัวแปร preorderMenu
	if err := c.ShouldBindJSON(&preorderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(preorderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} 
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.MenuID).First(&menu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.PreorderID).First(&preorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	// ค้นหา menuSize ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.MenuSizeID).First(&menuSize); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuSize not found"})
		return
	}
	// ค้นหา sweetness ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.SweetnessID).First(&sweetness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sweetness not found"})
		return
	}
	// ค้นหา drinkOption ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.DrinkOptionID).First(&drinkOption); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drinkOption not found"})
		return
	}

	// สร้าง preorderMenu
	u := entity.PreorderMenu{
		Quantity:    preorderMenu.Quantity,
		TotalCost:   preorderMenu.TotalCost,
		Sweetness:   sweetness,
		MenuSize:    menuSize,
		DrinkOption: drinkOption,
		Preorder:    preorder,
		Menu:        menu,
		SweetnessID:   &sweetness.ID,
		MenuSizeID:    &menuSize.ID,
		DrinkOptionID: &drinkOption.ID,
		PreorderID:    &preorder.ID,
		MenuID:        &menu.ID,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /menuSizes
func ListMenuSizes(c *gin.Context) {
	var menuSizes []entity.MenuSize
	if err := entity.DB().Raw("SELECT * FROM menu_sizes").Find(&menuSizes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuSizes})
}
// GET /drinkOptions
func ListDrinkOptions(c *gin.Context) {
	var drinkOptions []entity.DrinkOption
	if err := entity.DB().Raw("SELECT * FROM drink_options").Find(&drinkOptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drinkOptions})
}
// GET /sweetnesses
func ListSweetnesses(c *gin.Context) {
	var sweetnesses []entity.Sweetness
	if err := entity.DB().Raw("SELECT * FROM sweetnesses").Find(&sweetnesses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sweetnesses})
}
// GET /menuPreorders
func ListGetMenuPreordersByPreoderID(c *gin.Context) {
	var menuPreorders []entity.PreorderMenu
	id := c.Param("id")
	if err := entity.DB().Preload("Preorder").Preload("DrinkOption").Preload("MenuSize").Preload("Sweetness").Raw("SELECT * FROM preorder_menus WHERE preorder_id = ?", id).Find(&menuPreorders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuPreorders})
}
// // GET /preorder/:id
// func GetPreorderByID(c *gin.Context) {
// 	var preorder entity.Preorder
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM preoders WHERE id = ?", id).Find(&preorder).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": preorder})
// }

// PATCH /preorders
func UpdatePreorderMenu(c *gin.Context) {
	var preorderMenu entity.PreorderMenu
	var existingPreorderMenu entity.PreorderMenu
	if err := c.ShouldBindJSON(&preorderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา preorder ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.ID).First(&existingPreorderMenu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	var preorder entity.Preorder
	var menu entity.Menu
	var menuSize entity.MenuSize
	var sweetness entity.Sweetness
	var drinkOption entity.DrinkOption

	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.MenuID).First(&menu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.PreorderID).First(&preorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	// ค้นหา menuSize ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.MenuSizeID).First(&menuSize); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuSize not found"})
		return
	}
	// ค้นหา sweetness ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.SweetnessID).First(&sweetness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sweetness not found"})
		return
	}
	// ค้นหา drinkOption ด้วย id
	if tx := entity.DB().Where("id = ?", preorderMenu.DrinkOptionID).First(&drinkOption); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drinkOption not found"})
		return
	}

	existingPreorderMenu.Quantity = preorderMenu.Quantity 
	existingPreorderMenu.TotalCost = preorderMenu.TotalCost
	existingPreorderMenu.Sweetness = sweetness
	existingPreorderMenu.MenuSize = menuSize
	existingPreorderMenu.DrinkOption = drinkOption
	existingPreorderMenu.Preorder = preorder
	existingPreorderMenu.Menu = menu
	existingPreorderMenu.SweetnessID = &sweetness.ID
	existingPreorderMenu.MenuSizeID = &menuSize.ID
	existingPreorderMenu.DrinkOptionID= &drinkOption.ID
	existingPreorderMenu.PreorderID = &preorder.ID
	existingPreorderMenu.MenuID = &menu.ID

	if _, err := govalidator.ValidateStruct(existingPreorderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Save(&existingPreorderMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": existingPreorderMenu})
}
