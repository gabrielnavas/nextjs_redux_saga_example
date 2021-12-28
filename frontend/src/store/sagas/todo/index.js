import { call, put } from 'redux-saga/effects'

import {
   todoGetAllSuccess, 
   todoGetAllReject, 
   
   todoAddSuccess, 
   todoAddReject,

   todoUpdateSuccess,
   todoUpdateReject,
   todoRemoveSuccess,
   todoRemoveReject
} from '../../actions/todo'
import ApiTodo from '../../../api/todo'


export function* getAllTodoSaga(action) {
   try {
      const allTodos = yield call(ApiTodo.getAll);
      yield put(todoGetAllSuccess(allTodos));
   } catch (e) {
      yield put(todoGetAllReject({message: e.message}));
   }
}

export function* createTodoSaga(action) {
   try {
      const todo = yield call(ApiTodo.create, {description: action.payload.description});
      yield put(todoAddSuccess(todo));
   } catch (e) {
      yield put(todoAddReject({message: e.message}));
   }
}


export function* updateTodoSaga(action) {
   try {
      const payload = {
         id: action.payload.id,
         description: action.payload.description,
         done: action.payload.done,
      }
      yield call(ApiTodo.update, {...payload});
      yield put(todoUpdateSuccess({...payload}));
   } catch (e) {
      yield put(todoUpdateReject({message: e.message}));
   }
}

export function* removeTodoSaga(action) {
   try {
      const todoId = action.payload.id
      yield call(ApiTodo.del, todoId);
      yield put(todoRemoveSuccess(todoId));
   } catch (e) {
      yield put(todoRemoveReject({message: e.message}));
   }
}