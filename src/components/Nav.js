import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav() {
	return (
		<nav class='main-nav'>
			<ul>
				<li>
					<NavLink to='/cars'>Cars</NavLink>
				</li>
				<li>
					<NavLink to='/food'>Food</NavLink>
				</li>
				<li>
					<NavLink to='/mountains'>Mountains</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
