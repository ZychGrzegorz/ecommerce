import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Button, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../store/actions/productActions'
import { RootState } from '../store/store'

interface MatchParams {
  id: string
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

const ProductEditScreen = ({ match, history }: MatchProps) => {
  const productId = match.params.id
  console.log(productId)
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [image, setImage] = useState<string>('')
  const [imageMin, setImageMin] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [countInStock, setCountInStock] = useState<number>(0)
  const [description, setDescription] = useState<string>('')

  const dispatch = useDispatch()

  type productDetailsType = {
    product: Product
    loading: boolean
    error: string
  }

  const productDetails = useSelector((state: RootState) => state.productDetails)
  const { loading, error, product } = productDetails as productDetailsType
  console.log('edit')
  console.log(productDetails)
  console.log(product)
  useEffect(() => {
    if (!product || !product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image!)
      setImageMin(product.imageMin!)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock!)
      setDescription(product.description)
    }
  }, [dispatch, history, productId, product])

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    //update product
  }
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='imageMin'>
              <Form.Label>Image miniature</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image miniature url'
                value={imageMin}
                onChange={(e) => setImageMin(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(+e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
