import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'

const RegisterScreen = () => {


  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const nevigate = useNavigate()
  let userRegister = useSelector(state => state.userRegister)

  let { userInfo, loading, error } = userRegister

  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : ''
  
  

  useEffect(() => {
    if (userInfo) {
      nevigate(`/${redirect}`)
    }
  }, [redirect, userInfo, nevigate])


  const submitHandler = async (e) => {
    e.preventDefault()
    if(password != confirmPassword) {
      setMessage('Password do not match')
    }
    else {
      dispatch(register(name, email, password))
    }
  }



  return (

    

    <FormContainer>
      <h1>Sing in </h1>

      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && 'Loading'}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an account &nbsp; 
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-success'>
             Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen

