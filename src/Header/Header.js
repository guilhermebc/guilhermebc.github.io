import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <header className="menu">
            <nav>
              <h3 className="menu__title">{this.props.title}</h3>
            </nav>
        </header>
      </div>
    );
  }
}

export default Header;
