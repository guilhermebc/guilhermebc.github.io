import React, { Component } from 'react';

import ListItem from '../ListItem/ListItem';

const apiKEY = 'AIzaSyD6VsQOvaQ0PGeLPAV4l7Ym1CbNtZmSZOQ';
const rootAPI = 'https://www.googleapis.com/youtube/v3/search';
const numResults = 10;

class YoutubeAPI extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      result:[],
      content: '',
    };

  }

  onTypedChange(contentValue){

    this.setState({
      content: contentValue
    });

    console.log(11, contentValue);

    let requestURL = `${rootAPI}?key=${apiKEY}&part=snippet,id&q=${this.state.content}&order=date&maxResults=${numResults}`;

    fetch(requestURL)
      .then((response) => response.json())
      .then((responseJson) => {
          const result = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
          console.log('Searched Videos: ', result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
         <p>videos... {this.state.content}</p>
      </div>
    );
  }
}

export default YoutubeAPI;
