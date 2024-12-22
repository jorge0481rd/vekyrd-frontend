import GradeIcon from '@mui/icons-material/Grade';
import { Box } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const RatingStarsSelector = ({ initialValue, disableSelection = false }) => {
  const [rating, setRating] = useState(initialValue);

  const handleClick = (value) => {
    if (disableSelection) return;
    setRating(value);
  };

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

  return <Box sx={{ display: 'flex' }}>{getStars()}</Box>;
};

RatingStarsSelector.propTypes = {
  initialValue: PropTypes.number,
  disableSelection: PropTypes.bool,
};

export default RatingStarsSelector;
