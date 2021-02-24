import React, { useEffect } from 'react'
import { listOrders } from '../store/actions/TestorderActions'
// import { listOrders } from '../../../frontend/src/store/actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ORDER_DETAILS_RESET } from '../store/constants/orderConstants'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../store/store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

type orderListType = {
  orders: Array<OrderType>
  loading: boolean
  error: string
}
type userLoginType = {
  userInfo: User
}

const OrderListScreen: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()

  const orderList: orderListType = useSelector(
    (state: RootState) => state.orderList
  )
  const { loading, error, orders } = orderList

  const userLogin: userLoginType = useSelector(
    (state: RootState) => state.userLogin
  )
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET })
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Meta title='Music Shop | Order list' />
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: OrderType) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}€</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
