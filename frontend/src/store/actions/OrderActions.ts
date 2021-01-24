import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_RESET} from '../constants/orderConstants'
import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { Dispatch } from "redux"

export const createOrder =(order: OrderType): ThunkAction<void, RootState,null,OrderCreateStateAction>=> async(dispatch, getState)=>{
   
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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
        const {data} = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        
        
    }
}

export const getOrderDetails =(id: string): ThunkAction<void, RootState,null,OrderDetailsStateAction>=> async(dispatch, getState)=>{
       try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        type userLogin={
                userLogin:{
                        userInfo: {
                                token: string}}
        }
        const {userLogin: {userInfo}}:userLogin = getState()

        const config = {
            headers: {               
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`, config)
       

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
       
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })    
    }
}

export const payOrder =(orderId: string, paymentResult:any): ThunkAction<void, RootState,null,OrderPayStateAction>=> async(dispatch, getState)=>{
   
    try {
        dispatch({           
            type: ORDER_PAY_REQUEST
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
   
        
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
       
       
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
        
        
    } catch (error) {
       
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
    }
}

export const listMyOrders =(): ThunkAction<void, RootState,null,OrderListMyAction>=> async(dispatch, getState)=>{
   
    try {
        dispatch({           
            type: ORDER_LIST_MY_RESET
        })
        dispatch({           
            type: ORDER_LIST_MY_REQUEST
        })

        type userLogin={
                userLogin:{
                        userInfo: {
                                token: string}}
        }
        const {userLogin: {userInfo}}:userLogin = getState()

        const config = {
            headers: {      
                Authorization: `Bearer ${userInfo.token}`
            }
        }
   
        
        const {data} = await axios.get(`/api/orders/myorders`, config)
       
       
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
        
        
    } catch (error) {
       
            dispatch({
                type: ORDER_LIST_MY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
    }
}