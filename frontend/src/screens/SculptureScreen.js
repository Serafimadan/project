import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { listAllProducts } from '../actions/productActions'

const SculptureScreen = () => {
  const dispatch = useDispatch()
  const productAll = useSelector((state) => state.productAll)
  const { loading, error, products } = productAll

  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])
  return (
    <>
      <Meta />
      <h1 className='category-h1'>Original Sculptures For Sale</h1>
      <p className='category-p'>
        Browse our wide-ranging selection of original sculptures by artists
        working in a variety of mediums. Suitable for both the interior home and
        outdoor spaces, sculptures anchor a space and are available in numerous
        textures and colors.
      </p>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) =>
              product.category === 'Sculpture' ? (
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

export default SculptureScreen
