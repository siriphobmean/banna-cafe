package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /ingredients
func CreateIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	// var menuType entity.MenuType

	// bind เข้าตัวแปร ingredient
	if err := c.ShouldBindJSON(&ingredient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา menuType ด้วย id
	// if tx := entity.DB().Where("id = ?", menu.MenuTypeID).First(&menuType); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "menuType not found"})
	// 	return
	// }

	// สร้าง Ingredient
	u := entity.Ingredient{
		// MenuType:  menuType, // โยงความสัมพันธ์กับ Entity MenuType
		IngredientName:  ingredient.IngredientName,
		IngredientCost:  ingredient.IngredientCost,
		IngredientAmount:  ingredient.IngredientAmount,
		IngredientSource: ingredient.IngredientSource,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /ingredient/:id
func GetIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ingredients WHERE id = ?", id).Find(&ingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredient})
}

// GET /ingredients
func ListIngredients(c *gin.Context) {
	var ingredients []entity.Ingredient
	if err := entity.DB().Raw("SELECT * FROM ingredients").Find(&ingredients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredients})
}

// DELETE /ingredients/:id
func DeleteIngredient(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ingredients
func UpdateIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	var result entity.Ingredient

	if err := c.ShouldBindJSON(&ingredient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", ingredient.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}

	if err := entity.DB().Save(&ingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredient})

}
