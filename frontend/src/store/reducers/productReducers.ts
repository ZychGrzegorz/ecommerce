import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL} from '../constants/constants'



const initialState = {
    data: null,
    loading: false,
    error: ''

}
export const productListReducer = (state: ProductState = initialState, action: ProductAction)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true, 
                products: initialState
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false, 
                products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
}


const initialProductDetails ={
    data: null,
    loading: false,
    error: ''
    }

 type ProductDetailsState={
    loading: boolean,
    error: string
    data?: Product[] | null,
 }

export const productDetailsReducer = (state: ProductDetailsState = initialProductDetails, action: ProductDetailsAction)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state, 
                loading: true, 
                product: null 
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false, 
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
}
type ProductDeleteState=any

export const productDeleteReducer = (state: ProductDeleteState = {}, action: ProductDeleteAction)=>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {
                ...state, 
                loading: true, 
                 
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false, 
                success:true,
               
            }
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
}