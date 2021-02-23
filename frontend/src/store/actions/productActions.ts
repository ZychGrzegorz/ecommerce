import {ThunkAction} from 'redux-thunk'
import axios from 'axios'
import {RootState} from '../store'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_TOP_FAIL, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_REQUEST} from '../constants/constants'


export const listProducts = (keyword:string='', pageNumber:string=''): ThunkAction<void, RootState,null,ProductAction> => {
    return async dispatch => {
        try{
            dispatch({type: PRODUCT_LIST_REQUEST})
            const {data, }=await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
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

export const createProduct =(): ThunkAction<void, RootState,null,ProductCreateAction>=> async(dispatch, getState)=>{
   
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

type UpdateProductType = {
    _id:string,
    name: string,
    price:number,
    brand:string,
    category: string,
    description: string,
    countInStock: number,
    image: string,
    imageMin:string
}
export const updateProduct =(product:UpdateProductType
    ): ThunkAction<void, RootState,null,ProductUpdateAction>=> async(dispatch, getState)=>{
   
    try {
       
        dispatch({           
            type: PRODUCT_UPDATE_REQUEST
            
        })

        type userLogin={
                userLogin:{
                        userInfo: {
                                token: string}}
        }
        const {userLogin: {userInfo}}:userLogin = getState()

        const config = {
            'Content-Type': 'application/json',
            headers: {      
                Authorization: `Bearer ${userInfo.token}`
            }
        }
   
        
       const {data} =  await axios.put(`/api/products/${product._id}`, product, config)
       
       
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
       
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
    }
}

export const createProductReview =(productId:string, review:{rating: number, comment: string}): ThunkAction<void, RootState,null,ProductCreateReviewAction>=> async(dispatch, getState)=>{
   
    try {
       
        dispatch({           
            type: PRODUCT_CREATE_REVIEW_REQUEST
            
        })

        type userLogin={
                userLogin:{
                        userInfo: {
                                token: string}}
        }
        const {userLogin: {userInfo}}:userLogin = getState()

        const config = {
            'Content-Type': 'application/json',
            headers: {      
                Authorization: `Bearer ${userInfo.token}`
            }
        }
   
        
        await axios.post(`/api/products/${productId}/reviews`, review, config)
       
       
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            
        })
        
        
    } catch (error) {
       
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
            
    }
}

export const listTopProducts = (): ThunkAction<void, RootState,null,ProductTopRatedAction> => {
    return async dispatch => {
        try{
            dispatch({type: PRODUCT_TOP_REQUEST})
            const {data }=await axios.get(`/api/products/top`)
            dispatch({
                type: PRODUCT_TOP_SUCCESS,
                payload: data,
            })
        }
        catch(error){
            dispatch({
                type: PRODUCT_TOP_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        }
    }
}