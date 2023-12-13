package controller

import (
	"fmt"
	"net/http"

	"github.com/siriphobmean/sa-66-mean/entity"
	"github.com/siriphobmean/sa-66-mean/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	Email    string `json:"email"` 
	Password string `json:"password"`
}

// logintoken response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// get info from user email and password
func Login(c *gin.Context) {
	var payload LoginPayload
	var member entity.Member

	if error := c.ShouldBindJSON(&payload); error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": error})
		return
	}

	// find user from email
	if error := entity.DB().Raw("SELECT * FROM members WHERE email = ?", payload.Email).Scan(&member).Error; error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": error})
		return
	}
	fmt.Print(member.Password)
	fmt.Print(payload.Password)
	
	// Check password
	err := bcrypt.CompareHashAndPassword([]byte(payload.Password), []byte(member.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password incorrect"})
		return
	}

	//format token
	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(member.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error generating token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    member.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})

}