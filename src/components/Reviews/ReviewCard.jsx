import { Typography, Card, CardContent } from '@mui/material';

import GradeIcon from '@mui/icons-material/Grade';
import PropTypes from 'prop-types';

const ReviewCard = ({ review }) => {
  const { username, rating, comment, created_at } = review;

  const getStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<GradeIcon key={i} sx={{ color: '#ddbc0a' }} />);
      } else {
        stars.push(<GradeIcon key={i} sx={{ color: '#dedede' }} />);
      }
    }
    return stars;
  };

  return (
    <Card
      sx={{ width: '100%', maxWidth: '400px', margin: 1, position: 'relative' }}
    >
      <CardContent>
        <Typography variant="h6" mb={1}>
          {username}
        </Typography>
        {getStars()}
        <Typography variant="body2">{comment}</Typography>
        <Typography
          variant="body2"
          color="gray"
          sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          {new Date(created_at).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
