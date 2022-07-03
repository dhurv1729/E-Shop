import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { getUserDetails,updateUserDetails } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'
import { listMyOrders, listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
  

  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin


  const {orders, loading: loadingOrders, error: errorOrders } = useSelector(state => state.orderList)

  useEffect(() => {
    if (!userInfo) {
      nevigate('/login')
    }

    else {        
        dispatch(listOrders()); 
 
    }
  }, [userInfo, nevigate])

  

  return (
    <>
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
</>
  )
}

export default OrderListScreen
