// Import packages
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Import Config and CSS files
import apiKey from './config';
import './App.css';

// Import Components
import SearchForm from './components/SearchForm.js';
import Nav from './components/Nav';
import Gallery from './components/Gallery';

class App extends Component {
	constructor() {
		super();
		this.state = {
			nature: [],
			food: [],
			mountains: [],
			photos: [],
			loading: true, // Add state loading indicator for exceeds
			tag: null,
		};
	}
	// Call function to search for default pictures
	componentDidMount() {
		this.performSearch('nature');
		this.performSearch('food');
		this.performSearch('mountains');
	}
	// Create function with logic to query Flickr API
	performSearch = query => {
		axios
			// Send GET request to API to fetch data
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"${query}"%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(response => {
				// handle success conditionally to update state properly
				if (query === 'nature') {
					this.setState({
						nature: response.data.photos.photo,
						tag: query,
						loading: false,
					});
				} else if (query === 'food') {
					this.setState({
						food: response.data.photos.photo,
						tag: query,
						loading: false,
					});
				} else if (query === 'mountains') {
					this.setState({
						mountains: response.data.photos.photo,
						tag: query,
						loading: false,
					});
				}
			})
			.catch(error => {
				// handle error
				console.log('Error fetching and parsing data', error);
			})
			.then(function () {
				// always executed if cleanup needed
			});
	};

	render() {
		return (
			<Router>
				<div className='container'>
					<SearchForm />
					<Nav />
				</div>
				<Switch>
					<Route path='/nature'>
						<Gallery
							data={this.state.nature}
							title='Nature'
							isLoading={this.state.isLoading}
						/>
					</Route>
					<Route path='/food'>
						<Gallery
							data={this.state.food}
							title='Food'
							isLoading={this.state.isLoading}
						/>
					</Route>
					<Route path='/mountains'>
						<Gallery
							data={this.state.mountains}
							title='Mountains'
							isLoading={this.state.isLoading}
						/>
					</Route>
					<Route path='/search/:query'>
						<Gallery />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
