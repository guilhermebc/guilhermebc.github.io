import React, { Component } from 'react';

import List from '../List/List';
import ListItem from '../ListItem/ListItem';

const apiKEY = 'AIzaSyD6VsQOvaQ0PGeLPAV4l7Ym1CbNtZmSZOQ';
const rootAPI = 'https://www.googleapis.com/youtube/v3/search';
const numResults = 10;

class YoutubeAPI extends Component {

  constructor(props){
    super(props);

    this.state = {
      results: []
    }
  }

  onTypedClick(){

    let requestURL = `${rootAPI}?key=${apiKEY}&part=snippet,id&q=${this.props.query}&order=date&maxResults=${numResults}`;

    fetch(requestURL)
      .then((response) => response.json())
      .then((responseJson) => {
          
          let result = responseJson.items.map((obj, index) => <ListItem content={"https://www.youtube.com/embed/"+obj.id.videoId} key={index} />);

          this.setState({
            results: result
          });

          console.log(this.state.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
          <button type="submit" onClick={this.onTypedClick.bind(this)}>Search</button>
          <List list={this.state.results}/>
      </div>
    );
  }
}

export default YoutubeAPI;
