import React, { Component } from 'react';
import './List.css';

import ListItem from '../ListItem/ListItem';

class List extends Component {

  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="wrapper-list">
			<ul>
				{this.props.list}
			</ul>
	  </div>
    );
  }
}

export default List;
