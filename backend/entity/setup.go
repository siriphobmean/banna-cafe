package entity

import (
	"time"

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
		&PreorderStatusReceive{},
		&StatusReceivePreorder{},
		&DrinkOption{},
		&Sweetness{},
		&MenuSize{},
		&Payment{}, // add by Ball 03/01/2567
		&PaymentStatus{},
		&StatusPayment{},
		&Accounting{},
		&AccountType{},
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
	db.Create(&menuType) // Assuming 'db' is your GORM database instance


	// IngredientUnit Data
	ingredientUnit := []IngredientUnit{
		{UnitName: "กรัม"},
		{UnitName: "กิโลกรัม"},
		{UnitName: "ซอง"},
	}
	db.Create(&ingredientUnit) // Assuming 'db' is your GORM database instance


	// Role Data
	role := []Role{
		{RoleName: "Owner"},
		{RoleName: "Employee"},
	}
	db.Create(&role) // Assuming 'db' is your GORM database instance


	// Gender Data
	gender := []Gender{
		{GenderName: "ชาย"},
		{GenderName: "หญิง"},
		{GenderName: "เพศอื่น ๆ"},
	}
	db.Create(&gender) // Assuming 'db' is your GORM database instance


	// IngredientType Data Update 2/12/2566 By nop
	ingredientType := []IngredientType{
		{TypeName: "DRIED (ชนิดแห้ง)"},
		{TypeName: "LIQUID (ชนิดเหลว)"},
		{TypeName: "POWDER (ชนิดผง)"},
		{TypeName: "FRESH (ชนิดของสด)"},
	}
	db.Create(&ingredientType) // Assuming 'db' is your GORM database instance
    // Create Menu data
    // menu := []Menu{
    //     {
    //         MenuID: 1,
	// 		MenuName: "กาแฟดำ",
	// 		MenuNameEng: "Black Coffee",
	// 		MenuCost: 65.50,
	// 		MenuStatus: 1,
	// 		MenuTypeID: 1,
    //     },
    //     {
    //         MenuID: 2,
	// 		MenuName: "กาแฟดำ2",
	// 		MenuNameEng: "Black Coffee2",
	// 		MenuCost: 65.50,
	// 		MenuStatus: 1,
	// 		MenuTypeID: 1,
    //     },
    // }
	// db.Create(&menu)
    // Create IngredientMenu data
    ingredientMenu := []IngredientMenu{
        {
            Amount:          10,
            IngredientID:    1,
            MenuID:          1,
            IngredientUnitID: 1,
        },
		{
            Amount:          10,
            IngredientID:    2,
            MenuID:          2,
            IngredientUnitID: 1,
        },
    }
    db.Create(&ingredientMenu)


	// Member Data (ex)
	member := []Member{
		{
			Username: "MeannY",
			Email:    "siriphob@gmail.com",
			Password: "mean1234",
			Phone:    "0981894780",
			Point:    0, // start point setting
		},
		{
			Username: "MeanKung",
			Email:    "siriphob1234@gmail.com",
			Password: "1234eeee",
			Phone:    "0626735910",
			Point:    0, // start point setting
		},
	}

	db.Create(&member) // Assuming 'db' is your GORM database instance
	
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
	db.Create(&sweetness) // Assuming 'db' is your GORM database instance


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
	db.Create(&drinkOption) // Assuming 'db' is your GORM database instance

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
	db.Create(&menuSize) 

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

	db.Create(&statusApprovePreorder) 

	// StatusRecivePreorder Data (ex)
	statusReceivePreorder := []StatusReceivePreorder{
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

	db.Create(&statusReceivePreorder) 

	time1:=time.Now().Add(3 * time.Hour)
	time2:=time.Now().Add(50 * time.Minute)
	preorder := []Preorder{
		{
			TotalAmount: 4000,
			PickUpDateTime: &time1,
			Note:        "",
			Respond:     "",
			Member:      member[0],
		},
		{
			TotalAmount: 8670,
			PickUpDateTime: &time2,
			Note:        "",
			Respond:     "",
			Member:      member[1],
		},
	}
	db.Create(&preorder)

	preorderstatusapprove := []PreorderStatusApprove {
		{
			Preorder:      preorder[0],
			StatusApprovePreorder: statusApprovePreorder[0],
		},
		{
			Preorder:      preorder[1],
			StatusApprovePreorder: statusApprovePreorder[0],
		},
	}
	db.Create(&preorderstatusapprove)

	preorderstatusrecive := []PreorderStatusReceive{
		{
			Preorder:      preorder[0],
			StatusReceivePreorder: statusReceivePreorder[0],
		},
		{
			Preorder:      preorder[1],
			StatusReceivePreorder: statusReceivePreorder[0],
		},
	}
	db.Create(&preorderstatusrecive)

	employee := []Employee{
		{
			FirstName: "Ajinomoto",
			LastName: "Umami",
			Email:"ajino007@gmail.com",
			Password: "yukikaze",
			Age: 97,
			Salary: 15000.00,
			RoleID: role[1].ID,
			Role: role[1],
			GenderID: gender[1].ID,
			Gender: gender[1],
		},
		{
			FirstName: "Honda",
			LastName: "Yamaha",
			Email:"Inwza007@gmail.com",
			Password: "harekaze",
			Age: 2,
			Salary: 300.00,
			RoleID: role[1].ID,
			Role: role[1],
			GenderID: gender[0].ID,
			Gender: gender[0],
		},
	}
	db.Create(&employee)

	promotion := []Promotion{
		{
			Code: "Happy Newyear",
			Name:"โปรโมชั่นปีใหม่",
			Image: "https://i.imgur.com/GrOJ0hG.jpg",
			TimeOfbegin: time.Date(2023,time.December, 20, 0, 0, 0, 0, time.Local),
			TimeOfend: time.Date(2024,time.January, 15, 0, 0, 0, 0, time.Local),
			Discount: 50.00,
			EmployeeID: &employee[0].ID,
			Employee: employee[0],
		},
		{
			Code: "winter",
			Name:"โปรโมชั่นฤดูหนาว",
			Image: "https://i.imgur.com/YJTSJjO.jpg",
			TimeOfbegin: time.Date(2023,time.November, 15, 0, 0, 0, 0, time.Local),
			TimeOfend: time.Date(2024,time.February, 15, 0, 0, 0, 0, time.Local),
			Discount: 30.00,
			EmployeeID: &employee[1].ID,
			Employee: employee[1],
		},
	}
	db.Create(&promotion)

	payment := []Payment{
		{
			Image: "https://i.imgur.com/IdNRrbK.jpg",
			Time: time.Now(),
			Code: "Happy Newyear",
			TotalAmount: 444,
			Preorder: preorder[1],
			PromotionID: &promotion[1].ID,
		},
		// {
		// 	Image: "https://i.imgur.com/G9JVbhU.jpg",
		// 	Time: time.Now(),
		// 	Code: "ome wa mou shinderu",
		// 	TotalAmount: 444,
		// 	Preorder: preorder[1],
		// },
	}
	db.Create(&payment)

	accountType := []AccountType{
		{
			Name: "รายรับ",
		},
		{
			Name: "รายจ่าย",
		},
	}
	db.Create(&accountType)

	menu := []Menu{
		{
			MenuID: 1,
			MenuName: "ชาไทย",
			MenuNameEng: "Thai tea",
			MenuCost: 35.00,
			MenuImage: "https://i.imgur.com/UqmTjKg.png",
			MenuStatus: 1,
			MenuTypeID: menuType[1].ID,
			MenuType: menuType[1],
		},
		{
			MenuID: 2,
			MenuName: "ลาเต้",
			MenuNameEng: "Late",
			MenuCost: 25.00,
			MenuImage: "https://i.imgur.com/99sl6xQ.jpg",
			MenuStatus: 1,
			MenuTypeID: menuType[0].ID,
			MenuType: menuType[0],
		},
		{
			MenuID: 3,
			MenuName: "อเมริกาโน่",
			MenuNameEng: "Americano",
			MenuCost: 25.00,
			MenuImage: "https://i.imgur.com/WFOd4Jq.png",
			MenuStatus: 1,
			MenuTypeID: menuType[0].ID,
			MenuType: menuType[0],
		},
		{
			MenuID: 4,
			MenuName: "มัชฉะลาเต้",
			MenuNameEng: "Macha Late",
			MenuCost: 40.00,
			MenuImage: "https://i.imgur.com/fP0w1P0.png",
			MenuStatus: 1,
			MenuTypeID: menuType[0].ID,
			MenuType: menuType[0],
		},
	}
	
	db.Create(&menu)

	preorderMenu := []PreorderMenu{
		{
			Quantity: 2,
			TotalCost: 70,
			PreorderID: &preorder[0].ID,
			Preorder: preorder[0],
			MenuSizeID: &menuSize[0].ID,
			MenuSize: menuSize[0],
			SweetnessID: &sweetness[0].ID,
			Sweetness: sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption: drinkOption[0],
			MenuID: &menu[0].ID,
			Menu: menu[0],
		},
		{
			Quantity: 3,
			TotalCost: 105,
			PreorderID: &preorder[0].ID,
			Preorder: preorder[0],
			MenuSizeID: &menuSize[0].ID,
			MenuSize: menuSize[0],
			SweetnessID: &sweetness[0].ID,
			Sweetness: sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption: drinkOption[0],
			MenuID: &menu[1].ID,
			Menu: menu[1],
		},
		{
			Quantity: 1,
			TotalCost: 25,
			PreorderID: &preorder[0].ID,
			Preorder: preorder[0],
			MenuSizeID: &menuSize[0].ID,
			MenuSize: menuSize[0],
			SweetnessID: &sweetness[0].ID,
			Sweetness: sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption: drinkOption[0],
			MenuID: &menu[2].ID,
			Menu: menu[2],
		},
		{
			Quantity: 1,
			TotalCost: 40,
			PreorderID: &preorder[0].ID,
			Preorder: preorder[0],
			MenuSizeID: &menuSize[0].ID,
			MenuSize: menuSize[0],
			SweetnessID: &sweetness[0].ID,
			Sweetness: sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption: drinkOption[0],
			MenuID: &menu[3].ID,
			Menu: menu[3],
		},
	}
	db.Create(&preorderMenu)

	
}
