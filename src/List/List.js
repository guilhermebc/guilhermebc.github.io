import React, { Component } from 'react';
import './List.css';

class List extends Component {

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
