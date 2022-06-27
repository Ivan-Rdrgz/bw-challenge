import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT,UPDATE_FAIL, UPDATE_SUCCESS } from "./types";

// Load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth/')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

// Register user
export const register = ({age, eyeColor, firstName, lastName,company,email, password, phone, address}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'Application/json',
        }
    }

    const body = JSON.stringify({age, eyeColor, firstName, lastName,company,email, password, phone, address})
    try {
        const res = await axios.post("http://localhost:5000/api/users", body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Update user
export const updateUser = ({age, eyeColor, firstName, lastName,company,email, phone, address, id}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'Application/json',
        }
    }

    const body = JSON.stringify({age, eyeColor, firstName, lastName, company,email, phone, address, id})
    try {   
        const res = await axios.post("http://localhost:5000/api/users/update", body, config)

        dispatch({
            type: UPDATE_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: UPDATE_FAIL
        })
    }
}

// Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'Application/json',
        }
    }

    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post("http://localhost:5000/api/auth", body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout user 

export const logout = () => dispatch => {
dispatch({type: LOGOUT})
} 