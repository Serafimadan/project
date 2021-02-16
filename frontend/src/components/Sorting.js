import React from "react";
import { Form } from "react-bootstrap";

const Sorting = ({  sorts, setSort }) => {
    
    const onChangeHandler = (e) => {
        e.preventDefault();
            setSort(e.target.value);
    }; 
    
    return (
        < >
            <Form  inline>
                        <Form.Control
                        type="text"
                        as='select' 
                        value={sorts}
                        checked
                        onChange={onChangeHandler}
                        >
                            <option value="">Sort by:</option>
                            <option value="HighestPrice">Highest Price</option>
                            <option value="LowestPrice">Lowest Price</option>
                            <option value="BestRating">Best Rating</option>
                            <option value="Newest">Newest</option>
                        </Form.Control>
                        </Form>
        </>
    );
};

export default Sorting;
