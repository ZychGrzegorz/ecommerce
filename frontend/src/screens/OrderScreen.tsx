import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../store/actions/TestorderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
} from '../store/constants/orderConstants'
import Message from '../components/Message'
import Loader from '../components/Message'
import Meta from '../components/Meta'

type OrderDetailsType = {
  loading: boolean
  error: string
  order: OrderType
}
type UserLoginType = {
  userInfo: User
}
type orderPayType = {
  loading: boolean
  success: boolean
}
interface MatchParams {
  id: string
}

const OrderScreen = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState<boolean>(false)

  const dispatch = useDispatch()

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const orderDetails: OrderDetailsType = useSelector(
    (state: RootState) => state.orderDetails
  )
  const { order, loading, error } = orderDetails

  const userLogin: UserLoginType = useSelector(
    (state: RootState) => state.userLogin
  )
  const { userInfo } = userLogin

  const orderPay = useSelector((state: RootState) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay as orderPayType

  const orderDeliver: orderPayType = useSelector(
    (state: RootState) => state.orderDeliver
  )
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  if (!loading) {
    order.itemsPrice = Number(
      addDecimals(
        order.orderItems.reduce(
          (acc: number, item: CartItem) => acc + item.price * item.qty,
          0
        )
      )
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch({ type: ORDER_CREATE_RESET })
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
      script.async = true

      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver])

  const successPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(orderId, paymentResult))
    console.log(order)
    console.log('zrzucenie stanu z magazynu')
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='Music Shop | Order' />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item: CartItem, index: number) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}&nbsp;€ ={' '}
                          {parseFloat((item.qty * item.price).toFixed(2))}
                          &nbsp;€
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{Number(order.itemsPrice).toFixed(2)}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{Number(order.shippingPrice).toFixed(2)}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{Number(order.taxPrice).toFixed(2)}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{Number(order.totalPrice).toFixed(2)}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Deliverd
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
