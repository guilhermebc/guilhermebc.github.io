import React, { Component } from 'react';
import { Redirect } from 'react-router'

import './Search.css';

import List from '../List/List';
import ListItem from '../ListItem/ListItem';

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			results: [],
			numPage: 1,
			term: '',
			labelInfo: '',
			nextPageToken: '',
			prevPageToken: '',
			reactRedirect: false,
			showResults: false
		};
		
		this.onInputChange = this.onInputChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	onInputChange(event){
		this.setState({
			term: event.target.value,
		});
	}

	submit(event){

		event.preventDefault();

		let requestURL = `${this.props.rootAPI}?key=${this.props.apiKEY}&part=snippet,id&q=${this.state.term.trim()}&order=date&type=video&maxResults=${this.props.numResults}`;

		//Check is submit pagination
		switch(event.target.value) {
			case 'next-page':
				requestURL = requestURL + `&pageToken=${this.state.nextPageToken}`;
				this.setState({
					results: [],
					numPage: this.state.numPage + 1
				});
				break;
			case 'prev-page':
				requestURL = requestURL + `&pageToken=${this.state.prevPageToken}`;
				this.setState({
					results: [],
					numPage: this.state.numPage - 1
				});
				break;
			default:
				this.setState({
					numPage: 1,
					showResults: false
				});
				break;
		}

		//Fetch videos
		if(this.state.term.trim()){
			fetch(requestURL)
			.then((response) => response.json())
			.then((responseJson) => {
				
				let result = responseJson.items.map((obj, index) => obj.id.videoId !== undefined ? <ListItem title={obj.snippet.title} content={obj.id.videoId} key={index}/> : '');
	
				this.setState({
					results: result,
					nextPageToken: responseJson.nextPageToken,
					prevPageToken: responseJson.prevPageToken,
					reactRedirect: true,
					showResults: true	
				});
	
				if(this.state.results.length > 0) {
					this.setState({
						labelInfo: `Page ${this.state.numPage}: ${result.length} video(s) about ${this.state.term} found.`
					});
				} else {
					this.setState({
						labelInfo: 'Videos not found.',
						showResults: false
					});
				}
			})
			.catch((error) => {
				console.error(error);
	
				this.setState({
					labelInfo: 'An unexpected error occurred, please try again, or check back later.'
				});
			});
		}

	}

	render() {

		const { from } = this.props.location || '/';
		const { reactRedirect } = this.state.reactRedirect;
		
		return (
			<div>
				<div className="wrapper-search-bar">
					<form onSubmit={this.submit}>
						<input 
							type="text" 
							name="search-bar" id="search_bar" 
							value={this.state.term}
							onChange={this.onInputChange}
							placeholder="What do you want to watch?"
							autoFocus
						/>
						<button type="submit" className="btn">Search</button>
					</form>
					{reactRedirect && (<Redirect to={from || '/results'}/>	)}
				</div>
				
				<p className="label-info">{this.state.labelInfo}</p>

				<div className="wrapper-search-results">
					<List list={this.state.results}/>
				</div>

				<p className="label-info">{this.state.labelInfo}</p>

				<div className="wrapper-button">
					{ this.state.showResults && this.state.numPage > 1 ? <button className="btn btn-small" onClick={this.submit} value="prev-page">Previous</button> : null }
					{ this.state.showResults ? <button className="btn btn-small" onClick={this.submit} value="next-page">Next</button> : null }
				</div>
				
			</div>
		);
	}
}

export default Search;
