import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import GalleryItem from './GalleryItem';

function Gallery({ handler, data, query, title, isLoading }) {
	// Get URL query parameter
	let queryString = useParams().query;
	// Check if URL query matches

	useEffect(() => {
		if (queryString !== query) {
			handler(queryString);
		}
	});
	return (
		<div className='photo-container'>
			<h1>
				{' '}
				Images of <span>{queryString || title}</span>
			</h1>
			<ul>
				{data.length > 0 && !isLoading ? (
					data.map(image => <GalleryItem image={image} key={image.id} />)
				) : (
					<NotFound />
				)}
			</ul>
		</div>
	);
}

export default Gallery;
