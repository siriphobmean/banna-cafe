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
			Point:    50, // start point setting
		},
		{
			Username: "MeanKung",
			Email:    "siriphob1234@gmail.com",
			Password: "1234eeee",
			Phone:    "0626735910",
			Point:    50, // start point setting
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
			StatusApprovePreorder: statusApprovePreorder[1],
		},
	}
	db.Create(&preorderstatusapprove)

	preorderstatusrecive := []PreorderStatusReceive{
		{
			Preorder:      preorder[0],
			StatusReceivePreorder: statusReceivePreorder[1],
		},
		{
			Preorder:      preorder[1],
			StatusReceivePreorder: statusReceivePreorder[0],
		},
	}
	db.Create(&preorderstatusrecive)

	payment := []Payment{
		{
			Image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMwAzAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIhABAQEAAwACAgMBAQAAAAAAAAERITFBAmFxkRJRgbED/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOH0gvOfQJnJipQRYEBpPBZ9AkNPeUkBd9/sMAT5IuAIACyF7DwBTxMoBOwAqFAFk1Fme6A15f0yQEUpICLAlBq9JOIH0BeiaeE0DxMWpaC3pNNQAABViUBeU1QKnPq/6lAuECAVFtQFgLQQ09QFIiwF0TDoFXUATTugC3plb1viAKgCy8IKBiLoC7+EvJgBEVAVBQXhFQEFQBekUDj09CAGigcL/wCfz/h858v4/H5Z58pwzACoAAACooAUAsRdABGuMBkAFKYTvvAQW/r6QBZEaAwLT0DE5VAC9gCAAAAGGLQCBAAnRAEPQAAF09D0Eot7QBZEXQKL2AaioASgCAAAAuiKAQgAABiNMgRqTfZPyizM5/4CQ9JwegXtFsQAgsBeoABeEw95UGVnReT6BAAAAAAUADj+N/KeLOVsyAniKgALN8A36OzQEFQBdEBo0nSegYi6AQ9ACxFqAGCgi+IvgCACwpFoJZwi28IAAC+rWVBAoAuIoL0epQFqGmAtn6/tDQEAAAA1c1F0FiabQCKhyBgJAAqy2dUD/DqoAt284TtFnYIqANTpAkAWVMAWpABKAAAAqALO1Q0A8XUnYGI0gCACoulA1A5AWotAVJ2oIFACIoJQACi0EVAFIGAsSrcTwEAANABUXwCZ6gQCcVfUAWXjFIAlCgAiggAAAAAKvaEAoWICoqAI1KgCmc4ZwCL0hoCkWTgElGpOLUvl/sEwU+M35YCWC3mJnIHiLekACLICKgC9o18Z3+NQAE9BUX5TLiAASg//2Q==",
			Time: time.Now(),
			Code: "gigachad",
			TotalAmount: 444,
			Preorder: preorder[0],
		},
		{
			Image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMwAzAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIhABAQEAAwACAgMBAQAAAAAAAAERITFBAmFxkRJRgbED/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOH0gvOfQJnJipQRYEBpPBZ9AkNPeUkBd9/sMAT5IuAIACyF7DwBTxMoBOwAqFAFk1Fme6A15f0yQEUpICLAlBq9JOIH0BeiaeE0DxMWpaC3pNNQAABViUBeU1QKnPq/6lAuECAVFtQFgLQQ09QFIiwF0TDoFXUATTugC3plb1viAKgCy8IKBiLoC7+EvJgBEVAVBQXhFQEFQBekUDj09CAGigcL/wCfz/h858v4/H5Z58pwzACoAAACooAUAsRdABGuMBkAFKYTvvAQW/r6QBZEaAwLT0DE5VAC9gCAAAAGGLQCBAAnRAEPQAAF09D0Eot7QBZEXQKL2AaioASgCAAAAuiKAQgAABiNMgRqTfZPyizM5/4CQ9JwegXtFsQAgsBeoABeEw95UGVnReT6BAAAAAAUADj+N/KeLOVsyAniKgALN8A36OzQEFQBdEBo0nSegYi6AQ9ACxFqAGCgi+IvgCACwpFoJZwi28IAAC+rWVBAoAuIoL0epQFqGmAtn6/tDQEAAAA1c1F0FiabQCKhyBgJAAqy2dUD/DqoAt284TtFnYIqANTpAkAWVMAWpABKAAAAqALO1Q0A8XUnYGI0gCACoulA1A5AWotAVJ2oIFACIoJQACi0EVAFIGAsSrcTwEAANABUXwCZ6gQCcVfUAWXjFIAlCgAiggAAAAAKvaEAoWICoqAI1KgCmc4ZwCL0hoCkWTgElGpOLUvl/sEwU+M35YCWC3mJnIHiLekACLICKgC9o18Z3+NQAE9BUX5TLiAASg//2Q==",
			Time: time.Now(),
			Code: "gigachad",
			TotalAmount: 444,
			Preorder: preorder[1],
		},
	}
	db.Create(&payment)


	
}
