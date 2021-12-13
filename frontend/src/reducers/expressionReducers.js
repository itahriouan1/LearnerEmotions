import {
  START_EXPRESSION_REQUEST,
  START_EXPRESSION_SUCCESS,
  START_EXPRESSION_FAIL,
  UPDATE_EXPRESSION_REQUEST,
  UPDATE_EXPRESSION_SUCCESS,
  UPDATE_EXPRESSION_FAIL,
  EXPRESSION_STUDENT_REQUEST,
  EXPRESSION_STUDENT_SUCCESS,
  EXPRESSION_STUDENT_FAIL,
  EXPRESSION_STUDENT_RESET,
  CLEAR_ERRORS,

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


export const expressionStudentReducer = (state = {}, action) => {
  switch (action.type) {

      case EXPRESSION_STUDENT_REQUEST:
          return {
              ...state,
              loading: true
          }

      case EXPRESSION_STUDENT_SUCCESS:
          return {
              ...state,
              loading: false,
              sessioncour: action.payload.sessioncour[0],
              expression:action.payload.expression,
              expressiontime:action.payload.expressiontime
          }

      case EXPRESSION_STUDENT_RESET:
        return {
            ...state,
            loading: false,
            expression:[],
            expressiontime:[]

        }

      case EXPRESSION_STUDENT_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}
