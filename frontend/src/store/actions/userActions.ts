import axios from "axios"
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_DETAILS_RESET } from "../constants/userConstants"
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants'
import { RootState } from "../store"


export const login =(email: string, password:string): ThunkAction<void, RootState,null,UserAction>=> async(dispatch)=>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
       
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        
        
    }
}
export const logout = () => (dispatch: Dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
   
}

export const register =(name: string,email: string, password:string): ThunkAction<void, RootState,null,UserAction>=> async(dispatch)=>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const {data} = await axios.post('/api/users', {name, email, password}, config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
       
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        
        
    }
}

export const getUserDetails =(id: string): ThunkAction<void, RootState,null,UserAction>=> async(dispatch, getState)=>{

    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        type userLogin={
                userLogin:{
                        userInfo: {
                                token: string}}
        }
        const {userLogin: {userInfo}}:userLogin = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config)
                
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
       
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        
        
    }
}

export const updateUserProfile =(user: User): ThunkAction<void, RootState,null,UserAction>=> async(dispatch, getState)=>{

    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        type userLogin={
                userLogin:{
                        userInfo: {
                                token: string}}
        }
        const {userLogin: {userInfo}}:userLogin = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile`,user, config)
       

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
       
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        
        
    }
}