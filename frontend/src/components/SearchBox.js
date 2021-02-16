import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useGAEventTracker } from "../analytic";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

const SearchBox = ({ history }) => {
  const GAEventsTracker = useGAEventTracker("Search for item");

  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        if (debouncedKeyword.length > 0 && debouncedKeyword !== " ") {
          const { data } = await axios.get(
            `/api/products?keyword=${debouncedKeyword}&pageNumber=1`
          );
          setSearchResults(data.products);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setSearchResults([]);
      }
    };
    fetchSearchData();
  }, [debouncedKeyword]);

  const submitHandler = (e) => {
    GAEventsTracker("Clicked on search bar");

    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className='galileo-src-form relative'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ml-sm-5'
        autoComplete='off'
        value={keyword}
        onBlur={() => setSearchResults([])}
      ></Form.Control>
      {searchResults.length > 0 && (
        <div className='autocomplete-box'>
          <ul>
            {searchResults.map((suggestion) => (
              <li
                key={suggestion._id}
                className='autocomplete-item'
                onMouseDown={() => history.push(`/product/${suggestion._id}`)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button className='galileo-src-btn ' type='submit'>
        <i className='fas fa-search'></i>{" "}
        <span className='nav-hide'>search</span>
      </Button>
    </Form>
  );
};

export default SearchBox;
