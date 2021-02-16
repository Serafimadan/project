import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { listAllProducts } from '../actions/productActions'

const PaintingScreen = () => {
  const dispatch = useDispatch()
  const productAll = useSelector((state) => state.productAll)
  const { loading, error, products } = productAll

  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])
  return (
    <>
      <Meta />
      <h1 className='category-h1'>Original Paintings For Sale</h1>
      <p className='category-p'>
        Whether you are looking for an original painting or a high quality art
        print, Galileo has many original paintings for sale from emerging
        artists around the world.
      </p>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) =>
              product.category === 'Painting' ? (
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

export default PaintingScreen
