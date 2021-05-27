// Import packages
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import axios from 'axios';

// Import Config and CSS files
import apiKey from './config';
import './App.css';

// Import Components
import SearchForm from './components/SearchForm.js';
import Nav from './components/Nav';
import Gallery from './components/Gallery';

function App(props) {
	// Declare hooks for state
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [query, setQuery] = useState('');
	const [nature, setNature] = useState([]);
	const [food, setFood] = useState([]);
	const [bears, setBears] = useState([]);

	// Fetch default images
	useEffect(() => {
		// Send GET request to API for default "nature" images
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"nature"%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				setNature(res.data.photos.photo);
				setIsLoading(false);
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
	}, []);

	useEffect(() => {
		// Send GET request to API for default "food" images
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"food"%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				setFood(res.data.photos.photo);
				setIsLoading(false);
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
	}, []);

	useEffect(() => {
		// Send GET request to API for default "Bears" images
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"bears"%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				setBears(res.data.photos.photo);
				setIsLoading(false);
			})
			.catch(err => {
				console.log('Error fetching and parsing data', err);
			});
	}, []);

	function handleSearch(queryString) {
		//Handler for user Search input field
		setIsLoading(true);
		setQuery(queryString);
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${queryString}%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				setData(res.data.photos.photo);
				setIsLoading(false);
			})
			.catch(err => console.log('Error fetching and parsing data', err));
	}

	return (
		<Router>
			<div className='container'>
				<SearchForm handler={handleSearch} />
				<Nav />
				{isLoading ? (
					<h2>Loading...</h2>
				) : (
					<Switch>
						<Route path='/nature'>
							<Gallery data={nature} title='Nature' isLoading={isLoading} />
						</Route>
						<Route path='/food'>
							<Gallery data={food} title='Food' isLoading={isLoading} />
						</Route>
						<Route path='/bears'>
							<Gallery data={bears} title='Bears' isLoading={isLoading} />
						</Route>
						<Route exact path='/search/:query'>
							<Gallery data={data} handler={handleSearch} query={query} isLoading={isLoading} />
						</Route>
						<Route exact path='/'>
							<Redirect to='/nature' />
						</Route>
						<Route>
                <h1 style={{ color: 'red' }}>Something went wrong. Please try again!</h1>
						</Route>
					</Switch>
				)}
			</div>
		</Router>
	);
}

export default App;
