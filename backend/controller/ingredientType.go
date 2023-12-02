package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// GET /ingredientTypes
func ListIngredientTypes(c *gin.Context) {
	var ingredientTypes []entity.IngredientType
	if err := entity.DB().Raw("SELECT * FROM ingredient_types").Scan(&ingredientTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientTypes})
}
