import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'

const AboutGalileo = () => {
  return (
    <>
      <Jumbotron fluid className='my-1 jumbotron-about-galileo'>
        <Container>
          <h1>Galileo</h1>
          <p>
            At Galileo, we make it our mission to help you discover and buy from
            the best emerging artists around the world. Whether you’re looking
            to discover a new artist, or add a statement piece to your home,
            Galileo is your portal to thousands of original works by today’s top
            artists.
          </p>
        </Container>
      </Jumbotron>
    </>
  )
}

export default AboutGalileo
