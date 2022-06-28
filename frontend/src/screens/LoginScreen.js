import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { login } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const nevigate = useNavigate()
  let userLogin = useSelector(state => state.userLogin)

  let { userInfo, loading, error } = userLogin

  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : ''
  
  

  useEffect(() => {
    if (userInfo) {
      nevigate(`/${redirect}`)
    }
  }, [redirect, userInfo, nevigate])


  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }



  return (

    

    <FormContainer>
      <h1>Sing in </h1>


      {error && <Message variant='danger'>{error}</Message>}
      {(!loading && userInfo) && 'Hello there'}  
      {loading && 'Loading'}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sing In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Costmer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen

