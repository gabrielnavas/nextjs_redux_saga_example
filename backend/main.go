package main

import (
	"backend/database"
	"backend/logger"
	"backend/todos"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// loggin
	logPrint := logger.PrintLogError{}

	// database
	db, err := database.MakeConnection("postgres", "localhost", "5432", "postgres", "database", "disable")
	if err != nil {
		logPrint.Log(err)
		panic(err)
	}
	defer db.Close()

	repo := todos.NewTodoRepository(db)
	usecase := todos.NewTodoUsecase(repo, &logPrint)
	controller := todos.NewTodoController(usecase, &logPrint)

	// routes
	routerGin := gin.Default()

	// cors
	routerGin.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		MaxAge: 12 * time.Hour,
	}))

	routerGin.POST("/todos", controller.CreateTodo())
	routerGin.PUT("/todos/:id", controller.UpdateTodo())
	routerGin.DELETE("/todos/:id", controller.DeleteTodo())
	routerGin.GET("/todos/:id", controller.GetTodo())
	routerGin.GET("/todos", controller.GetAllTodo())
	routerGin.Run()
}
