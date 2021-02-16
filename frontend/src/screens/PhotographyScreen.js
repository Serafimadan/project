import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { listAllProducts } from '../actions/productActions'

const PhotographyScreen = () => {
  const dispatch = useDispatch()
  const productAll = useSelector((state) => state.productAll)
  const { loading, error, products } = productAll

  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])
  return (
    <>
      <Meta />
      <h1 className='category-h1'>Original Photography For Sale</h1>
      <p className='category-p'>
        With many limited edition and open edition prints to choose from,
        Galileo offers high quality photography perfectly suited for your space.
      </p>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) =>
              product.category === 'Photography' ? (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ) : (
                false
              )
            )}
          </Row>
        </>
      )}
    </>
  )
}

export default PhotographyScreen
