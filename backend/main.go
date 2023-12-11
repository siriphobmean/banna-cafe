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
	r.GET("/genders", controller.ListGenders)

	// Ingredient Routes Update By nop 2/12/2566
	r.GET("/ingredients", controller.ListIngredients)
	r.GET("/lastingredients", controller.GetLastIngredient)
	r.GET("/ingredient/:id", controller.GetIngredient)
	r.POST("/ingredients", controller.CreateIngredient)
	r.PATCH("/ingredients", controller.UpdateIngredient)
	r.DELETE("/ingredients/:id", controller.DeleteIngredient)

	// IngredientType Routes Update By nop 2/12/2566
	r.GET("/ingredientTypes", controller.ListIngredientTypes)

	// IngredientMenu Routes
	r.GET("/ingredientMenus", controller.ListIngredientMenus)
	r.GET("/ingredientMenus/:id", controller.GetIngredientMenu)
	r.POST("/ingredientMenus", controller.CreateIngredientMenu)
	r.PATCH("/ingredientMenus", controller.UpdateIngredientMenu)
	r.DELETE("/ingredientMenus/:id", controller.DeleteIngredientMenu)

	// Member Routes
	r.GET("/members", controller.ListMembers)
	r.GET("/member/:id", controller.GetMember)
	r.POST("/members", controller.CreateMember)
	r.PATCH("/members", controller.UpdateMember)
	r.DELETE("/members/:id", controller.DeleteMember)

	// Rating Routes
	r.GET("/ratings", controller.ListRatings)
	r.GET("/rating/:id", controller.GetRating)
	r.POST("/ratings", controller.CreateRating)
	r.PATCH("/ratings", controller.UpdateRating)
	r.DELETE("/ratings/:id", controller.DeleteRating)

	// History Routes Update By nop 2/12/2566
	r.GET("/histories", controller.ListHistory)
	r.GET("/history/:id", controller.GetHistory)
	r.POST("/histories", controller.CreateHistory)
	r.PATCH("/histories", controller.UpdateHistory)
	r.DELETE("/histories/:id", controller.DeleteHistory)

	// Resource Routes Update By nop 2/12/2566
	r.GET("/resources", controller.ListResource)
	r.GET("/lastresources", controller.GetLastResource)
	r.GET("/resource/:id", controller.GetResource)
	r.POST("/resources", controller.CreateResource)
	r.PATCH("/resources", controller.UpdateResource)
	r.DELETE("/resources/:id", controller.DeleteResource)

	// Ingredient Resource Routes  Update By nop 2/12/2566
	r.GET("/ingredientresources", controller.ListIngredientResource)
	r.GET("/ingredientresource/:id", controller.GetIngredientResource)
	r.POST("/ingredientresources", controller.CreateIngredientResource)
	r.PATCH("/ingredientresources", controller.UpdateIngredientResource)
	r.DELETE("/ingredientresources/:id", controller.DeleteIngredientResource)

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
