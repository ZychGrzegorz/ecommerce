import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { listUsers, deleteUser } from '../store/actions/userActions'
import { RouteComponentProps } from 'react-router-dom'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'

type UserListType = {
  loading: boolean
  error: string
  users: Array<User>
}
type UserLoginType = {
  userInfo: User
}

type UserDeleteType = {
  success?: boolean
  loading?: boolean
  error?: string
}

const UserListScreen: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()

  const userList: UserListType = useSelector(
    (state: RootState) => state.userList
  )
  const { loading, error, users } = userList

  const userLogin: UserLoginType = useSelector(
    (state: RootState) => state.userLogin
  )
  const { userInfo } = userLogin

  const userDelete: UserDeleteType = useSelector(
    (state: RootState) => state.userDelete
  )
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
    dispatch(listUsers())
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <Meta title='Music Shop | User list' />
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id!)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
