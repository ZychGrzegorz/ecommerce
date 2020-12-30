import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../store'
import{Action,Dispatch} from 'redux'

export const addToCart = (id:string,qty:number): ThunkAction<void, RootState,null,CartAddItem> => async (dispatch, getState)=>{
const {data} = await axios.get(`/api/products/${id}`)
dispatch({
    type: CART_ADD_ITEM,
    payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
    }
})
localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
} 

export const removeFromCart=(id:string)=>(dispatch:Dispatch, getState: ()=>RootState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}