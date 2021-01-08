interface Product {
    _id: string,
    name: string,
    image: string,
    imageMin: string,
    description:string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
}

type ProductState ={
    data: Product[] | null,
    loading: boolean,
    error: string
}

type ProductDetails={
    product: Product|null,
    loading: boolean,
    error: string
}


type ProductListRequest={
    type: typeof import ('./store/constants').PRODUCT_LIST_REQUEST
    payload?: string 
    }

type ProductListSucces={
    type: typeof import ('./store/constants').PRODUCT_LIST_SUCCESS
    payload:  Product[]
}
type ProductListFail={
    type: typeof import ('./store/constants').PRODUCT_LIST_FAIL
    payload: string
}

type ProductAction = | ProductListRequest|ProductListSucces|ProductListFail

type ProductDetailsRequest={
    type: typeof import ('./store/constants').PRODUCT_DETAILS_REQUEST
    payload?: string 
    }

type ProductDetailsSucces={
    type: typeof import ('./store/constants').PRODUCT_DETAILS_SUCCESS
    payload:  Product[]
}
type ProductDetailsFail={
    type: typeof import ('./store/constants').PRODUCT_DETAILS_FAIL
    payload: string
}

type ProductDetailsAction = | ProductDetailsRequest|ProductDetailsSucces|ProductDetailsFail

type CartItem={
    product: string,
    name: string,
    image: string,
    price: number,
    countInStock: number,
    qty: number,
}

type CartAddItem={
    type: typeof import ('./store/constants/cartConstants').CART_ADD_ITEM
    payload: CartItem
}
type CartRemoveItem={
    type: typeof import ('./store/constants/cartConstants').CART_REMOVE_ITEM
    payload: string
}

type CartSaveShippingAddress={
    type: typeof import ('./store/constants/cartConstants').CART_SAVE_SHIPPING_ADDRESS
    payload: string
}
type CartSavePaymentMethod={
    type: typeof import ('./store/constants/cartConstants').CART_SAVE_PAYMENT_METHOD
    payload: string
}


type CartActions = | CartAddItem | CartRemoveItem | CartSaveShippingAddress | CartSavePaymentMethod



type User = any

type UserLoginRequest={
    type: typeof import ('../constants/userConstants').USER_LOGIN_REQUEST
    payload?: string
}
type UserLoginSuccess={
    type: typeof import ('../constants/userConstants').USER_LOGIN_SUCCESS
    payload:  any
}
type UserLoginFail={
    type: typeof import ('../constants/userConstants').USER_LOGIN_FAIL
    payload: string
}
type UserLogout={
    type: typeof import ('../constants/userConstants').USER_LOGOUT
    payload: any
}

type UserAction = | UserLoginRequest | UserLoginSuccess | UserLoginFail | UserLogout



type UserRegisterRequest={
    type: typeof import ('../constants/userConstants').USER_REGISTER_REQUEST
    payload?: string
}
type UserRegisterSuccess={
    type: typeof import ('../constants/userConstants').USER_REGISTER_SUCCESS
    payload:  any
}
type UserRegisterFail={
    type: typeof import ('../constants/userConstants').USER_REGISTER_FAIL
    payload: string
}


type UserRegisterAction = | UserRegisterRequest | UserRegisterSuccess | UserRegisterFail

type UserDetailsRequest={
    type: typeof import ('../constants/userConstants').USER_DETAILS_REQUEST
    payload?: string
}
type UserDetailsSuccess={
    type: typeof import ('../constants/userConstants').USER_DETAILS_SUCCESS
    payload:  any
}
type UserDetailsFail={
    type: typeof import ('../constants/userConstants').USER_DETAILS_FAIL
    payload: string
}

type UserDetailsAction = | UserDetailsRequest | UserDetailsSuccess | UserDetailsFail

type UserUpdateStateRequest={
    type: typeof import ('../constants/userConstants').USER_UPDATE_STATE_REQUEST
    payload?: string
}
type UserUpdateStateSuccess={
    type: typeof import ('../constants/userConstants').USER_UPDATE_STATE_SUCCESS
    payload:  any
}
type UserUpdateStateFail={
    type: typeof import ('../constants/userConstants').USER_UPDATE_STATE_FAIL
    payload: string
}

type UserUpdateStateAction = | UserUpdateStateRequest | UserUpdateStateSuccess | UserUpdateStateFail

type shippingAddressType={ 
    address: string, 
    city: string, 
    postalCode:string,
    country: string
}
type CartState = {
    cartItems: CartItem[]
    shippingAddress: shippingAddressType
    paymentMethod: string
    itemsPrice: number|null|string
    shippingPrice: number|null|string
    taxPrice: number|null|string
    totalPrice: number|null|string
  }

  type OrderCreateRequest={
    type: typeof import ('../constants/orderConstants').ORDER_CREATE_REQUEST
    payload?: string
}
type OrderCreateSuccess={
    type: typeof import ('../constants/orderConstants').ORDER_CREATE_SUCCESS
    payload:  any
}
type OrderCreateFail={
    type: typeof import ('../constants/orderConstants').ORDER_CREATE_FAIL
    payload: string
}

type OrderCreateStateAction = | OrderCreateRequest | OrderCreateSuccess | OrderCreateFail

type OrderType={
    orderItems: CartItem[],
    shippingAddress: shippingAddressType,
    paymentMethod: string,
    itemsPrice: number,
    shippingPrice: number,
    taxPrice:number,
    totalPrice: number,
}
