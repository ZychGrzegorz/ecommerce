import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS} from '../constants/orderConstants'

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
    loading: boolean
    error: string
    order?: OrderType 
    }

const initialOrderDetailsState={
    loading: true,
    error: '',
    }

export const orderDetailsReducer = (state: OrderDetailsState=initialOrderDetailsState,action:OrderDetailsStateAction)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        case ORDER_DETAILS_RESET:
            return{
                ...initialOrderDetailsState
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
    
    export const orderPayReducer = (state: OrderPayState = initialOrderPayState, action: OrderPayStateAction)=>{
        switch(action.type){
            case ORDER_PAY_REQUEST:
                return {
                    loading: true
                }
            case ORDER_PAY_SUCCESS:
                return {
                    loading: false,
                    success: true
                }
            case ORDER_PAY_FAIL:
                return{
                    loading: false,
                    error: action.payload,
                }
            case ORDER_PAY_RESET:
                return{}
            default: 
                return state
        }
        }

        export const orderDeliverReducer = (state: any = {}, action: OrderDeliverStateAction)=>{
            switch(action.type){
                case ORDER_DELIVER_REQUEST:
                    return {
                        ...state,
                        loading: true
                    }
                case ORDER_DELIVER_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        success: true
                    }
                case ORDER_DELIVER_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.payload,
                    }
                case ORDER_DELIVER_RESET:
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

            const initialOrderListState={
                orders:[]
            }
        
            export const orderListReducer = (state: any = initialOrderListState, action: OrderListAction)=>{
                switch(action.type){
                    case ORDER_LIST_REQUEST:
                        return {
                            ...state,
                            loading: true
                        }
                    case ORDER_LIST_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            orders: action.payload
                        }
                    case ORDER_LIST_FAIL:
                        return{
                            ...state,
                            loading: false,
                            error: action.payload,
                        }
                  
                    default: 
                        return state
                }
                }