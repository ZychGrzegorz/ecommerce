import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS} from '../constants/orderConstants'

type OrderCreateState={
    order: any,
    success: boolean|null,
    error: string
}
const initialOrderCreateState={
    order: null,
    success: null,
    error: ''

}
export const orderCreateReducer = (state:OrderCreateState=initialOrderCreateState,action:OrderCreateStateAction)=>{
switch(action.type){
    case ORDER_CREATE_REQUEST:
        return {
            loading: true
        }
    case ORDER_CREATE_SUCCESS:
        return {
            loading: false,
            success: true,
            order: action.payload
        }
    case ORDER_CREATE_FAIL:
        return{
            loading: false,
            error: action.payload,
        }
        default: 
        return state
}
}



type OrderDetailsState={
    orderItems: object,
    shippingAddress: object,
    loading: boolean
    }

const initialOrderDetailsState={
    loading: true,
    orderItems:[],
    shippingAddress:{}
    
    }

export const orderDetailsReducer = (state:OrderDetailsState=initialOrderDetailsState,action:OrderDetailsStateAction)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
            default: 
            return state
    }
    }

    type OrderPayState={
        loading?: boolean,
        success?: boolean
        error?: string
        }
    
    const initialOrderPayState={}
    
    export const orderPayReducer = (state: any = {initialOrderPayState}, action: OrderPayStateAction)=>{
        switch(action.type){
            case ORDER_PAY_REQUEST:
                return {
                    ...state,
                    loading: true
                }
            case ORDER_PAY_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    success: true
                }
            case ORDER_PAY_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            case ORDER_PAY_RESET:
                return{}
                default: 
                return state
        }
        }
      
        const initialOrderListMyState={
            orders:[]
        }

        export const orderListMyReducer = (state: any = initialOrderListMyState, action: OrderListMyAction)=>{
            switch(action.type){
                case ORDER_LIST_MY_REQUEST:
                    return {
                        ...state,
                        loading: true
                    }
                case ORDER_LIST_MY_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        orders: action.payload
                    }
                case ORDER_LIST_MY_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.payload,
                    }
                case ORDER_LIST_MY_RESET:
                    return{
                        orders:[]
                    }
                default: 
                    return state
            }
            }