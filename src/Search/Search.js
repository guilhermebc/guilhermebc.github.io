import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className="container">
        <div className="wrapper-search-bar">
            <label htmlFor="search_bar">Type something...</label>
            <input type="text" name="search-bar" id="search_bar"/>
            <button className="btn btn-primary">Go</button>
        </div>
      </div>
    );
  }
}

export default Search;
