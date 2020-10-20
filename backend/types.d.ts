interface Product {
    _id?: string,
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

interface User {
    name: string,
    email: string,
    password: string,
    isAdmin?: boolean,
}
