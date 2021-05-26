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
	const [response, setResponse] = useState([]);
	const [search, setSearch] = useState('');
	const [nature, setNature] = useState([]);
	const [food, setFood] = useState([]);
	const [bears, setBears] = useState([]);

	// Fetch default images
	useEffect(() => {
		// Send GET request to API for default nature images
		setSearch('nature');
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"${search}"%22&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				setNature(res.data.photos.photo);
				setIsLoading(false);
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
	});

	return (
		<Router>
			<div className='container'>
				<SearchForm />
				<Nav />
				{isLoading ? (
					<h2>Loading...</h2>
				) : (
					<Switch>
						<Route key='nature' path='/nature'>
							<Gallery
								search={nature}
								title='Nature'
								isLoading={isLoading}
							/>
						</Route>
						<Route key='food' path='/food'>
							<Gallery
								search={food}
								title='Food'
								isLoading={isLoading}
							/>
						</Route>
						<Route key='bears' path='/bears'>
							<Gallery
								search={bears}
								title='Bears'
								isLoading={isLoading}
							/>
						</Route>
						<Route path='/search/:query'>
							<Gallery />
						</Route>
					</Switch>
				)}
			</div>
		</Router>
	);
}

export default App;
