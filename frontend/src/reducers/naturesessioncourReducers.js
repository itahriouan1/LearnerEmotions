import {

  NATURESESSIONCOUR_DETAILS_REQUEST,
  NATURESESSIONCOUR_DETAILS_SUCCESS,
  NATURESESSIONCOUR_DETAILS_FAIL,
  CLEAR_ERRORS

} from '../constants/naturesessioncourConstants'


export const naturesessioncourDetailsReducer = (state = { naturesessioncour: {} }, action) => {
  switch (action.type) {

      case NATURESESSIONCOUR_DETAILS_REQUEST:
          return {
              ...state,
              loading: true
          }

      case NATURESESSIONCOUR_DETAILS_SUCCESS:
          return {
              loading: false,
              naturesessioncour : action.payload
          }

      case NATURESESSIONCOUR_DETAILS_FAIL:
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


