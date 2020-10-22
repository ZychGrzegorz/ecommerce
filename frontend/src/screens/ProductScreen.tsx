import React, { useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../store/actions/productActions'
import { RootState } from '../store/store'
import Message from '../components/Message'
import Loader from '../components/Loader'

interface MatchParams {
  id: string
}
type ProductList = {
  loading: boolean
  error: string
  products: Product[]
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

const ProductScreen = ({ match }: MatchProps) => {
  const dispatch = useDispatch()
  const productDetails = useSelector((state: RootState) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect((): void => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  console.log(product)
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {product ? (
            <Row>
              <Col md={6}>
                {product && (product.image || product.name) ? (
                  <Image src={product.image} alt={product.name} fluid />
                ) : null}
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    {product && product.name ? <h3>{product.name}</h3> : null}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product && (product.rating || product.numReviews) ? (
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    ) : null}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product && product.price
                      ? `Price: ${product.price} € `
                      : null}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product && product.description
                      ? `Description: ${product.description} `
                      : null}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>{product && product.price} €</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {(product && product.countInStock) > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product && product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          ) : null}
        </>
      )}
    </>
  )
}

export default ProductScreen
