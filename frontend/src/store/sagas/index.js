import { takeEvery } from 'redux-saga/effects'

import {
  TODO_GETALL_REQUEST,
  TODO_ADD_REQUEST,
  TODO_UPDATE_REQUEST,
  TODO_REMOVE_REQUEST
} from '../actions'

import {
  getAllTodoSaga,
  createTodoSaga,
  updateTodoSaga,
  removeTodoSaga 
} from './todo'

export default function* sagaRoot() {
  yield takeEvery(TODO_GETALL_REQUEST, getAllTodoSaga);
  yield takeEvery(TODO_ADD_REQUEST, createTodoSaga);
  yield takeEvery(TODO_UPDATE_REQUEST, updateTodoSaga);
  yield takeEvery(TODO_REMOVE_REQUEST, removeTodoSaga);
}