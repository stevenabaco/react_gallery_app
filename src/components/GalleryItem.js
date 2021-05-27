import React from 'react';

function GalleryItem({ image }) {
	return (
		<li key={image.id}>
			<img
				src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`}
				alt={`${image.title}`}
			/>
		</li>
	);
}

export default GalleryItem;
