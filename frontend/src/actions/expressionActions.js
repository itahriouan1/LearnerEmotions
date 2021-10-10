import axios from 'axios';

import {
  START_EXPRESSION_REQUEST,
  START_EXPRESSION_SUCCESS,
  START_EXPRESSION_FAIL,
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


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}