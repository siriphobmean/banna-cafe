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
		&Ingredient{}, // no mean
		&IngredientMenu{}, // mean 50/50 nop
		&OrderMenu{}, // mean 50/50 ?
		&Order{}, // no mean
		&Menu{},
		&MenuType{},
		&Employee{},
		&Role{},
		&Promotion{}, // no mean
		&Rating{}, // mean 50/50 tik
		&Member{}, // mean 50/50 ?
	)
	db = database

	// MenuType Data
	menuType := []MenuType{
		{TypeName: "BEVERAGE (เครื่องดื่ม)"},
		{TypeName: "PIZZA (พิซซ่า)"},
		{TypeName: "MEAL (อาหารมื้อ)"},
		{TypeName: "SNACK (อาหารว่าง)"},
		{TypeName: "CAKE & BAKERY (เค้กและเบเกอรี่)"},
	}

	for _, menuType := range menuType {
		db.Create(&menuType) // Assuming 'db' is your GORM database instance
	}

	// RoleName Data
	role := []Role{
		{RoleName: "Owner"},
		{RoleName: "Employee"},
	}

	for _, role := range role {
		db.Create(&role) // Assuming 'db' is your GORM database instance
	}

	// Ingredient Data (ex)
	
	ingredient := []Ingredient{
		{
			IngredientName: "ผงกาแฟ",
			IngredientCost: 50.00,
			IngredientAmount: 100,
			IngredientSource: "ตลาดเซฟวัน",
		},
		{
			IngredientName: "ผงชาเขียว",
			IngredientCost: 60.00,
			IngredientAmount: 120,
			IngredientSource: "ตลาดเซฟวันโก",
		},
	}

	for _, ingredient := range ingredient {
		db.Create(&ingredient) // Assuming 'db' is your GORM database instance
	}

}