import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from '../constants/constants'



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
    //  data?: Product[] | string,
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
                loading: false, 
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
}