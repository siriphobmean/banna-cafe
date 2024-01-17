package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/siriphobmean/sa-66-mean/entity"
)
func CreatePayment(c *gin.Context){
	var p entity.Payment
	if err := c.ShouldBindJSON(&p); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	u:= entity.Payment{
		Image: p.Image,
		Time: time.Now(),
		Code: p.Code,
		TotalAmount: p.TotalAmount,

		PromotionID: p.PromotionID,
		Promotion: p.Promotion,

		PreorderID: p.PreorderID,
		Preorder: p.Preorder,

		EmployeeID: p.EmployeeID,
		Employee: p.Employee,
	}

	if err := entity.DB().Create(&u).Error; err != nil{
		c.JSON(http.StatusBadGateway, gin.H{"error":err.Error()})
		return
	}

	c.JSON(http.StatusOK,gin.H{"data":u})
}

// TODO: ///
func CreateAccoutingByPayment(c *gin.Context){
	var a entity.Accounting
	var r int
	var at entity.AccountType
	if err := c.ShouldBindJSON(&a); err != nil{
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT remain_amount FROM accountings ORDER BY id desc LIMIT 1").Scan(&r).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT * FROM account_types WHERE id = 1").Scan(&at).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	u := entity.Accounting{
		Date: time.Now(),
		Amount: a.Amount,
		RemainAmount: r + a.RemainAmount,
		PaymentID: a.PaymentID,
		Payment: a.Payment,
		AccountTypeID: &at.ID,
		AccountType: at,
		EmployeeID: a.EmployeeID,
		Employee: a.Employee,
	}

	if err := entity.DB().Create(&u).Error; err != nil{
		c.JSON(http.StatusBadGateway, gin.H{"error":err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

func GetPromotionByCode(c *gin.Context){
	code := c.Param("code")
	var p entity.Promotion
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM promotions WHERE code = ?", code).Scan(&p).RowsAffected; err==0{
		c.JSON(http.StatusBadGateway, gin.H{"error":"code not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func GetPreorderMenuByPreorderID(c *gin.Context){
	id := c.Param("id")
	var p []entity.PreorderMenu
	if err := entity.DB().Preload("Preorder").Preload("Menu").Table("preorder_menus").Where("preorder_id = ?",id).Find(&p).Error; err!=nil{
		c.JSON(http.StatusBadGateway,gin.H{"error":err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":p})
}