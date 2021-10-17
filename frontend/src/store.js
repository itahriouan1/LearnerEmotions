import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
  authReducer,
  userReducer,
  allUsersReducer,
  allUsersGroupReducer,
  userDetailsReducer,
  forgotPasswordReducer, } from './reducers/userReducers'
import { 
  groupsReducer, 
  groupDetailsReducer,
  newGroupReducer } from './reducers/groupReducers'

import { 
  allSessioncourGroupReducer,
  allMySessioncoursTeacherReducer,
  sessioncourReducer,
  newSessioncourReducer,
  sessioncoursAvailableStudentReducer,
  sessioncoursHistoryStudentReducer,
  infoSessioncourReducer
 } from './reducers/sessioncourReducers'

import {
  naturesessioncourDetailsReducer,
 } from './reducers/naturesessioncourReducers'

import {
  startExpressionReducer,
  sendExpressionReducer
 } from './reducers/expressionReducers'

const reducer = combineReducers({
   
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    allUsersGroup: allUsersGroupReducer,
    allSessioncoursGroup: allSessioncourGroupReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,

    groups:groupsReducer,
    groupDetails:groupDetailsReducer,
    newGroup:newGroupReducer,

    allMySessioncoursTeacher:allMySessioncoursTeacherReducer,
    naturesessioncourDetails:naturesessioncourDetailsReducer,
    sessioncour:sessioncourReducer,
    newSessioncour:newSessioncourReducer,
    sessioncoursAvailableStudent:sessioncoursAvailableStudentReducer,
    sessioncoursHistoryStudent:sessioncoursHistoryStudentReducer,
    infoSessioncour:infoSessioncourReducer,

    startExpression:startExpressionReducer,
    sendExpression:sendExpressionReducer

})


let initialState = {
    
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;