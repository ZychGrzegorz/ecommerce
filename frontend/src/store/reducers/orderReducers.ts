import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from '../constants/orderConstants'
type OrderState={
order: any,
success: boolean|null,
error: string
}
const initialState={
    order: null,
    success: null,
    error: ''

}
export const orderCreateReducer = (state:OrderState=initialState,action:OrderCreateStateAction)=>{
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