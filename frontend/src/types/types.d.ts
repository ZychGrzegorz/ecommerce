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
