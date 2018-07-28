import React, { Component } from 'react';
import './Search.css';
import YoutubeAPI from '../YoutubeAPI/YoutubeAPI';

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			term: '',
		};
	}

	onInputChange(termValue){
		this.setState({
			term: termValue,
		});
	}

	render() {
		return (
			<div className="wrapper-search-bar">
				<label htmlFor="search_bar">Type something...</label>

				<input type="text" 
				name="search-bar" id="search_bar" 
				value={this.state.term}
				onChange={event => this.onInputChange(event.target.value)}
				autoFocus/>

				<YoutubeAPI   query={this.state.term}/>
			</div>
		);
	}
}

export default Search;
