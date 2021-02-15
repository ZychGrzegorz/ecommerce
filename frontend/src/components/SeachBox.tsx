import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router'

interface MatchParams {
  history: any
}

interface MatchProps extends RouteComponentProps<MatchParams> {}
const SeachBox = ({ history }: MatchParams) => {
  const [keyword, setKeyword] = useState<string>('')
  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  return (
    <>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </>
  )
}

export default SeachBox
