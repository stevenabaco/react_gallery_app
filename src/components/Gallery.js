import React, { Component } from 'react';
import Photo from './Photo';

class Gallery extends Component {
	render(props) {
		console.log(this.props.data);
		let photos;
		if (this.props.data.length > 0) {
			photos = this.props.data.map(photo => (
				<Photo
					url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
					key={photo.id}
				/>
			));
		}
		return (
			<div className='photo-container'>
				<h1> Images of {this.props.title}</h1>
				<ul>
					{photos}
					{/* Not Found */}
					{/* <li className='not-found'>
							<h3>No Results Found</h3>
							<p>You search did not return any results. Please try again.</p>
						</li> */}
				</ul>
			</div>
		);
	}
}

export default Gallery;
