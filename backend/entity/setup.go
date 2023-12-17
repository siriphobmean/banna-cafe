package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-project.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	database.AutoMigrate(
		&Ingredient{},         // no mean
		&Resource{},           // Update 2/12/2566 by Nop
		&IngredientResource{}, // Update 2/12/2566 by Nop
		&IngredientType{},     // Update 2/12/2566 by Nop
		&History{},            // Update 2/12/2566 by Nop
		&IngredientMenu{},     // mean 50/50 nop
		&OrderMenu{},          // mean 50/50 ?
		&Order{},              // no mean
		&Menu{},
		&MenuType{},
		&IngredientUnit{}, // more 13/12/66 -> edit 15/12/66
		&Employee{},
		&Role{},
		&Promotion{}, // no mean
		&Rating{},    // mean 50/50 tik
		&Member{},    // mean 50/50 ?
		&Gender{},
		&Preorder{},  // Update 10/12/2566 by Tik
		&PreorderMenu{},
		&PreorderStatusApprove{},
		&StatusApprovePreorder{},
		&PreorderStatusRecive{},
		&StatusRecivePreorder{},
		&DrinkOption{},
		&Sweetness{},
		&MenuSize{},
	)
	db = database

	// MenuType Data
	menuType := []MenuType{
		{TypeName: "กาแฟ"},
		{TypeName: "ชา & นม"},
		{TypeName: "ผลไม้"},
		{TypeName: "เค้ก & เบเกอรี่"},
		{TypeName: "สำเร็จรูป"},
	}

	for _, menuType := range menuType {
		db.Create(&menuType) // Assuming 'db' is your GORM database instance
	}

	// IngredientUnit Data
	ingredientUnit := []IngredientUnit{
		{UnitName: "กรัม"},
		{UnitName: "กิโลกรัม"},
		{UnitName: "ซอง"},
	}

	for _, ingredientUnit := range ingredientUnit {
		db.Create(&ingredientUnit) // Assuming 'db' is your GORM database instance
	} // more 13/12/66 edit 15/12/66

	// Role Data
	role := []Role{
		{RoleName: "Owner"},
		{RoleName: "Employee"},
	}

	for _, role := range role {
		db.Create(&role) // Assuming 'db' is your GORM database instance
	}

	// Gender Data
	gender := []Gender{
		{GenderName: "ชาย"},
		{GenderName: "หญิง"},
		{GenderName: "เพศอื่น ๆ"},
	}

	for _, gender := range gender {
		db.Create(&gender) // Assuming 'db' is your GORM database instance
	}

	// IngredientType Data Update 2/12/2566 By nop
	ingredientType := []IngredientType{
		{TypeName: "DRIED (ชนิดแห้ง)"},
		{TypeName: "LIQUID (ชนิดเหลว)"},
		{TypeName: "POWDER (ชนิดผง)"},
		{TypeName: "FRESH (ชนิดของสด)"},
	}

	for _, ingredientType := range ingredientType {
		db.Create(&ingredientType) // Assuming 'db' is your GORM database instance
	}

	// Member Data (ex)
	member := []Member{
		{
			Username: "MeannY",
			Email:    "siriphob@gmail.com",
			Password: "mean1234",
			Phone:    "0981894780",
			Point:    100,
		},
		{
			Username: "MeanKung",
			Email:    "siriphob1234@gmail.com",
			Password: "1234eeee",
			Phone:    "0626735910",
			Point:    150,
		},
	}

	for _, member := range member {
		db.Create(&member) // Assuming 'db' is your GORM database instance
	}

}
