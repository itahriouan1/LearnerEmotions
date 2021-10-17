import {
  START_EXPRESSION_REQUEST,
  START_EXPRESSION_SUCCESS,
  START_EXPRESSION_FAIL,
  UPDATE_EXPRESSION_REQUEST,
  UPDATE_EXPRESSION_SUCCESS,
  UPDATE_EXPRESSION_FAIL,
  
  CLEAR_ERRORS
} from '../constants/expressionConstants'



export const startExpressionReducer = (state = {}, action) => {
  switch (action.type) {
    case START_EXPRESSION_REQUEST:
      return {
        loading: true,
        success:false
      }

    case START_EXPRESSION_SUCCESS:
      return {
        loading: false,
        success:true
      }


    case START_EXPRESSION_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}

export const sendExpressionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EXPRESSION_REQUEST:
      return {
        ...state,
        loading: true
      }

    case UPDATE_EXPRESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        expressionUpdated: action.payload
      }


    case UPDATE_EXPRESSION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}