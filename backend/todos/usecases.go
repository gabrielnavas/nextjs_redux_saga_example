package todos

import (
	"backend/logger"
	"errors"
)

type TodoUsecase interface {
	CreateTodo(description string) (*Todo, error)
	UpdateTodo(id int64, description string, done bool) error
	DeleteTodo(id int64) error
	GetTodo(id int64) (*Todo, error)
	GetAllTodo() ([]*Todo, error)
}

type DbTodoUsecase struct {
	todoRepository TodoRepository
	logger         logger.LoggerError
}

func NewTodoUsecase(todoRepository TodoRepository, loggingError logger.LoggerError) TodoUsecase {
	return &DbTodoUsecase{todoRepository, loggingError}
}

func (usecase *DbTodoUsecase) CreateTodo(description string) (*Todo, error) {
	if len(description) == 0 {
		return nil, errors.New("é necessário uma descrição")
	}

	if len(description) > 255 {
		return nil, errors.New("descrição muito grande")
	}

	inititalDone := false
	todo, err := usecase.todoRepository.InsertTodo(description, inititalDone)
	if err != nil {
		usecase.logger.Log(err)
		return nil, nil
	}
	return todo, nil
}
func (usecase *DbTodoUsecase) UpdateTodo(id int64, description string, done bool) error {
	if id <= 0 {
		return errors.New("id deve ser positivo")
	}

	if len(description) == 0 {
		return errors.New("é necessário uma descrição")
	}

	if len(description) > 255 {
		return errors.New("descrição muito grande")
	}

	todoFound, err := usecase.todoRepository.GetTodo(id)
	if err != nil {
		usecase.logger.Log(err)
		return nil
	}
	if todoFound == nil {
		return errors.New("todo não existe")
	}

	err = usecase.todoRepository.UpdateTodo(id, description, done)
	if err != nil {
		usecase.logger.Log(err)
		return nil
	}
	return nil
}
func (usecase *DbTodoUsecase) DeleteTodo(id int64) error {
	if id <= 0 {
		return errors.New("id deve ser positivo")
	}

	todoFound, err := usecase.todoRepository.GetTodo(id)
	if err != nil {
		usecase.logger.Log(err)
		return nil
	}
	if todoFound == nil {
		return errors.New("todo não existe")
	}

	err = usecase.todoRepository.DeleteTodo(id)
	if err != nil {
		usecase.logger.Log(err)
	}
	return nil
}
func (usecase *DbTodoUsecase) GetTodo(id int64) (*Todo, error) {
	if id <= 0 {
		return nil, errors.New("id deve ser positivo")
	}

	todoFound, err := usecase.todoRepository.GetTodo(id)
	if err != nil {
		usecase.logger.Log(err)
		return nil, nil
	}
	if todoFound == nil {
		return nil, errors.New("todo não existe")
	}

	todo, err := usecase.todoRepository.GetTodo(id)
	if err != nil {
		usecase.logger.Log(err)
	}
	return todo, nil
}
func (usecase *DbTodoUsecase) GetAllTodo() ([]*Todo, error) {
	todos, err := usecase.todoRepository.GetAllTodo()
	if err != nil {
		usecase.logger.Log(err)
	}
	return todos, nil
}
