import {
  ALL_GROUPS_REQUEST,
  ALL_GROUPS_SUCCESS,
  ALL_GROUPS_FAIL,
  NEW_GROUP_REQUEST,
  NEW_GROUP_SUCCESS,
  NEW_GROUP_RESET,
  NEW_GROUP_FAIL,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_RESET,
  DELETE_GROUP_FAIL,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_RESET,
  UPDATE_GROUP_FAIL,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_SUCCESS,
  GROUP_DETAILS_FAIL,
  CLEAR_ERRORS

} from '../constants/groupConstants'

export const groupsReducer = (state = { groups: [] }, action) => {
  switch (action.type) {
    case ALL_GROUPS_REQUEST:
      return {
        loading: true,
        groups: []
      }

    case ALL_GROUPS_SUCCESS:
      return {
        loading: false,
        groupsCount: action.payload.count,
        groups: action.payload.groups,
        // groupsCount: action.payload.groupsCount,
        // resPerPage: action.payload.resPerPage,
        // filteredProductsCount: action.payload.filteredProductsCount
      }


    case ALL_GROUPS_FAIL:
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

export const groupDetailsReducer = (state = { group: {} }, action) => {
  switch (action.type) {

      case GROUP_DETAILS_REQUEST:
          return {
              ...state,
              loading: true
          }

      case GROUP_DETAILS_SUCCESS:
          return {
              loading: false,
              group: action.payload
          }

      case GROUP_DETAILS_FAIL:
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


export const newGroupReducer = (state = { group: {} }, action) => {
  switch (action.type) {

    case NEW_GROUP_REQUEST:
      return {
        ...state,
        loading: true
      }

    case NEW_GROUP_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        group: action.payload.group
      }

    case NEW_GROUP_FAIL:
      return {
        ...state,
        loading:false,
        error: action.payload
      }

    case NEW_GROUP_RESET:
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
