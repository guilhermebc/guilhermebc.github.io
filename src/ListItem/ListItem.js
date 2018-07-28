import React, { Component } from 'react';
import './ListItem.css';

import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
    rel: 0,
    origin: "http://localhost:3000"
  }
}

class ListItem extends Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    return (
      <li className="list-item">
        <YouTube
          videoId={this.props.content}
          opts={opts}
          onReady={this._onReady}/>
      </li>
    );
  }

}

export default ListItem;
