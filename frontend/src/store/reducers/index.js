import { combineReducers } from "redux";

import todosReducer from './todos'

export default combineReducers({
  todos: todosReducer
});