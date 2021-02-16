import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import CookiePopup from "../components/CookiePopup";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Filtering from "../components/Filtering";
import HomeSlider from "../components/HomeSlider";
import { login } from "../actions/userActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [style, setStyle] = useState("");
  const [sorts, setSort] = useState("");
  const dispatch = useDispatch();

  const cookiesFromStorage = localStorage.getItem("isCookies")
    ? JSON.parse(localStorage.getItem("isCookies"))
    : true;

  const [cookiePopup, setCookiePopup] = useState(cookiesFromStorage);

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    localStorage.setItem("isCookies", cookiePopup);
    dispatch(
      listProducts(
        keyword,
        pageNumber,
        location,
        minPrice,
        maxPrice,
        style,
        sorts
      )
    );
    const isOAuth = JSON.parse(localStorage.getItem("isOAuth"));
    if (isOAuth) {
      dispatch(login());
      console.log(isOAuth);
    }
  }, [
    dispatch,
    keyword,
    pageNumber,
    location,
    minPrice,
    maxPrice,
    style,
    sorts,
    cookiePopup,
    userInfo,
  ]);

  return (
    <>
      {cookiePopup && <CookiePopup show={true} onHide={setCookiePopup} />}
      <Meta />
      {!keyword ?  (
        <>
          <HomeSlider />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1 className='text-center' id='latest-art'>
        Latest Art
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>

          <Navbar
            expand='md'
            className='d-flex justify-content-even filter-sort-container'
          >
            <Nav lg={10} md={10} sm={10}>
              <Filtering
                location={location}
                setLocation={setLocation}
                style={style}
                setStyle={setStyle}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sorts={sorts} 
                setSort={setSort}
              />
            </Nav>
          </Navbar>
          { !style || !location ?  ( 
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> </> ) : (
            <>
            <Message>
              We don't have such products! Please, choose another parameters.
            </Message>
              </>
              ) }
        </>
      )}
    </>
  );
};

export default HomeScreen;
