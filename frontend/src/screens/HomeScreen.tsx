import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../store/actions/productActions'
import { RootState } from '../store/store'
type ProductList = {
  loading: boolean
  error: string
  products: Product[]
}

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList: ProductList = useSelector(
    (state: RootState) => state.productList
  )
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
            })}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen
