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
			term: '',
			fireRedirect: false,
			labelInfo: '',
			nextPageToken: '',
			numPage: 1
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

		let requestURL;

		if(event.target.value !== "pagination"){

			requestURL = `${this.props.rootAPI}?key=${this.props.apiKEY}&part=snippet,id&q=${this.state.term}&order=date&maxResults=${this.props.numResults}`;
			
			this.setState({numPage: 1});

		} else {
			requestURL = `${this.props.rootAPI}?key=${this.props.apiKEY}&part=snippet,id&q=${this.state.term}&order=date&maxResults=${this.props.numResults}&pageToken=${this.state.nextPageToken}`;
			this.setState({
				results: [],
				numPage: this.state.numPage + 1
			});
		}

		fetch(requestURL)
		.then((response) => response.json())
		.then((responseJson) => {
			
			let result = responseJson.items.map((obj, index) => obj.id.videoId !== undefined ? <ListItem content={obj.id.videoId} key={index}/> : '');

			this.setState({
				results: result,
				fireRedirect: true,
				nextPageToken: responseJson.nextPageToken,
			});

			if(this.state.results.length > 0) {
				this.setState({
					labelInfo: `pagina ${this.state.numPage} : ${result.length} vídeo(s) sobre ${this.state.term} encontrados.`
				})
			} else {
				this.setState({
					labelInfo: 'Nenhum vídeo encontrado.'
				})
			}

		})
		.catch((error) => {
			console.error(error);

			this.setState({
				labelInfo: 'Ocorreu um erro inesperado, tente novamente ou volte mais tarde.'
			})

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
						<button type="submit">Search</button>
					</form>
					{fireRedirect && (<Redirect to={from || '/results'}/>	)}
				</div>

				<button onClick={this.submit} value="pagination">More results</button>

				<label>{this.state.labelInfo}</label>

				<div className="wrapper-search-results">
					<List list={this.state.results}/>
				</div>
			</div>
		);
	}
}

export default Search;
