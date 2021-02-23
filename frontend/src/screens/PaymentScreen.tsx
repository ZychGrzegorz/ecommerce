import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../store/actions/cartActions'
import { RootState } from '../store/store'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'

type CartType = {
  shippingAddress: shippingAddressType
}

const PaymentScreen: React.FC<RouteComponentProps> = ({ history }) => {
  const cart: CartType = useSelector((state: RootState) => state.cart)

  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const dispatch = useDispatch()

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <Meta title='Music Shop | Payment' />
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e: any) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
