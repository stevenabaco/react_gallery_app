// Import packages
import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

// Import Config and CSS files
import apiKey from './config';
import './App.css';

// Import Components
import SearchForm from './components/SearchForm.js';
import Nav from './components/Nav';
import Gallery from './components/Gallery';

function App() {
  return (
    <Router>
      <div class="container">
        <SearchForm />
        <Nav/>
      </div>
    </Router>
  );
}

export default App;
