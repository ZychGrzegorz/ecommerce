import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET} from '../constants/constants'



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
    data: Product[] | null,
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
type ProductCreateState = any

export const productCreateReducer = (state: ProductCreateState = {}, action: ProductCreateAction)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {
                ...state, 
                loading: true, 
                 
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false, 
                success: true,
                product: action.payload,
               
            }
        case PRODUCT_CREATE_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
        case PRODUCT_CREATE_RESET:
            return {
               
            }

        default:
            return state
    }
}

type ProductUpdateState = any

export const productUpdateReducer = (state: ProductUpdateState = {product:{}}, action: ProductUpdateAction)=>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {
               
                loading: true, 
                 
            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                
                loading: false, 
                success: true,
                product: action.payload,
               
            }
        case PRODUCT_UPDATE_FAIL:
            return {
                
                loading: false, 
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return {
               product:{}
            }

        default:
            return state
    }
}

type ProductCreateReviewState = any

export const productReviewCreateReducer = (state: ProductCreateReviewState = {}, action: ProductCreateReviewAction)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true, 
                 }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {                
                loading: false, 
                success: true,
                            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {                
                loading: false, 
                error: action.payload
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {
               product:{}
            }

        default:
            return state
    }
}