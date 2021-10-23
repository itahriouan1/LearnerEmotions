import axios from 'axios';

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
  CLEAR_ERRORS
} from '../constants/expressionConstants'

export const startExpression = (id) => async (dispatch) => {
  try {

    dispatch({ type: START_EXPRESSION_REQUEST })

    let link = `/api/v1/startexpression/${id}`

    const { data } = await axios.get(link)

    dispatch({
      type: START_EXPRESSION_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
        type: START_EXPRESSION_FAIL,
        payload: error.response.data.message
    })
  }
}
// Update SessionCours Status (ADMIN - TEACHER)
export const sendExpression = (dataexpression) => async (dispatch) => {
  try {

    dispatch({ type: UPDATE_EXPRESSION_REQUEST })

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/v1/sessioncour/sendexpression`, dataexpression, config)

    dispatch({
      type: UPDATE_EXPRESSION_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
        type: UPDATE_EXPRESSION_FAIL,
        payload: error.response.data.message
    })
  }
}

// Get ExpressionStudent Student
export const getExpressionStudent = (id,studentid) => async (dispatch) => {
  try {

      dispatch({ type: EXPRESSION_STUDENT_REQUEST })

      let link = `/api/v1/expressionsessionstudent/${id}/${studentid}`

      const { data } = await axios.get(link)

      dispatch({
          type: EXPRESSION_STUDENT_SUCCESS,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: EXPRESSION_STUDENT_FAIL,
          payload: error.response.data.message
      })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}