import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className='main-nav'>
			<ul>
				<li>
					<NavLink to='/nature'>Nature</NavLink>
				</li>
				<li>
					<NavLink to='/food'>Food</NavLink>
				</li>
				<li>
					<NavLink to='/bears'>Bears</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
