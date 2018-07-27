import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <header className="menu-header">
            <nav>
              <h3>{this.props.title}</h3>
            </nav>
        </header>
      </div>
    );
  }
}

export default Header;
