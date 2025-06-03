import GradeIcon from '@mui/icons-material/Grade';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const RatingStarsSelector = ({
	initialValue,
	disableSelection = false,
	setSelectedRating,
}) => {
	const [rating, setRating] = useState(initialValue);

	const handleClick = (value) => {
		if (disableSelection) return;
		setRating(value);
	};

	useEffect(() => {
		setSelectedRating && setSelectedRating(rating);
	}, [rating, setSelectedRating]);

	const getStars = () => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			stars.push(
				<GradeIcon
					key={i}
					sx={{
						color: rating >= i + 1 ? '#ddbc0a' : '#dedede',
						cursor: !disableSelection && 'pointer',
						transform: 'scale(1)',
						transition: 'all 0.3s ease-in-out',
						'&:hover': !disableSelection && {
							color: '#dfb0ef',
							transform: 'scale(1.2) rotate(-9deg)',
						},
					}}
					onClick={() => handleClick(i + 1)}
				/>
			);
		}
		return stars;
	};

	return <Box sx={{ display: 'flex', marginBottom: '1rem' }}>{getStars()}</Box>;
};

RatingStarsSelector.propTypes = {
	initialValue: PropTypes.number,
	disableSelection: PropTypes.bool,
	setSelectedRating: PropTypes.func,
};

export default RatingStarsSelector;
