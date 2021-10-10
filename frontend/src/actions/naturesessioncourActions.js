import axios from 'axios';

import {
  NATURESESSIONCOUR_DETAILS_REQUEST,
  NATURESESSIONCOUR_DETAILS_SUCCESS,
  NATURESESSIONCOUR_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/naturesessioncourConstants'

export const getNaturesessioncour = (id) => async (dispatch) => {
    try {

        dispatch({ type: NATURESESSIONCOUR_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/naturesessioncour/${id}`)

        dispatch({
            type: NATURESESSIONCOUR_DETAILS_SUCCESS,
            payload: data.naturesessioncour
        })

    } catch (error) {
        dispatch({
            type: NATURESESSIONCOUR_DETAILS_FAIL,
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