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
		&IngredientMenu{}, // no mean 50/50
		&OrderMenu{}, // no mean 50/50
		&Order{}, // no mean
		&Menu{},
		&MenuType{},
		&Employee{},
		&Role{},
		&Promotion{}, // no mean
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
}