import {ThunkAction} from 'redux-thunk'
import axios from 'axios'
import {RootState} from '../store'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET} from '../constants/constants'


export const listProducts = (): ThunkAction<void, RootState,null,ProductAction> => {
    return async dispatch => {
        try{
            dispatch({type: PRODUCT_LIST_REQUEST})
            const {data}=await axios.get('/api/products')
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data,
            })
        }
        catch(error){
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        }
    }
}


export const listProductDetails = (id:string): ThunkAction<void, RootState,null,ProductDetailsAction> => {
    return async dispatch => {
        try{
            dispatch({type: PRODUCT_DETAILS_REQUEST})
            const {data}=await axios.get(`/api/products/${id}`)
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data,
            })
        }
        catch(error){
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        }
    }
}

export const deleteProduct =(id: string): ThunkAction<void, RootState,null,ProductDeleteAction>=> async(dispatch, getState)=>{
   
    try {
       
        dispatch({           
            type: PRODUCT_DELETE_REQUEST
            
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
   
        
        await axios.delete(`/api/products/${id}`, config)
       
       
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            
        })
        
        
    } catch (error) {
       
            dispatch({
                type: PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
    }
}

export const createProduct =(): ThunkAction<void, RootState,null,ProductDeleteAction>=> async(dispatch, getState)=>{
   
    try {
       
        dispatch({           
            type: PRODUCT_CREATE_REQUEST
            
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
   
        
       const {data} =  await axios.post(`/api/products`,{} , config)
       
       
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
       
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
    }
}