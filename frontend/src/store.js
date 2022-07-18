import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,
  registerteacherReducer,
  userReducer,
  allUsersReducer,
  allUsersGroupReducer,
  userDetailsReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";
import {
  groupsReducer,
  groupDetailsReducer,
  newGroupReducer,
  groupReducer,
} from "./reducers/groupReducers";

import {
  allSessioncourGroupReducer,
  allMySessioncoursTeacherReducer,
  sessioncourReducer,
  newSessioncourReducer,
  sessioncoursAvailableStudentReducer,
  sessioncoursHistoryStudentReducer,
  infoSessioncourReducer,
  sessionnoactivestudentteacherReducer,
} from "./reducers/sessioncourReducers";

import { naturesessioncourDetailsReducer } from "./reducers/naturesessioncourReducers";

import {
  startExpressionReducer,
  sendExpressionReducer,
  expressionStudentReducer,
} from "./reducers/expressionReducers";

import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  auth: authReducer,
  registerteacher: registerteacherReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  allUsersGroup: allUsersGroupReducer,
  allSessioncoursGroup: allSessioncourGroupReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,

  groups: groupsReducer,
  groupDetails: groupDetailsReducer,
  newGroup: newGroupReducer,
  group: groupReducer,

  allMySessioncoursTeacher: allMySessioncoursTeacherReducer,
  naturesessioncourDetails: naturesessioncourDetailsReducer,
  sessioncour: sessioncourReducer,
  newSessioncour: newSessioncourReducer,
  sessioncoursAvailableStudent: sessioncoursAvailableStudentReducer,
  sessioncoursHistoryStudent: sessioncoursHistoryStudentReducer,
  infoSessioncour: infoSessioncourReducer,
  sessionnoactivestudentteacher: sessionnoactivestudentteacherReducer,

  startExpression: startExpressionReducer,
  sendExpression: sendExpressionReducer,
  expressionStudent: expressionStudentReducer,

  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
