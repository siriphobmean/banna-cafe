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
	var menu entity.Menu // FK เหมือนกับ MenuType -> Menu = MenuType

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
		// MenuType:  menuType, // โยงความสัมพันธ์กับ Entity MenuType
		// IngredientName:  ingredient.IngredientName,
		// IngredientCost:  ingredient.IngredientCost,
		// IngredientAmount:  ingredient.IngredientAmount,
		// IngredientSource: ingredient.IngredientSource,
		Amount: ingredientMenu.Amount,
		Ingredient: ingredient, // โยงความสัมพันธ์กับ Entity Ingredient
		Menu: menu, // โยงความสัมพันธ์กับ Entity Menu
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

// GET /ingredientMenus
func ListIngredientMenus(c *gin.Context) {
	var ingredientMenus []entity.IngredientMenu
	if err := entity.DB().Preload("Ingredient").Preload("menu").Raw("SELECT * FROM ingredient_menus").Find(&ingredientMenus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenus})
}

// DELETE /ingredientMenus/:id
func DeleteIngredientMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredient_menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ingredientMenus
func UpdateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var result entity.Ingredient

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
