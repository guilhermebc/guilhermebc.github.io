import React, { Component } from 'react';
import './List.css';

import ListItem from '../ListItem/ListItem';

class List extends Component {

  render() {
    return (
      <div className="wrapper-list">
			<ul>
				<ListItem />
			</ul>
	  </div>
    );
  }
}

export default List;
