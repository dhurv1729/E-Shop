import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../actions/userAction'

const Header = () => {
  const disptach = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)

  const logoutHandler = () => {
    disptach(logout())
  }

  return (
    <header>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" style={{"background-color": "black"}}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Eshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
          <Nav className="me-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>&nbsp;&nbsp;Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ): (
            <LinkContainer to="/login">
              <Nav.Link href="/login">
                <i className="fas fa-user"></i>&nbsp;&nbsp;Sing in
              </Nav.Link>
            </LinkContainer>
            )}

            
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
