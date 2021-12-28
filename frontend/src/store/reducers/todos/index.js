import { HYDRATE } from "next-redux-wrapper";
import { 
  TODO_GETALL_SUCCESS, 
  TODO_GETALL_REJECT,

  TODO_ADD_REJECT,
  TODO_ADD_SUCCESS,

  TODO_UPDATE_SET,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_REJECT,

  TODO_REMOVE_SUCCESS,
  TODO_REMOVE_REJECT,
 } from "../../actions";

const initialState = {
  todos: [],
  error: '',
  todoUpdate: undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    case TODO_GETALL_SUCCESS:
      return { ...state, todos: [...action.payload.todos], error: '' };
    
    case TODO_GETALL_REJECT:
      return { ...state, error: action.payload.message };
    
    case TODO_ADD_SUCCESS:
      const todoCreated = {
        id: action.payload.id,
        description: action.payload.description,
        done: action.payload.done,
      }
      const todos = [...state.todos]
      todos.push(todoCreated)
      return { ...state, todos, error: '' };
    
    case TODO_ADD_REJECT:
      return { ...state, error: action.payload.message };

    case TODO_UPDATE_SET:
      return {...state, todoUpdate: action.payload}

    case TODO_UPDATE_SUCCESS:
      const todoUpdated = {
        id: action.payload.id,
        description: action.payload.description,
        done: action.payload.done,
      }
      const todosMapped = state.todos.map(todo => {
        if (todo.id === todoUpdated.id) {
          return todoUpdated
        }
        return {...todo}
      })
      return { ...state, todos: todosMapped, error: '' };

    case TODO_UPDATE_REJECT:
      return { ...state, error: action.payload.message };

    case TODO_REMOVE_SUCCESS:
      const todoId = action.payload.id
      console.log(todoId.id);
      const todosFilted = state.todos.filter(todo => todo.id !== todoId)
      return { ...state, todos: [...todosFilted], error: '' };

    case TODO_REMOVE_REJECT:
      return { ...state, error: action.payload.message };
  

    default:
      return state;
  }
};

export default reducer;