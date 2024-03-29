package main

import (
	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/controller"
	"github.com/siriphobmean/sa-66-mean/entity"
	"github.com/siriphobmean/sa-66-mean/middleware"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/membersRegister", controller.CreateMemberRegister)
	r.POST("/login", controller.Login)

	// Menu Routes
	r.GET("/menus", controller.ListMenus)
	r.GET("/menu/:id", controller.GetMenu)
	r.POST("/menus", controller.CreateMenu) // sholee & biw -> edit "menu"
	r.PATCH("/menus", controller.UpdateMenu)
	r.DELETE("/menus/:id", controller.DeleteMenu)
	r.GET("/latestMenuID", controller.GetLatestMenuID) // new 20/12/66
	r.GET("/listActiveMenu", controller.ListActiveMenus)
	r.GET("/listNoActiveMenu", controller.ListNoActiveMenus)
	// MenuType Routes
	r.GET("/menuTypes", controller.ListMenuTypes)
	// IngredientUnit Routes
	r.GET("/ingredientUnits", controller.ListIngredientUnits) // more 13/12/66 -> edit 15/12/66
	// MenuName Routes
	r.GET("/menuNames", controller.ListMenuNames)  // more 20/12/66
	r.GET("/menuNames/:id", controller.GetMenuName) // more 4/1/2024

	// Employee Routes
	r.GET("/employees", controller.ListEmployees)
	r.GET("/employee/:id", controller.GetEmployee)
	r.POST("/employees", controller.CreateEmployee)
	r.PATCH("/employees", controller.UpdateEmployee)
	r.DELETE("/employees/:id", controller.DeleteEmployee)
	// Role Routes
	r.GET("/roles", controller.ListRoles)
	// Gender Routes
	r.GET("/genders", controller.ListGenders)
	r.GET("/genderMale", controller.GenderMale)
	r.GET("/genderFemale", controller.GenderFemale)
	r.GET("/genderOther", controller.GenderOther)

	// Member Routes
	r.GET("/members", controller.ListMembers)
	// r.GET("/member/:id", controller.GetMember)
	r.GET("/member/:id", controller.GetMemberByID)
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
	r.GET("/menu/ingredientMenus/:id", controller.ListIngredientMenus)
	r.GET("/ingredientMenus/:id", controller.GetIngredientMenu)
	r.POST("/ingredientMenus", controller.CreateIngredientMenu)
	r.POST("/ingredientMenus/menuNames", controller.CreateIngredientMenuByMenuName) // more 20/12/2023
	r.PATCH("/ingredientMenus", controller.UpdateIngredientMenu)
	r.DELETE("/ingredientMenus/:id", controller.DeleteIngredientMenu)
	r.DELETE("/menu/ingredientMenus/:id", controller.DeleteIngredientMenuSet) // more 20/12/2023

	// Preoder Routes
	r.GET("/menusByMenuType/:id", controller.ListMenusByMenuTypeID)
	r.GET("/menus/:name", controller.ListMenusByName)
	r.GET("/ratingsByMenuID/:id", controller.GetRatingsByMenuID)
	r.GET("/preorder/:id", controller.GetPreorderByID)
	r.GET("/preorderMember/:id", controller.GetPreorderStatusPaymentByMemberID)
	r.GET("/newPreorderMember/:id", controller.GetNewPreorderByMemberID)
	r.POST("/preorders", controller.CreatePreorder)
	r.PATCH("/preorders", controller.UpdatePreorder)

	// PreoderMenu Routes
	r.POST("/preorderMenus", controller.CreatePreorderMenu)
	r.GET("/sweetnesses", controller.ListSweetnesses)
	r.GET("/menuSizes", controller.ListMenuSizes)
	r.GET("/drinkOptions", controller.ListDrinkOptions)
	r.GET("/preorderMenus/:id", controller.ListGetMenuPreordersByPreoderID)
	r.PATCH("/preorderMenus", controller.UpdatePreorderMenu)

	// Ball Routes
	r.GET("/managepreorders/preorders/get/:id", controller.GetPreOrderByID)
	r.GET("/managepreorders/list", controller.ListMP)
	r.GET("/managepreorders/get/:id", controller.ListMPByID)
	r.GET("/managepreorders/status/get/:id", controller.GetStatusReveivesPreorderByPreorderID)
	r.GET("/managepreorders/status/list", controller.ListStatusReceive)
	r.GET("/managepreorders/paymentbypreorder/get/:id",controller.GetPaymentByPreorderID)
	r.PATCH("/managepreorders/preorders", controller.UpdatePreOrder)
	r.PATCH("/managepreorders/update_status", controller.UpdateStatusReceivePreorder)


	r.GET("/payment/getpromo/:code",controller.GetPromotionByCode)
	r.GET("/payment/getpreordermenu/:id",controller.GetPreorderMenuByPreorderID)
	r.GET("/payment/getemployee/:id",controller.GetEmployeeByID)
	r.POST("/payments",controller.CreatePayment)
	r.POST("/payment/create_accounting",controller.CreateAccoutingByPayment)
	//Ball Routes

	r.GET("/promotions", controller.ListPromotion)
	r.GET("/promotion/:id", controller.GetPromotion)
	r.GET("/lastpromotions", controller.GetLastPromotion)
	r.POST("/promotions", controller.CreatePromotion)
	r.PATCH("/promotions", controller.UpdatePromotion)
	r.DELETE("/promotions/:id", controller.DeletePromotion)

	// Statistics Routes

	r.GET("/countMenu", controller.CountRows)
	r.GET("/countEmployee", controller.CountRowsEm)
	r.GET("/countMember", controller.CountRowMembers)
	r.GET("/countIngredient", controller.CountRowIngredients)
	// r.GET("/countPromotion", controller.CountRowPromotions)
	

	router := r.Group("")
	{
		router.Use(middlewares.Authorizes())
		{

			// // Employee Routes
			// router.GET("/employees", controller.ListEmployees)
			// router.GET("/employee/:id", controller.GetEmployee)
			// router.POST("/employees", controller.CreateEmployee)
			// router.PATCH("/employees", controller.UpdateEmployee)
			// router.DELETE("/employees/:id", controller.DeleteEmployee)
			// // Role Routes
			// router.GET("/roles", controller.ListRoles)
			// router.GET("/genders", controller.ListGenders)

			// // Member Routes
			// router.GET("/members", controller.ListMembers)
			// router.GET("/member/:id", controller.GetMember)
			// router.POST("/members", controller.CreateMember)
			// router.PATCH("/members", controller.UpdateMember)
			// router.DELETE("/members/:id", controller.DeleteMember)

			// // Rating Routes
			// router.GET("/ratings", controller.ListRatings)
			// router.GET("/rating/:id", controller.GetRating)
			// router.POST("/ratings", controller.CreateRating)
			// router.PATCH("/ratings", controller.UpdateRating)
			// router.DELETE("/ratings/:id", controller.DeleteRating)

			// // History Routes Update By nop 2/12/2566
			// router.GET("/histories", controller.ListHistory)
			// router.GET("/history/:id", controller.GetHistory)
			// router.POST("/histories", controller.CreateHistory)
			// router.PATCH("/histories", controller.UpdateHistory)
			// router.DELETE("/histories/:id", controller.DeleteHistory)

			// // Resource Routes Update By nop 2/12/2566
			// router.GET("/resources", controller.ListResource)
			// router.GET("/lastresources", controller.GetLastResource)
			// router.GET("/resource/:id", controller.GetResource)
			// router.POST("/resources", controller.CreateResource)
			// router.PATCH("/resources", controller.UpdateResource)
			// router.DELETE("/resources/:id", controller.DeleteResource)

			// // Ingredient Resource Routes  Update By nop 2/12/2566
			// router.GET("/ingredientresources", controller.ListIngredientResource)
			// router.GET("/ingredientresource/:id", controller.GetIngredientResource)
			// router.POST("/ingredientresources", controller.CreateIngredientResource)
			// router.PATCH("/ingredientresources", controller.UpdateIngredientResource)
			// router.DELETE("/ingredientresources/:id", controller.DeleteIngredientResource)
		}
		r.Run()
	}

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
