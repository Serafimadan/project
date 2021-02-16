import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DropdownMenu = () => {
  return (
    <>
      <Navbar expand='lg' collapseOnSelect>
        <Container className='sec-nav-container'>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            className='navbar-toggle'
          >
            <i className='fas fa-chevron-down'></i>
          </Navbar.Toggle>
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-center'
          >
            <LinkContainer to='/paintings'>
              <Button className='sec-nav-btn' variant='secondary' size='md'>
                <i className='fa fa-paint-brush' aria-hidden='true'></i>
                Paintings
              </Button>
            </LinkContainer>

            <LinkContainer to='/photography'>
              <Button className='sec-nav-btn' variant='secondary' size='md'>
                <i className='fas fa-camera'></i>Photography
              </Button>
            </LinkContainer>

            <LinkContainer to='/drawings'>
              <Button className='sec-nav-btn' variant='secondary' size='md'>
                <i className='fas fa-pencil-ruler'></i>Drawings
              </Button>
            </LinkContainer>

            <LinkContainer to='/sculpture'>
              <Button className='sec-nav-btn' variant='secondary' size='md'>
                <i className='fas fa-portrait'></i>Sculpture
              </Button>
            </LinkContainer>

            <LinkContainer to='/sell'>
              <Button className='sec-nav-btn' variant='success' size='md'>
                <i className='fas fa-hand-holding-usd'></i>Sell Art
              </Button>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default DropdownMenu;
