import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { getUserDetails,updateUserDetails } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'
import { lsitMyOrders } from '../actions/orderActions'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const { user, loading, error} = useSelector((state) => state.userDetails)
  const { success } = useSelector((state) => state.userUpdateProfile)

  const {orders, loading: loadingOrders, error: errorOrders } = useSelector(state => state.orderMyList)

  useEffect(() => {
    if (!userInfo) {
      nevigate('/login')
    }


    else {
      if(!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(lsitMyOrders()); 
      }
      else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, nevigate, user])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password != confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password })); 
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>

      <Col md={8}>
        <h1 style={{"text-align": "center"}}>My Orders</h1>
        {loadingOrders ? 'Loading Orders' : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>

            {orders.map(order => (
              <tr>
                <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt : 'Not Paid'}</td>
                <td>{order.isDelivered ? order.deliveredAt : 'Not Delivered'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
      </Col>

    </Row>
  )
}

export default ProfileScreen
