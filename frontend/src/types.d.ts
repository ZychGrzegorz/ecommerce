interface Product {
    _id: string,
    name: string,
    image?: string,
    imageMin?: string,
    description:string,
    brand: string,
    category: string,
    price: number,
    rating: number,
    countInStock?: number,
    numReviews?: number,
    reviews?: array<string>
}

type User = {
    email: string,
    name: string,
    id?: string,
    _id?: string,
    password?: string,
    isAdmin?: boolean,
    token?: string,
}

type CartItem = {
    product: string,
    name: string,
    image: string,
    price: number,
    countInStock: number,
    qty: number,
}

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
    itemsPrice?: number|null|string
    shippingPrice?: number|null|string
    taxPrice?: number|null|string
    totalPrice?: number|null|string
  }

  type OrderType={
    shippingAddress: shippingAddressType,
    taxPrice:number,
    shippingPrice: number,
    totalPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    _id: string
    orderItems: Array<CartItem>,
    user:{
        _id: string,
        email: string,
        name: string
    }
    paymentMethod: string,
    itemsPrice: number,
    createdAt: string,
    updatedAt: string,
    itemsPrice: string,
    deliveredAt: string
    paidAt: string
}

type CreteOrder={
    orderItems: Array<CartItem>
    shippingAddress: shippingAddressType
    paymentMethod: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
}

type ProductListRequest={
    type: typeof import ('./store/constants').PRODUCT_LIST_REQUEST
    payload?: any 
    }

type ProductListSucces={
    type: typeof import ('./store/constants').PRODUCT_LIST_SUCCESS
    payload:  {
        products: Array<Product>,
        pages: string, 
        page: string 
    }
}
type ProductListFail={
    type: typeof import ('./store/constants').PRODUCT_LIST_FAIL
    payload: string
}

type ProductAction = | ProductListRequest | ProductListSucces | ProductListFail

type ProductDetailsRequest={
    type: typeof import ('./store/constants').PRODUCT_DETAILS_REQUEST
    payload?: any 
    }

type ProductDetailsSucces={
    type: typeof import ('./store/constants').PRODUCT_DETAILS_SUCCESS
    payload: Product
}
type ProductDetailsFail={
    type: typeof import ('./store/constants').PRODUCT_DETAILS_FAIL
    payload: string
}

type ProductDetailsAction = | ProductDetailsRequest | ProductDetailsSucces | ProductDetailsFail

type UserUpdateProfileRequest={
    type: typeof import ('./store/constants/userConstants').USER_UPDATE_PROFILE_REQUEST
    payload?: string 
    }

type UserUpdateProfileSucces={
    type: typeof import ('./store/constants/userConstants').USER_UPDATE_PROFILE_SUCCESS
    payload:  Product[]
}
type UserUpdateProfileFail={
    type: typeof import ('./store/constants/userConstants').USER_UPDATE_PROFILE_FAIL
    payload: string
}
type UserUpdateProfileReset={
    type: typeof import ('./store/constants/userConstants').USER_UPDATE_PROFILE_RESET
    payload: string
}
type UserUpdateProfileAction = | UserUpdateProfileRequest  | UserUpdateProfileSucces | UserUpdateProfileFail | UserUpdateProfileReset | CartReset

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
type CartReset={
    type: typeof import ('./store/constants/cartConstants').CART_RESET
    payload: string
}

type CartActions = | CartAddItem | CartRemoveItem | CartSaveShippingAddress | CartSavePaymentMethod | CartReset

type UserLoginRequest={
    type: typeof import ('../constants/userConstants').USER_LOGIN_REQUEST
    payload?: any
}
type UserLoginSuccess={
    type: typeof import ('../constants/userConstants').USER_LOGIN_SUCCESS
    payload:  User
}
type UserLoginFail={
    type: typeof import ('../constants/userConstants').USER_LOGIN_FAIL
    payload: string
}
type UserLogout={
    type: typeof import ('../constants/userConstants').USER_LOGOUT
    payload?: any
}

type UserAction = | UserLoginRequest | UserLoginSuccess | UserLoginFail | UserLogout | CartReset


type UserRegisterRequest={
    type: typeof import ('../constants/userConstants').USER_REGISTER_REQUEST
    payload?: string
}
type UserRegisterSuccess={
    type: typeof import ('../constants/userConstants').USER_REGISTER_SUCCESS
    payload:  User
}
type UserRegisterFail={
    type: typeof import ('../constants/userConstants').USER_REGISTER_FAIL
    payload: string
}


type UserRegisterAction = | UserRegisterRequest | UserRegisterSuccess | UserRegisterFail | UserLoginSuccess

type UserDetailsRequest={
    type: typeof import ('../constants/userConstants').USER_DETAILS_REQUEST
    payload?: string
}
type UserDetailsSuccess={
    type: typeof import ('../constants/userConstants').USER_DETAILS_SUCCESS
    payload:  User
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
    payload:  User
}
type UserUpdateStateFail={
    type: typeof import ('../constants/userConstants').USER_UPDATE_STATE_FAIL
    payload: string
}

type UserUpdateStateAction = | UserUpdateStateRequest | UserUpdateStateSuccess | UserUpdateStateFail | UserLoginSuccess



type OrderCreateRequest={
    type: typeof import ('../constants/orderConstants').ORDER_CREATE_REQUEST
    payload?: string
}
type OrderCreateSuccess={
    type: typeof import ('../constants/orderConstants').ORDER_CREATE_SUCCESS
    payload:  User
}
type OrderCreateFail={
    type: typeof import ('../constants/orderConstants').ORDER_CREATE_FAIL
    payload: string
}

type OrderCreateStateAction = | OrderCreateRequest | OrderCreateSuccess | OrderCreateFail | CartReset

type OrderDetailsStateAction = | OrderDetailsRequest | OrderDetailsSuccess | OrderDetailsFails

type OrderDetailsRequest={
    type: typeof import ('../constants/orderConstants').ORDER_DETAILS_REQUEST
    payload?: any
}
type OrderDetailsSuccess={
    type: typeof import ('../constants/orderConstants').ORDER_DETAILS_SUCCESS
    payload:  OrderType
}
type OrderDetailsFail={
    type: typeof import ('../constants/orderConstants').ORDER_DETAILS_FAIL
    payload: string
}

type OrderPayStateAction = | OrderPayRequest | OrderPaySuccess | OrderPayFails | OrderPayReset

type OrderPayRequest={
    type: typeof import ('../constants/orderConstants').ORDER_PAY_REQUEST
    payload?: any
}
type OrderPaySuccess={
    type: typeof import ('../constants/orderConstants').ORDER_PAY_SUCCESS
    payload?: any
}
type OrderPayFail={
    type: typeof import ('../constants/orderConstants').ORDER_PAY_FAIL
    payload: string
}
type OrderPayReset={
    type: typeof import ('../constants/orderConstants').ORDER_PAY_RESET
    payload?: any
}

type OrderDeliverStateAction = | OrderDeliverRequest | OrderDeliverSuccess | OrderDeliverFails | OrderDeliverReset

type OrderDeliverRequest={
    type: typeof import ('../constants/orderConstants').ORDER_DELIVER_REQUEST
    payload?: any
}
type OrderDeliverSuccess={
    type: typeof import ('../constants/orderConstants').ORDER_DELIVER_SUCCESS
    payload:  OrderType
}
type OrderDeliverFail={
    type: typeof import ('../constants/orderConstants').ORDER_DELIVER_FAIL
    payload: string
}
type OrderDeliverReset={
    type: typeof import ('../constants/orderConstants').ORDER_DELIVER_RESET
    payload?: any
}

type OrderListMyAction = | OrderListMyRequest | OrderListMySuccess | OrderListMyFail | OrderListMyReset

type OrderListMyRequest={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_MY_REQUEST
    payload?: string
}
type OrderListMySuccess={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_MY_SUCCESS
    payload:  Array<OrderType>
}
type OrderListMyFail={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_MY_FAIL
    payload: string
}
type OrderListMyReset={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_MY_RESET
    payload?: any 
}

type OrderListAction = | OrderListRequest | OrderListSuccess | OrderListFail

type OrderListRequest={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_REQUEST
    payload?: string
}
type OrderListSuccess={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_SUCCESS
    payload:  any
}
type OrderListFail={
    type: typeof import ('../constants/orderConstants').ORDER_LIST_FAIL
    payload: string
}
    
type UserListAction = | UserListStateRequest | UserListStateSuccess | UserListStateFail | UserListStateReset

type UserListStateRequest={
    type: typeof import ('../constants/userConstants').USER_LIST_REQUEST
    payload?: string
}
type UserListStateSuccess={
    type: typeof import ('../constants/userConstants').USER_LIST_SUCCESS
    payload:  Array<User>
}
type UserListStateFail={
    type: typeof import ('../constants/userConstants').USER_LIST_FAIL
    payload: string
}
type UserListStateReset={
    type: typeof import ('../constants/userConstants').USER_LIST_RESET
    payload?: string
}

type UserDeleteAction = | UserDeleteRequest | UserDeleteSuccess | UserDeleteFail 

type UserDeleteRequest={
    type: typeof import ('../constants/userConstants').USER_DELETE_REQUEST
    payload?: any
}
type UserDeleteSuccess={
    type: typeof import ('../constants/userConstants').USER_DELETE_SUCCESS
    payload?:  any
}
type UserDeleteFail={
    type: typeof import ('../constants/userConstants').USER_DELETE_FAIL
    payload: string
}


type UserUpdateAction = | UserUpdateRequest | UserUpdateSuccess | UserUpdateFail | UserUpdateReset

type UserUpdateRequest={
    type: typeof import ('../constants/userConstants').USER_UPDATE_REQUEST
    payload?: string
}
type UserUpdateSuccess={
    type: typeof import ('../constants/userConstants').USER_UPDATE_SUCCESS
    payload:  User
}
type UserUpdateFail={
    type: typeof import ('../constants/userConstants').USER_UPDATE_FAIL
    payload: string
}
type UserUpdateReset={
    type: typeof import ('../constants/userConstants').USER_UPDATE_RESET
    payload?: string
}


type ProductDeleteAction = | ProductDeleteRequest | ProductDeleteSuccess | ProductDeleteFail 

type ProductDeleteRequest={
    type: typeof import ('../constants/constants').PRODUCT_DELETE_REQUEST
    payload?: string
}
type ProductDeleteSuccess={
    type: typeof import ('../constants/constants').PRODUCT_DELETE_SUCCESS
    payload:  any
}
type ProductDeleteFail={
    type: typeof import ('../constants/constants').PRODUCT_DELETE_FAIL
    payload: string
}




type ProductCreateAction = | ProductCreateRequest | ProductCreateSuccess | ProductCreateFail | ProductCreateReset

type ProductCreateRequest={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_REQUEST
    payload?: string
}
type ProductCreateSuccess={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_SUCCESS
    payload:  any
}
type ProductCreateFail={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_FAIL
    payload: string
}
type ProductCreateReset={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_RESET
    payload: string
}



type ProductUpdateAction = | ProductUpdateRequest | ProductUpdateSuccess | ProductUpdateFail | ProductUpdateReset

type ProductUpdateRequest={
    type: typeof import ('../constants/constants').PRODUCT_UPDATE_REQUEST
    payload?: string
}
type ProductUpdateSuccess={
    type: typeof import ('../constants/constants').PRODUCT_UPDATE_SUCCESS
    payload: Product
}
type ProductUpdateFail={
    type: typeof import ('../constants/constants').PRODUCT_UPDATE_FAIL
    payload: string
}
type ProductUpdateReset={
    type: typeof import ('../constants/constants').PRODUCT_UPDATE_RESET
    payload: string
}

type ProductCreateReviewAction = | ProductCreateReviewRequest | ProductCreateReviewSuccess | ProductCreateReviewFail | ProductCreateReviewReset

type ProductCreateReviewRequest={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_REVIEW_REQUEST
    payload?: string
}
type ProductCreateReviewSuccess={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_REVIEW_SUCCESS
    payload:  any
}
type ProductCreateReviewFail={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_REVIEW_FAIL
    payload: string
}
type ProductCreateReviewReset={
    type: typeof import ('../constants/constants').PRODUCT_CREATE_REVIEW_RESET
    payload: string
}


type ProductTopRatedAction = | ProductTopRatedRequest | ProductTopRatedSuccess | ProductTopRatedFail 

type ProductTopRatedRequest={
    type: typeof import ('../constants/constants').PRODUCT_TOP_REQUEST
    payload?: any
}
type ProductTopRatedSuccess={
    type: typeof import ('../constants/constants').PRODUCT_TOP_SUCCESS
    payload:  Array<Product>
}
type ProductTopRatedFail={
    type: typeof import ('../constants/constants').PRODUCT_TOP_FAIL
    payload: string
}