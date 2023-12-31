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
	database, err := gorm.Open(sqlite.Open("se-banna.db"), &gorm.Config{})
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
		&Payment{}, // add by Ball 03/01/2567
	)
	db = database

	// MenuType Data
	menuType := []MenuType{
		{TypeName: "กาแฟ"},
		{TypeName: "ชา & นม"},
		{TypeName: "ผลไม้"},
		{TypeName: "เบเกอรี่"},
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
		{RoleName: "Manager"},
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

	var count1 int64
	db.Model(&IngredientMenu{}).Count(&count1)

	if count1 == 0 {
    // Create Menu data
    menu := []Menu{
        {
            MenuID: 1,
			MenuName: "กาแฟดำ",
			MenuNameEng: "Black Coffee",
			MenuCost: 65.50,
			MenuStatus: 1,
			MenuTypeID: 1,
        },
        {
            MenuID: 2,
			MenuName: "กาแฟดำ2",
			MenuNameEng: "Black Coffee2",
			MenuCost: 65.50,
			MenuStatus: 1,
			MenuTypeID: 1,
        },
    }

    for _, menu := range menu {
        	db.Create(&menu)
    	}
	}

	var count2 int64
	db.Model(&IngredientMenu{}).Count(&count2)

	if count2 == 0 {
    // Create IngredientMenu data
    ingredientMenu := []IngredientMenu{
        {
            Amount:          10,
            IngredientID:    1,
            MenuID:          1,
            IngredientUnitID: 1,
        },
    }

    for _, ingredientMenu := range ingredientMenu {
        	db.Create(&ingredientMenu)
    	}
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
	
	// Sweetness Data (ex)
	sweetness := []Sweetness{
		{
			Name:  "ไม่หวาน",
			Value: 25,
		},
		{
			Name:  "หวานน้อย",
			Value: 50,
		},
		{
			Name:  "หวานปกติ",
			Value: 100,
		},
	}

	for _, sweetness := range sweetness {
		db.Create(&sweetness) // Assuming 'db' is your GORM database instance
	}

	// DrinkOption Data (ex)
	drinkOption := []DrinkOption{
		{
			Name: "ร้อน",
		},
		{
			Name: "เย็น",
		},
		{
			Name: "ปั่น",
		},
	}

	for _, drinkOption := range drinkOption {
		db.Create(&drinkOption) // Assuming 'db' is your GORM database instance
	}
		// menuSize Data (ex)
	menuSize := []MenuSize{
		{
			Name:           "s",
			AddAmount:      0,
			Quantity:       360,
			UnitOfQuantity: "ml",
		},
		{
			Name:           "m",
			AddAmount:      25,
			Quantity:       480,
			UnitOfQuantity: "ml",
		},
		{
			Name:           "l",
			AddAmount:      40,
			Quantity:       600,
			UnitOfQuantity: "ml",
		},
	}

	for _, menuSize := range menuSize {
		db.Create(&menuSize) 
	}
	// StatusApprovePreorder Data (ex)
	statusApprovePreorder := []StatusApprovePreorder{
		{
			Name:           "รออนุมัติการสั่งจอง",
		},
		{
			Name:           "อนุมัติการสั่งจอง",
		},
		{
			Name:           "ไม่อนุมัติการสั่งจอง",
		},
	}

	for _, statusApprovePreorder := range statusApprovePreorder {
		db.Create(&statusApprovePreorder) 
	}
	// StatusRecivePreorder Data (ex)
	statusRecivePreorder := []StatusRecivePreorder{
		{
			Name:           "รออนุมัติการสั่งจอง",
		},
		{
			Name:           "ยังไม่ได้รับสินค้า",
		},
		{
			Name:           "รับสินค้าแล้วเรียบร้อย",
		},
	}

	for _, statusRecivePreorder := range statusRecivePreorder {
		db.Create(&statusRecivePreorder) 
	}
}
