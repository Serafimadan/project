import React from "react";
import { Container, Col, Form } from "react-bootstrap";

const Filtering = ({
    location,
    setLocation,
    style,
    setStyle,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sorts, 
    setSort
    }) => {
    const submitHandler = (e) => {
        e.preventDefault();
    };
    const onChangeHandler = (e) => {
        e.preventDefault();
            setSort(e.target.value);
    }; 
    return (
        <Form onSubmit={submitHandler} inline>
        <Container>
            <Col className='filter-col' sm={12} md={3} lg={3}>
            {" "}
            <Form.Control
                as='select'
                className='filter-select'
                title='Location'
                value={location}
                checked
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value=''>Location</option>
                <option value='China'>China</option>
                <option value='Canada'>Canada</option>
                <option value='Germany'>Germany</option>
                <option value='Spain'>Spain</option>
                <option value='United States'>United States</option>
                <option value='France'>France</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='Austria'>Austria</option>
                <option value='Italy'>Italy</option>
                <option value='....'>Unknown</option>
            </Form.Control>
            </Col>
            <Col className='filter-col' sm={12} md={3} lg={2}>
            {" "}
            <Form.Control
                as='select'
                className='filter-select'
                label='Filltering'
                title='Style'
                value={style}
                checked
                onChange={(e) => setStyle(e.target.value)}
            >
                <option value=''>Style</option>
                <option value='Expressionism'>Expressionism</option>
                <option value='Abstract'>Abstract</option>
                <option value='Modern'>Modern</option>
                <option value='Street '>Street</option>
                <option value='Art'>Art</option>
                <option value='Minimalism'>Minimalism</option>
                <option value='Fine '>Fine </option>
                <option value='Deco'>Deco</option>
                <option value='Fine '>Fine </option>
                <option value='Figurative'>Figurative</option>
                <option value='Realism'>Realism</option>
                <option value='Surrealism'>Surrealism</option>
                <option value='Conceptual'>Conceptual</option>
                <option value='Folk'>Folk</option>
            </Form.Control>
            </Col>
            <Col className='filter-col' sm={12} md={3} lg={3}>
            {" "}
            <Form.Control
                as='select'
                className='filter-select filter-select-option'
                title='Price'
                value={minPrice}
                checked
                onChange={(e) => setMinPrice(e.target.value)}
            >
                <option value=''>price (min)</option>
                <option value='100'>100</option>
                <option value='500'>500</option>
                <option value='1000'>1000</option>
                <option value='2000'>2000</option>
                <option value='4000'>4000</option>
                <option value='5500'>5500</option>
            </Form.Control>
            </Col>
            <Col className='filter-col' sm={12} md={3} lg={3}>
            {" "}
            <Form.Control
                as='select'
                className='filter-select filter-select-option'
                title='Price'
                value={maxPrice}
                checked
                onChange={(e) => setMaxPrice(e.target.value)}
            >
                <option value=''>price (max)</option>
                <option value='100'>100</option>
                <option value='500'>500</option>
                <option value='1000'>1000</option>
                <option value='2000'>2000</option>
                <option value='4000'>4000</option>
                <option value='5500'>5500</option>
            </Form.Control>
            </Col>
            <Col className='filter-col' sm={12} md={3} lg={3}>
            {" "}
            <Form.Control
                        type="text"
                        as='select'
                        value={sorts}
                        className='filter-select'
                        checked
                        onChange={onChangeHandler}
                        >
                            <option value="">Sort by:</option>
                            <option value="HighestPrice">Highest Price</option>
                            <option value="LowestPrice">Lowest Price</option>
                            <option value="BestRating">Best Rating</option>
                            <option value="Newest">Newest</option>
                        </Form.Control>
            </Col>
        </Container>
        </Form>
    );
};

export default Filtering;
