package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// GET /menuTypes
func ListMenuUnits(c *gin.Context) {
	var menuUnits []entity.MenuUnit
	if err := entity.DB().Raw("SELECT * FROM menu_units").Scan(&menuUnits).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuUnits})
} // more 13/12/66
