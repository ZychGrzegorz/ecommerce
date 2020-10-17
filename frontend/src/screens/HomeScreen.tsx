import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[] | undefined>([])

  useEffect((): void => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products')
      setProducts(res.data)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Latest Products</h1>
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
    </div>
  )
}

export default HomeScreen
