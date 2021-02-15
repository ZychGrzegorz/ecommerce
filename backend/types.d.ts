
  declare namespace Express {
    interface Request {
      user: {
        _id: string,
        name?:string
      };
    }
  }


interface Product {
  name: string,
  image: string,
  imageMin: string,
  description:string,
  brand: string,
  category: string,
  price: number,
  countInStock: number,
  rating: number,
  _id?: string,
    numReviews?: number,
}

interface User {
    name: string,
    email: string,
    password: string,
    _id?: string,
    isAdmin?: boolean,
    token?:string|null
}
