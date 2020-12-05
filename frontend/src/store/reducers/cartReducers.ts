import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

type CartState = {
  cartItems: CartItem[]

}
export const cartReducer = (state: CartState={cartItems:[]}, action:CartActions)=>{
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

        default:
            return state
    }
}
