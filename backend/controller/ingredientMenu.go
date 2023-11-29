package controller

import (
	"net/http"
	// "fmt" // more p'pond
	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /ingredientMenus
func CreateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var ingredient entity.Ingredient // FK เหมือนกับ MenuType -> Ingredient = MenuType
	var menu entity.Menu             // FK เหมือนกับ MenuType -> Menu = MenuType
	// fmt.Println(menu); // more p'pond

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

// // PATCH /ingredientMenus
// func UpdateIngredientMenu(c *gin.Context) {
// 	var ingredientMenu entity.IngredientMenu
// 	var result entity.Ingredient

// 	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	// ค้นหา ingredientMenu ด้วย id
// 	if tx := entity.DB().Where("id = ?", ingredientMenu.ID).First(&result); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&ingredientMenu).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": ingredientMenu})

// }

// PATCH /ingredientMenus
func UpdateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu

	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredientMenu ด้วย id
	var existingIngredientMenu entity.IngredientMenu
	if err := entity.DB().Where("id = ?", ingredientMenu.ID).First(&existingIngredientMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}

	// อัปเดตข้อมูลที่ต้องการเปลี่ยนแปลง
	existingIngredientMenu.Amount = ingredientMenu.Amount
	existingIngredientMenu.MenuID = ingredientMenu.MenuID // more
	existingIngredientMenu.IngredientID = ingredientMenu.IngredientID // more
	// สามารถอัปเดตค่าอื่น ๆ ตามต้องการได้

	if err := entity.DB().Save(&existingIngredientMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": existingIngredientMenu})
} // credit by ChatGPT

