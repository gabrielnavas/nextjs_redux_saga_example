import { 
  TODO_GETALL_REQUEST, 
  TODO_GETALL_SUCCESS, 
  TODO_GETALL_REJECT,
  
  TODO_ADD_REJECT,
  TODO_ADD_SUCCESS,
  TODO_ADD_REQUEST,

  TODO_UPDATE_SET,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_REJECT,

  TODO_REMOVE_REJECT,
  TODO_REMOVE_SUCCESS,
  TODO_REMOVE_REQUEST
} from "..";

export const todoGetAllRequest = () => ({
  type: TODO_GETALL_REQUEST,
})

export const todoGetAllSuccess = (todos) => ({
  type: TODO_GETALL_SUCCESS,
  payload: {todos}
})

export const todoGetAllReject = ({message}) => ({
  type: TODO_GETALL_REJECT,
  payload: {message}
})

export const todoAddRequest = ({description}) => ({
  type: TODO_ADD_REQUEST,
  payload: {description},
})

export const  todoAddSuccess = ({id, description, done, createdAt, updatedAt}) => ({
  type: TODO_ADD_SUCCESS,
  payload: {id, description, done, createdAt, updatedAt},
})

export const  todoAddReject = ({message}) => ({
  type: TODO_ADD_REJECT,
  payload: {message},
})

export const todoUpdateRequest = ({id, description, done}) => ({
  type: TODO_UPDATE_REQUEST,
  payload: {id, description, done},
})

export const todoUpdateSuccess = ({id, description, done}) => ({
  type: TODO_UPDATE_SUCCESS,
  payload: {id, description, done},
})

export const  todoUpdateReject = ({message}) => ({
  type: TODO_UPDATE_REJECT,
  payload: {message},
})

export const todoUpdateSet = (todo) => ({
  type: TODO_UPDATE_SET,
  payload: {...todo},
})

export const todoRemoveRequest = (id) => ({
  type: TODO_REMOVE_REQUEST,
  payload: {id},
})

export const todoRemoveSuccess = (id) => ({
  type: TODO_REMOVE_SUCCESS,
  payload: {id},
})

export const  todoRemoveReject = ({message}) => ({
  type: TODO_REMOVE_REJECT,
  payload: {message},
})


