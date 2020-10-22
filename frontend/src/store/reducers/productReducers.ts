import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from '../constants'



const initialState: ProductState = {
    data: null,
    loading: false,
    error: ''

}
export const productListReducer = (state: ProductState = initialState, action: ProductAction)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: initialState}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

// const initialProductDetail ={
// product: { reviews: []}
// }
const initialProductDetails ={
    data: null,
    loading: false,
    error: ''
    }
export const productDetailsReducer = (state: any = initialProductDetails, action: ProductDetailsAction)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, product:[null], ...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}