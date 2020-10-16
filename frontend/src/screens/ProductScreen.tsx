import React from 'react'
import { Link, match, RouteComponentProps } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

interface MatchParams {
  id: string
}
interface importedProduct {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const ProductScreen = ({ match }: MatchProps) => {
  const product = products.find((p) => p._id === match.params.id)

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
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
              {product && product.price ? `Price: ${product.price} € ` : null}
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
                    <strong>${product!.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product!.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product!.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
