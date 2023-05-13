import axios from "axios";

import {
  USERS_SESSIONCOUR_DETAILS_REQUEST,
  USERS_SESSIONCOUR_DETAILS_SUCCESS,
  USERS_SESSIONCOUR_DETAILS_FAIL,
  ALL_MY_SESSIONCOURS_TEACHER_REQUEST,
  ALL_MY_SESSIONCOURS_TEACHER_SUCCESS,
  ALL_MY_SESSIONCOURS_TEACHER_FAIL,
  UPDATE_SESSIONCOUR_STATUS_REQUEST,
  UPDATE_SESSIONCOUR_STATUS_SUCCESS,
  UPDATE_SESSIONCOUR_STATUS_FAIL,
  DELETE_SESSIONCOUR_REQUEST,
  DELETE_SESSIONCOUR_SUCCESS,
  DELETE_SESSIONCOUR_RESET,
  DELETE_SESSIONCOUR_FAIL,
  NEW_SESSIONCOUR_REQUEST,
  NEW_SESSIONCOUR_SUCCESS,
  NEW_SESSIONCOUR_FAIL,
  AVAILABLESESSIONCOURS_STUDENT_REQUEST,
  AVAILABLESESSIONCOURS_STUDENT_SUCCESS,
  AVAILABLESESSIONCOURS_STUDENT_FAIL,
  HISTORYSESSIONCOURS_STUDENT_REQUEST,
  HISTORYSESSIONCOURS_STUDENT_SUCCESS,
  HISTORYSESSIONCOURS_STUDENT_FAIL,
  INFOSESSIONCOUR_STUDENT_REQUEST,
  INFOSESSIONCOUR_STUDENT_SUCCESS,
  INFOSESSIONCOUR_STUDENT_FAIL,
  SESSIONNOACTIVE_STUDENT_TEACHER_REQUEST,
  SESSIONNOACTIVE_STUDENT_TEACHER_SUCCESS,
  SESSIONNOACTIVE_STUDENT_TEACHER_FAIL,
  CLEAR_ERRORS,
} from "../constants/sessioncourConstants";

// Get all users of group
export const allSessioncoursGroup = (id) => async (dispatch) => {
  try {
    dispatch({ type: USERS_SESSIONCOUR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/sessioncoursgroup/${id}`);

    dispatch({
      type: USERS_SESSIONCOUR_DETAILS_SUCCESS,
      payload: data.sessioncours,
    });
  } catch (error) {
    dispatch({
      type: USERS_SESSIONCOUR_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// getMySessionscours Teacher Created
export const getMySessionscoursTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MY_SESSIONCOURS_TEACHER_REQUEST });

    let link = `/api/v1/mysessioncourscreated`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_MY_SESSIONCOURS_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MY_SESSIONCOURS_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update SessionCours Status (ADMIN - TEACHER)
export const setStatusSessioncour =
  (id, sessioncourStatus) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SESSIONCOUR_STATUS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `https://express-app-8vc2.onrender.com/api/v1/updatsessioncourstatus/${id}`,
        sessioncourStatus,
        config
      );

      dispatch({
        type: UPDATE_SESSIONCOUR_STATUS_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SESSIONCOUR_STATUS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newSessioncour = (a) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SESSIONCOUR_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://express-app-8vc2.onrender.com/api/v1/sessioncour/new`,
      a,
      config
    );

    dispatch({
      type: NEW_SESSIONCOUR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SESSIONCOUR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get sessioncoursAvailable Student
export const getSessioncoursAvailableStudent = () => async (dispatch) => {
  try {
    dispatch({ type: AVAILABLESESSIONCOURS_STUDENT_REQUEST });

    let link = `https://express-app-8vc2.onrender.com/api/v1/availablesessioncours`;

    const { data } = await axios.get(link);

    dispatch({
      type: AVAILABLESESSIONCOURS_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AVAILABLESESSIONCOURS_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get sessioncoursHistory Student
export const getSessioncoursHistoryStudent = () => async (dispatch) => {
  try {
    dispatch({ type: HISTORYSESSIONCOURS_STUDENT_REQUEST });

    let link = `https://express-app-8vc2.onrender.com/api/v1/historysessioncours`;

    const { data } = await axios.get(link);

    dispatch({
      type: HISTORYSESSIONCOURS_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HISTORYSESSIONCOURS_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get InfoSessioncourStudent Student
export const getInfoSessioncourStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: INFOSESSIONCOUR_STUDENT_REQUEST });

    let link = `https://express-app-8vc2.onrender.com/api/v1/infosessioncourstudent/${id}`;

    const { data } = await axios.get(link);

    dispatch({
      type: INFOSESSIONCOUR_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INFOSESSIONCOUR_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get SessionsNoActiveStudentTeacher Student
export const getSessionsNoActiveStudentTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: SESSIONNOACTIVE_STUDENT_TEACHER_REQUEST });

    let link = `https://express-app-8vc2.onrender.com/api/v1/sessionnoactivestudentteacher/${id}`;

    const { data } = await axios.get(link);

    dispatch({
      type: SESSIONNOACTIVE_STUDENT_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SESSIONNOACTIVE_STUDENT_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete sessioncour (Admin,teacher)
export const deleteSessioncour = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SESSIONCOUR_REQUEST });

    const { data } = await axios.delete(
      `https://express-app-8vc2.onrender.com/api/v1/deletesessioncour/${id}`
    );

    dispatch({
      type: DELETE_SESSIONCOUR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SESSIONCOUR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
