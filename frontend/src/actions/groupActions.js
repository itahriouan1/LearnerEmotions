import axios from 'axios';

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
  DELETE_GROUP_STUDENT_REQUEST,
  DELETE_GROUP_STUDENT_SUCCESS,
  DELETE_GROUP_STUDENT_RESET,
  DELETE_GROUP_STUDENT_FAIL,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_RESET,
  UPDATE_GROUP_FAIL,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_SUCCESS,
  GROUP_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/groupConstants'

export const getGroups = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_GROUPS_REQUEST })

        let link = `/api/v1/mygroupscreated`

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_GROUPS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_GROUPS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getGroupDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: GROUP_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/group/${id}`)

        dispatch({
            type: GROUP_DETAILS_SUCCESS,
            payload: data.group
        })

    } catch (error) {
        dispatch({
            type: GROUP_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newGroup = (a) => async (dispatch) => {
    try {

        dispatch({ type: NEW_GROUP_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/group/new`, a, config)

        dispatch({
            type: NEW_GROUP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_GROUP_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete group 
export const deleteGroup = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GROUP_REQUEST })

        const { data } = await axios.delete(`/api/v1/group/${id}`)

        dispatch({
            type: DELETE_GROUP_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_GROUP_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete student from group 
export const deleteGroupStudent = (idgroup,idstudent) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GROUP_STUDENT_REQUEST })

        const { data } = await axios.delete(`/api/v1/group/deletestudent/${idgroup}/${idstudent}`)

        dispatch({
            type: DELETE_GROUP_STUDENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_GROUP_STUDENT_FAIL,
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