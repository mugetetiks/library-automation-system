import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Form inline className="search-bar">
          <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
          <button type="button" className="search-icon">
            <i className="bi bi-search"></i>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
