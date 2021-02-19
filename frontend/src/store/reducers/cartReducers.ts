import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_RESET} from '../constants/cartConstants'



const initState={
    cartItems:[], 
    shippingAddress:{
        address: '', 
        city: '', 
        postalCode:'',
        country: ''
    }, 
    paymentMethod:'',
    itemsPrice: null,
    shippingPrice: null,
    taxPrice: null,
    totalPrice: null,
}

export const cartReducer = (state: CartState=initState, action:CartActions)=>{
    switch (action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            
            const existsItem: CartItem | undefined = state.cartItems.find((x:CartItem) => x.product===item.product)
            
            if(existsItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x:CartItem) => x.product===existsItem!.product! ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x:CartItem)=>x.product!==action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }    
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }    
        case CART_RESET:
            return {
                ...initState
            } 
        default:
            return state
    }
}
