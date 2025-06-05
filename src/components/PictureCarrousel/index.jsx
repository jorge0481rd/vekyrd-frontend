import { Box } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Thumbnail = ({ imgUrl, ...props }) => {
	return (
		<Box
			className="pc-thumbnail"
			onClick={props.onClick}
			sx={{
				width: '100px',
				height: '100px',
				backgroundImage: `url(${imgUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				borderRadius: '8px',
				cursor: 'pointer',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
				transition: 'all 0.05s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1) rotate(3deg)'
				},
			}}
		></Box>
	);
};

const PictureCarrousel = ({ pictures = [] }) => {
	const [selectedImg, setSelectedImg] = useState(pictures[0] || '');

	const handleThumbnailClick = (img) => {
		setSelectedImg(img);
	};

	if (!pictures.length) {
		return <Box>No hay imágenes para mostrar</Box>;
	}

	return (
		<Box
			id="picture-carrousel"
			sx={{
				flex: 1,
				minWidth: '300px',
				minHeight: '510px',
				position: 'relative',
				backgroundColor: 'gray',
				backgroundImage: `url(${selectedImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				borderRadius: '8px',
				overflow: 'hidden',
				outline: 'solid 1px rgba(0, 0, 0, 0.1)',
			}}
		>
			<Box
				id="pc-thumbnails"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					position: 'absolute',
					bottom: '1rem',
					right: '1rem',
				}}
			>
				{pictures.map((url, index) => (
					<Thumbnail
						role="button"
						aria-label="Select product image"
						key={url + index}
						onClick={() => handleThumbnailClick(url)}
						imgUrl={url}
					/>
				))}
			</Box>
		</Box>
	);
};

PictureCarrousel.propTypes = {
	pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Thumbnail.propTypes = {
	imgUrl: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default PictureCarrousel;
