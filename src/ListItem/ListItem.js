import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <li>{this.props.content}</li>
    );
  }
}

export default ListItem;
