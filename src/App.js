import React, { Component } from 'react';
import 'react-bootstrap';
import './App.css';
import Header from './Header/Header';
import Search from './Search/Search';
import List from './List/List';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header title="GB Youtube Search"/>
        <Search/>
        
      </div>
    );
  }
}

export default App;
