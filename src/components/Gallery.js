import React, { Component } from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

function Gallery({data, title, isLoading}) {
    let photos;
		if (data.length > 0) {
			photos = data.map(photo => (
				<Photo
					url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
					key={photo.id}
				/>
			));
    } else {
      photos = <NotFound />
    }
		return (
			<div className='photo-container'>
				<h1> Images of {title}</h1>
				<ul>
					{photos}
					{/* Not Found */}
					{/*  */}
				</ul>
			</div>
		);
	}


export default Gallery;
