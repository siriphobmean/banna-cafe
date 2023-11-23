package main

import (
	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/controller"
	"github.com/siriphobmean/sa-66-mean/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Menu Routes
	r.GET("/menus", controller.ListMenus)
	r.GET("/menu/:id", controller.GetMenu)
	r.POST("/menus", controller.CreateMenu) // sholee & biw -> edit "menu"
	r.PATCH("/menus", controller.UpdateMenu)
	r.DELETE("/menus/:id", controller.DeleteMenu)
	// MenuType Routes
	r.GET("/menuTypes", controller.ListMenuTypes)
	
	// Employee Routes
	r.GET("/employees", controller.ListEmployees)
	r.GET("/employee/:id", controller.GetEmployee)
	r.POST("/employees", controller.CreateEmployee)
	r.PATCH("/employees", controller.UpdateEmployee)
	r.DELETE("/employees/:id", controller.DeleteEmployee)
	// Role Routes
	r.GET("/roles", controller.ListRoles)
	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
