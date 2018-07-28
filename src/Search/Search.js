import React, { Component } from 'react';
import { Redirect } from 'react-router'

import './Search.css';

import List from '../List/List';
import ListItem from '../ListItem/ListItem';

const apiKEY = 'AIzaSyD6VsQOvaQ0PGeLPAV4l7Ym1CbNtZmSZOQ';
const rootAPI = 'https://www.googleapis.com/youtube/v3/search';
const numResults = 10;

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			results: [],
			term: '',
			fireRedirect: false,
			labelInfo: ''
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

		event.preventDefault()

		let requestURL = `${rootAPI}?key=${apiKEY}&part=snippet,id&q=${this.state.term}&order=date&maxResults=${numResults}`;

		fetch(requestURL)
		.then((response) => response.json())
		.then((responseJson) => {
			
			let result = responseJson.items.map((obj, index) => <ListItem content={obj.id.videoId} key={index} />);

			this.setState({
				results: result,
				fireRedirect: true
			});

			if(this.state.results.length > 0) {
				this.setState({
					labelInfo: result.length + ` vídeo(s) sobre ${this.state.term} encontrados.`
				})
			} else {
				this.setState({
					labelInfo: 'Nenhum vídeo encontrado.'
				})
			}
			
			console.log(this.state.results);

		})
		.catch((error) => {
			console.error(error);

		});

	}

	render() {

		const { from } = this.props.location || '/';
		const { fireRedirect } = this.state.fireRedirect;
		
		return (
			<div>

				<div className="wrapper-search-bar">
					<form onSubmit={this.submit}>
						<label htmlFor="search_bar">Type something...</label>
						<input 
							type="text" 
							name="search-bar" id="search_bar" 
							value={this.state.term}
							onChange={this.onInputChange}
							autoFocus
						/>
						<button type="submit" >Search</button>
					</form>
					{fireRedirect && (<Redirect to={from || '/results'}/>	)}
				</div>

				<label>{this.state.labelInfo}</label>

				<div className="wrapper-search-results">
					<List list={this.state.results}/>
				</div>
			</div>
		);
	}
}

export default Search;
