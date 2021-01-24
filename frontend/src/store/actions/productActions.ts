import {ThunkAction} from 'redux-thunk'
import axios from 'axios'
import {RootState} from '../store'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} from '../constants/constants'


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