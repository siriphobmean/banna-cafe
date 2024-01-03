package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /ingredientMenus
func CreateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var ingredient entity.Ingredient // FK เหมือนกับ MenuType -> Ingredient = MenuType
	var menu entity.Menu             // FK เหมือนกับ MenuType -> Menu = MenuType
	var ingredientUnit entity.IngredientUnit // fk -> 15/12/66

	// bind เข้าตัวแปร ingredientMenu
	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientMenu.IngredientID).First(&ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}

	// สร้าง IngredientMenu
	u := entity.IngredientMenu{
		Amount:     ingredientMenu.Amount,
		IngredientID: ingredientMenu.IngredientID, // more 28/11/2023 8:51 AM
		MenuID: ingredientMenu.MenuID, // more 28/11/2023 8:51 AM
		Ingredient: ingredient, // โยงความสัมพันธ์กับ Entity Ingredient
		Menu:       menu,       // โยงความสัมพันธ์กับ Entity Menu
		IngredientUnitID: ingredientMenu.IngredientUnitID, // more 13/12/66
		IngredientUnit: ingredientUnit, // more 13/12/66 -> edit 15/12/66
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /ingredientMenu/:id
func GetIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ingredient_menus WHERE id = ?", id).Find(&ingredientMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenu})
}

// // GET /ingredientMenus
// func ListIngredientMenus(c *gin.Context) {
// 	var ingredientMenus []entity.IngredientMenu
// 	if err := entity.DB().Preload("IngredientUnit").Preload("Ingredient").Preload("Menu").Raw("SELECT * FROM ingredient_menus").Find(&ingredientMenus).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": ingredientMenus})
// }

// GET /ingredientMenus
func ListIngredientMenus(c *gin.Context) {
	var ingredientMenus []entity.IngredientMenu
	id := c.Param("id")
	if err := entity.DB().Preload("IngredientUnit").Preload("Ingredient").Preload("Menu").Raw("SELECT * FROM ingredient_menus WHERE menu_id = ?", id).Find(&ingredientMenus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenus})
} // OMG !!!

// DELETE /ingredientMenus/:id
func DeleteIngredientMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredient_menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// DELETE /ingredientMenus/:id
func DeleteIngredientMenuSet(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredient_menus WHERE menu_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
} // more

// PATCH /ingredientMenus
func UpdateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var result entity.IngredientMenu

	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา ingredientMenu ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientMenu.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}

	if err := entity.DB().Save(&ingredientMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenu})

}

// POST /ingredientMenus
func CreateIngredientMenuByMenuName(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var ingredient entity.Ingredient // FK เหมือนกับ MenuType -> Ingredient = MenuType
	var menuName entity.Menu             // FK เหมือนกับ MenuType -> Menu = MenuType
	var ingredientUnit entity.IngredientUnit // fk -> 15/12/66
	// var existingIngredientMenu entity.IngredientMenu

	// bind เข้าตัวแปร ingredientMenu
	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientMenu.IngredientID).First(&ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}

	// ค้นหา menuName ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientMenu.MenuID).First(&menuName); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuName not found"})
		return
	}

	// // ตรวจสอบว่ามี IngredientMenu ที่มี IngredientID เดียวกันอยู่แล้วหรือไม่
	// if tx := entity.DB().Where("ingredient_id = ?", ingredientMenu.IngredientID).First(&existingIngredientMenu); tx.RowsAffected > 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "วัตถุดิบนี้ถูกใช้ไปแล้ว กรุณาเลือกวัตถุดิบอื่น"})
	// 	return
	// }

	// สร้าง IngredientMenu
	u := entity.IngredientMenu{
		Amount:     ingredientMenu.Amount,
		IngredientID: ingredientMenu.IngredientID, // more 28/11/2023 8:51 AM
		MenuID: ingredientMenu.MenuID, // more 28/11/2023 8:51 AM
		Ingredient: ingredient, // โยงความสัมพันธ์กับ Entity Ingredient
		Menu:       menuName,     // โยงความสัมพันธ์กับ Entity Menu
		IngredientUnitID: ingredientMenu.IngredientUnitID, // more 13/12/66
		IngredientUnit: ingredientUnit, // more 13/12/66 -> edit 15/12/66
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}
