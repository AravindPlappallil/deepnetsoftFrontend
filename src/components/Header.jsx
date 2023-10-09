import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        
          <Navbar.Brand className='ms-5 me-5' href="">Product Listing WebApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/'>Home</Nav.Link>
            
          </Nav>
        
      </Navbar>
    </>
   
  );
}

export default Header