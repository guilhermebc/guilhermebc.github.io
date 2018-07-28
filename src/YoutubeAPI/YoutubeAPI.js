import React, { Component } from 'react';

import ListItem from '../ListItem/ListItem';

const apiKEY = 'AIzaSyD6VsQOvaQ0PGeLPAV4l7Ym1CbNtZmSZOQ';
const rootAPI = 'https://www.googleapis.com/youtube/v3/search';
const numResults = 10;

class YoutubeAPI extends Component {

  constructor(props){
    super(props);
  }

  onTypedClick(){

    let requestURL = `${rootAPI}?key=${apiKEY}&part=snippet,id&q=${this.props.query}&order=date&maxResults=${numResults}`;

    fetch(requestURL)
      .then((response) => response.json())
      .then((responseJson) => {
          let result = responseJson.items.map(
            obj => <ListItem listQuery={"https://www.youtube.com/embed/"+obj.id.videoId}/>
          );
          console.log("Result: ", result);
          
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {/* onClick={this.onTypedClick(this.state.query)} */}
          <button type="submit" onClick={this.onTypedClick.bind(this)}>Search</button>
        {/* <ListItem onChange={} /> */}
      </div>
    );
  }
}

export default YoutubeAPI;
