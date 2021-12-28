import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

import {
  todoGetAllRequest,
  todoAddRequest,
  todoUpdateRequest,
  todoRemoveRequest,
  todoUpdateSet,
} from '../../store/actions/todo'

import UpdateTodoModal from './components/UpdateTodoModal'

import styles from './styles.module.css'

const TodoPage = () => {
  const [description, setDescription] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const todosStore = useSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(todoGetAllRequest())
  }, [])

  const handleAddTodo = () => {
    dispatch(todoAddRequest({description}))
    setDescription('')
  }

  const handleUpdateStatus = ({id, description, done}) => { 
    dispatch(todoUpdateRequest({id, description, done: !done}))
  }

  const handleRemoveTodoItem = id => {
    dispatch(todoRemoveRequest(id))
  }

  const handleUpdate = (todo) => {
    dispatch(todoUpdateSet(todo))
    setModalIsOpen(true)
  }
  
  return (
    <div className={styles.container}>
      <div>
        <input 
          value={description}
          onChange={e => setDescription(e.target.value)}
          onKeyPress={k => k.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}> Inserir</button>
      </div>
      <ul  className={styles.todo_list}>
        {
          todosStore.todos.map(todo => (
            <li key={todo.id}>
            {
              <div className={styles.todo_item}>
                <span 
                  className={`${styles.description} ${todo.done && styles.descriptionThrough}`} 
                  onClick={() => handleUpdate(todo)} >
                  {todo.description}
                </span>
                <div className={styles.buttons_actions}>
                  <button className={`${styles.button} ${styles.button_done}`} onClick={() => handleUpdateStatus({id: todo.id, description: todo.description, done: todo.done})}>
                    Finalizar
                  </button>
                  <button className={`${styles.button}  ${styles.button_remove}`} onClick={() => handleRemoveTodoItem(todo.id)}>
                    Remover
                  </button>
                </div>
                <UpdateTodoModal
                  isOpen={modalIsOpen}
                  onClose={() => setModalIsOpen(false)}
                />
              </div>
            }
            </li>
          ))
        }
        
      </ul>
    </div>
  )
}

export default TodoPage