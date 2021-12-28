package todos

import "time"

type TodoRepository interface {
	InsertTodo(description string, done bool) (*Todo, error)
	UpdateTodo(id int64, description string, done bool) error
	DeleteTodo(id int64) error
	GetTodo(id int64) (*Todo, error)
	GetAllTodo() ([]*Todo, error)
}

type Todo struct {
	ID          int64     `json:"id"`
	Description string    `json:"description"`
	Done        bool      `json:"done"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
