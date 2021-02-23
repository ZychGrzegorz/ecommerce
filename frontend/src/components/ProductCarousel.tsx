import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { listTopProducts } from '../store/actions/productActions'
import { RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  type productTopRatedType = {
    loading: boolean
    error: string
    products: Array<Product>
  }
  const productTopRated: productTopRatedType = useSelector(
    (state: RootState) => state.productTopRated
  )
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product: Product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ({product.price}€)
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
