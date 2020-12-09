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


type CartActions = | CartAddItem | CartRemoveItem



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

type UserAction= | UserLoginRequest | UserLoginSuccess | UserLoginFail | UserLogout