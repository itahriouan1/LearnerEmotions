import {
  
  USERS_SESSIONCOUR_DETAILS_REQUEST,
  USERS_SESSIONCOUR_DETAILS_SUCCESS,
  USERS_SESSIONCOUR_DETAILS_FAIL,
  ALL_MY_SESSIONCOURS_TEACHER_REQUEST,
  ALL_MY_SESSIONCOURS_TEACHER_SUCCESS,
  ALL_MY_SESSIONCOURS_TEACHER_FAIL,
  UPDATE_SESSIONCOUR_STATUS_REQUEST,
  UPDATE_SESSIONCOUR_STATUS_SUCCESS,
  UPDATE_SESSIONCOUR_STATUS_RESET,
  UPDATE_SESSIONCOUR_STATUS_FAIL,
  NEW_SESSIONCOUR_REQUEST,
  NEW_SESSIONCOUR_SUCCESS,
  NEW_SESSIONCOUR_FAIL,
  NEW_SESSIONCOUR_RESET,
  AVAILABLESESSIONCOURS_STUDENT_REQUEST,
  AVAILABLESESSIONCOURS_STUDENT_SUCCESS,
  AVAILABLESESSIONCOURS_STUDENT_FAIL,
  CLEAR_ERRORS
} from '../constants/sessioncourConstants'



export const allSessioncourGroupReducer = (state = { sessioncours: [] }, action) => {
  switch (action.type) {

      case USERS_SESSIONCOUR_DETAILS_REQUEST:
          return {
              ...state,
              loading: true,
          }

      case USERS_SESSIONCOUR_DETAILS_SUCCESS:
          return {
              ...state,
              loading: false,
              sessioncours: action.payload
          }

      case USERS_SESSIONCOUR_DETAILS_FAIL:
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


export const allMySessioncoursTeacherReducer = (state = { mysessioncoursteacher: [] }, action) => {
    switch (action.type) {
  
        case ALL_MY_SESSIONCOURS_TEACHER_REQUEST:
            return {
                ...state,
                loading: true,
            }
  
        case ALL_MY_SESSIONCOURS_TEACHER_SUCCESS:
            return {
                ...state,
                loading: false,
                mysessioncoursteacher: action.payload
            }
  
        case ALL_MY_SESSIONCOURS_TEACHER_FAIL:
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

export const sessioncoursAvailableStudentReducer = (state = { sessioncoursAvailable: [] }, action) => {
    switch (action.type) {
  
        case AVAILABLESESSIONCOURS_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
  
        case AVAILABLESESSIONCOURS_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                sessioncoursAvailable: action.payload,
                
            }
  
        case AVAILABLESESSIONCOURS_STUDENT_FAIL:
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


export const sessioncourReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_SESSIONCOUR_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_SESSIONCOUR_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case UPDATE_SESSIONCOUR_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case UPDATE_SESSIONCOUR_STATUS_RESET:
            return {
                ...state,
                isUpdated: false
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


export const newSessioncourReducer = (state = { sessiongroup: {} }, action) => {
    switch (action.type) {
  
      case NEW_SESSIONCOUR_REQUEST:
        return {
          ...state,
          loading: true
        }
  
      case NEW_SESSIONCOUR_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          sessioncourMessage: action.payload.message
        }
  
      case NEW_SESSIONCOUR_FAIL:
        return {
          ...state,
          loading:false,
          error: action.payload
        }
  
      case NEW_SESSIONCOUR_RESET:
        return {
          ...state,
          success: false
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
