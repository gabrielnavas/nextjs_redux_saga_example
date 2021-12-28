package todos

import (
	"net/http"
	"strconv"

	"backend/logger"

	"github.com/gin-gonic/gin"
)

type TodoController interface {
	CreateTodo() func(c *gin.Context)
	UpdateTodo() func(c *gin.Context)
	DeleteTodo() func(c *gin.Context)
	GetTodo() func(c *gin.Context)
	GetAllTodo() func(c *gin.Context)
}

type TodoControllerGin struct {
	todoUsecase TodoUsecase
	logger      logger.LoggerError
}

func NewTodoController(todoUsecase TodoUsecase, logger logger.LoggerError) TodoController {
	return &TodoControllerGin{todoUsecase, logger}
}

func (controller *TodoControllerGin) CreateTodo() func(c *gin.Context) {
	return func(c *gin.Context) {
		var body TodoDtoCreate
		if err := c.ShouldBindJSON(&body); err != nil {
			controller.logger.Log(err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		todo, err := controller.todoUsecase.CreateTodo(body.Description)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusCreated, todo)
	}
}
func (controller *TodoControllerGin) UpdateTodo() func(c *gin.Context) {
	return func(c *gin.Context) {
		todoIdStr, _ := c.Params.Get("id")
		todoID, err := strconv.Atoi(todoIdStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "o id do todo deve ser um número",
			})
			return
		}

		var body TodoDtoUpdate
		if err := c.ShouldBindJSON(&body); err != nil {
			controller.logger.Log(err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		err = controller.todoUsecase.UpdateTodo(int64(todoID), body.Description, body.Done)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.Status(http.StatusNoContent)
	}
}
func (controller *TodoControllerGin) DeleteTodo() func(c *gin.Context) {
	return func(c *gin.Context) {
		todoIdStr, _ := c.Params.Get("id")
		todoID, err := strconv.Atoi(todoIdStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "o id do todo deve ser um número",
			})
			return
		}

		err = controller.todoUsecase.DeleteTodo(int64(todoID))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.Status(http.StatusNoContent)
	}
}
func (controller *TodoControllerGin) GetTodo() func(c *gin.Context) {
	return func(c *gin.Context) {
		todoIdStr, _ := c.Params.Get("id")
		todoID, err := strconv.Atoi(todoIdStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "o id do todo deve ser um número",
			})
			return
		}

		todo, err := controller.todoUsecase.GetTodo(int64(todoID))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, todo)
	}
}
func (controller *TodoControllerGin) GetAllTodo() func(c *gin.Context) {
	return func(c *gin.Context) {
		todos, err := controller.todoUsecase.GetAllTodo()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, todos)
	}
}
