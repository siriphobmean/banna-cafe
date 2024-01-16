package controller

import (
	// "fmt"
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
	Position string `json:"position"`
}

// get info from user email and password
func Login(c *gin.Context) {
	var payload LoginPayload
	var member entity.Member

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Raw("SELECT * FROM members WHERE email = ?", payload.Email).Scan(&member).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + "email is incorrect"})
	// 	return
	// }
	if err := entity.DB().Raw("SELECT * FROM members WHERE email = ?", payload.Email).Scan(&member).Error; err == nil {
		// ตรวจสอบรหัสผ่าน
		err := bcrypt.CompareHashAndPassword([]byte(member.Password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": map[string]string{"message": "Invalid password", "memberPassword": member.Password, "payloadPassword": payload.Password}})
			return
		}

		jwtWrapper := service.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateToken(member.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       member.ID,
			Position: "Member",
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else if err := entity.DB().Raw("SELECT * FROM employees WHERE email = ?", payload.Email).Scan(&member).Error; err == nil {
		// ตรวจสอบรหัสผ่าน
		err := bcrypt.CompareHashAndPassword([]byte(member.Password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": map[string]string{"message": "Invalid password", "memberPassword": member.Password, "payloadPassword": payload.Password}})
			return
		}

		jwtWrapper := service.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateToken(member.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       member.ID,
			Position: "Employee",
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + "email is incorrect"})
		return
	}

}