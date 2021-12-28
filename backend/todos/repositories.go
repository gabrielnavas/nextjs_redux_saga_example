package todos

import (
	"database/sql"
	"errors"
	"time"
)

type DbTodoRepository struct {
	db *sql.DB
}

func NewTodoRepository(db *sql.DB) TodoRepository {
	return &DbTodoRepository{db}
}

func (repo *DbTodoRepository) InsertTodo(description string, done bool) (*Todo, error) {
	var todo Todo
	sqlQuery := `
		INSERT INTO todos.todo (description, done) 
		VALUES ($1, $2)
		RETURNING id, created_at, updated_at;
	`
	args := []interface{}{description, done}
	err := repo.db.QueryRow(sqlQuery, args...).Scan(&todo.ID, &todo.CreatedAt, &todo.UpdatedAt)
	if err != nil {
		return nil, err
	}
	todo.Description = description
	todo.Done = done
	return &todo, nil
}
func (repo *DbTodoRepository) UpdateTodo(id int64, description string, done bool) error {
	sqlQuery := `
		UPDATE todos.todo
		SET description=$2, done=$3, updated_at=$4
		WHERE id=$1;
	`
	args := []interface{}{id, description, done, time.Now().UTC()}
	_, err := repo.db.Exec(sqlQuery, args...)
	if err != nil {
		return err
	}
	return nil
}
func (repo *DbTodoRepository) DeleteTodo(id int64) error {
	sqlQuery := `
		DELETE FROM todos.todo
		WHERE id=$1;
	`
	args := []interface{}{id}
	_, err := repo.db.Exec(sqlQuery, args...)
	if err != nil {
		return err
	}
	return nil
}
func (repo *DbTodoRepository) GetTodo(id int64) (*Todo, error) {
	var t Todo
	sqlQuery := `
		SELECT id, description, done, created_at, updated_at
		FROM todos.todo
		WHERE id=$1;
	`
	args := []interface{}{id}
	row := repo.db.QueryRow(sqlQuery, args...)
	err := row.Scan(&t.ID, &t.Description, &t.Done, &t.CreatedAt, &t.UpdatedAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return &t, nil
}
func (repo *DbTodoRepository) GetAllTodo() ([]*Todo, error) {
	var todos []*Todo
	sqlQuery := `
		SELECT id, description, done, created_at, updated_at
		FROM todos.todo;
	`
	rows, err := repo.db.Query(sqlQuery)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var t Todo
		err := rows.Scan(&t.ID, &t.Description, &t.Done, &t.CreatedAt, &t.UpdatedAt)
		if err != nil {
			return nil, err
		}
		todos = append(todos, &t)
	}
	return todos, nil
}
