import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL} from '../constants/orderConstants'
import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { Dispatch } from "redux"


export const createOrder =(order: OrderType): ThunkAction<void, RootState,null,UserAction>=> async(dispatch, getState)=>{
   
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