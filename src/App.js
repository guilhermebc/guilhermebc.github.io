import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Search from './Search/Search';
import List from './List/List';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="GB Youtube Search"/>
        <Search/>
        <List/>
      </div>
    );
  }
}

export default App;
