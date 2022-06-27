import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
const Header = () => {
	return (
		<header>
			<Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <Container>
        <Navbar.Brand href="/	">Eshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
        </Navbar.Collapse>
				<Nav className="me-auto">
            <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>&nbsp;&nbsp;Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fas fa-user"></i>&nbsp;&nbsp;Sing in</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
		</header>
	);
}

export default Header 