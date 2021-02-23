import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../store/actions/userActions'
import { USER_UPDATE_RESET } from '../store/constants/userConstants'
import { RootState } from '../store/store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import FormContainer from '../components/FormContainer'

interface MatchParams {
  id: string
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

type UserDeatilsType = {
  loading: boolean
  error: string
  user: User
}

type UserUpdateType = {
  loading: boolean
  error: string
  success: boolean
}
const UserEditScreen: React.FC<MatchProps> = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const dispatch = useDispatch()

  const userDetails: UserDeatilsType = useSelector(
    (state: RootState) => state.userDetails
  )
  const { loading, error, user } = userDetails

  const userUpdate: UserUpdateType = useSelector(
    (state: RootState) => state.userUpdate
  )
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userList')
    } else {
      console.log(user)
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin!)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <>
      <Meta title='Music Shop | User edit' />
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsAdmin(e.target.checked)
                }
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UserEditScreen
