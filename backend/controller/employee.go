package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)

// POST /employees
func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var role entity.Role

	// bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// สร้าง Employee
	u := entity.Employee{
		Role:    role,         // โยงความสัมพันธ์กับ Entity Role
		FirstName: employee.FirstName, // ตั้งค่าฟิลด์ FirstName
		LastName:  employee.LastName,  // ตั้งค่าฟิลด์ LastName
		Email:     employee.Email,     // ตั้งค่าฟิลด์ Email
		Password:  employee.Password,     // ตั้งค่าฟิลด์ Password
		Gender:   	employee.Gender,   // ตั้งค่าฟิลด์ Gender
		Age:		employee.Age,
		Salary:		employee.Salary,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM employees WHERE id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /employees
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM employees").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employees})
}

// DELETE /employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /employees
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee
	var result entity.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", employee.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}
