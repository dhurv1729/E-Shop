import React, { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import { Form, Button } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'

const UserEditScreen = () => {

  let { user, loading, error } = useSelector(state => state.userDetails)
  let { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = useSelector(state => state.userUpdate)


  const [name, setName] = useState(user.name)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState(user.email)
  const [isAdmin, setIsAdmin] = useState(user.isAdmin)

  const dispatch = useDispatch()
  const nevigate = useNavigate()

  const params = useParams();

  useEffect(() => {

    if(successUpdate) {
      dispatch({type: 'USER_UPDATE_RESET'})
      nevigate('/admin/userslist');
    } 

    else {
      if(!user.name || user._id != params.id) {
        dispatch(getUserDetails(params.id))
      } 
      else {
        setEmail(user.email)
        setName(user.name)
        setIsAdmin(user.isAdmin)
      }
    }

    
  }, [successUpdate, params.id, dispatch, user])


  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(updateUser({
      _id: params.id, name, email, isAdmin
    }))
    
  }



  return (

    <>

    <Link to='/admin/userslist' className='btn btn-light my-3'>Go Back</Link>

    <FormContainer>
      <h1>Edit User</h1>


      {loadingUpdate ? 'Loading...' : errorUpdate ? <Message variant='danger'>{errorUpdate}</Message> : (
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

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}/>
      </Form.Group>

        <Button variant="success" type="submit">
          Edit
        </Button>
      </Form>
      )}

      

      
    </FormContainer>

    </>
  )
}

export default UserEditScreen

