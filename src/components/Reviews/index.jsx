import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { fetchReviews } from '../../helpers/reviewsHelpers';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { useAppContext } from '../../context/AppContext';

const Reviews = ({ productId = 3 }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReviewCount, setnewReviewCount] = useState(0);
  const { getUsername } = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    const getReviews = async () => {
      try {
        const data = await fetchReviews(productId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [productId, newReviewCount]);

  const alreadyReviewed = reviews.some(
    (review) => review.username === getUsername()
  );

  return (
    <Box sx={{ margin: '3rem auto', background: '#f4f4f4', padding: 2 }}>
      <Box
        className="reviews-divider"
        sx={{ borderTop: '2px dashed lightgray', margin: 2, width: '100%' }}
      />
      <Typography variant="h4" textAlign={'center'}>
        Reseñas
      </Typography>

      <Box
        id="reviews-container"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          margin: 3,
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </Box>

      <Box
        className="reviews-divider"
        sx={{ borderTop: '2px dashed lightgray', margin: 4, width: '100%' }}
      />

      <ReviewForm
        productId={productId}
        alreadyReviewed={alreadyReviewed}
        username={getUsername()}
        setnewReviewCount={setnewReviewCount}
      />
    </Box>
  );
};

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Reviews;
