// Import packages
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
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
      loading: true,
      tag: null
		};
	}

	componentDidMount() {
    this.performSearch('nature');
    this.performSearch('food');
    this.performSearch('mountains');
	}
  performSearch = (query) => {
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"${query}"%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(response => {
				// handle success
        if (query === 'nature') {
          this.setState({
            nature: response.data.photos.photo,
            tag: query
          })
        } else if (query === 'food') {
          this.setState({
            food: response.data.photos.photo,
            tag: query
          })
        } else if (query === 'mountains') {
          this.setState(({
            mountains: response.data.photos.photo,
            tag: query
          }))
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
						<Gallery data={this.state.nature} title='Nature' />
					</Route>
					<Route path='/food'>
						<Gallery data={this.state.food} title='Food'/>
					</Route>
					<Route path='/mountains'>
						<Gallery data={this.state.mountains} title='Mountains' />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
