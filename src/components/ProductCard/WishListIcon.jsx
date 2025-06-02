import { Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../helpers/productHelpers';

const WishListIcon = ({ product, top = "1rem", right = "1rem", left = null, bottom = null }) => {
  const [liked, setLiked] = useState(product.isInWishlist);

  const handleClick = async () => {
    const item = localStorage.getItem('wishlist');
    const wishlist = item ? item.split(',') : [];
    const thisProduct = wishlist.find((id) => parseInt(id) === product.id);

    if (thisProduct !== undefined) {
      // send delete request to API
      await removeFromWishlist(product.id);
      const newWishlist = wishlist.filter((id) => parseInt(id) !== product.id);
      localStorage.setItem('wishlist', newWishlist);
    } else {
      // send post request to API
      await addToWishlist(product.id);
      wishlist.push(product.id);
      localStorage.setItem('wishlist', wishlist);
    }

    setLiked(!liked);
  };

  return (
    <Box
      onClick={() => handleClick(product)}
      sx={{
        position: 'absolute',
        ...(top && { top }),
        ...(right && { right }),
        ...(left && { left }),
        ...(bottom && { bottom }),
        outline: 'solid 1px rgba(0, 0, 0, 0)',
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      <FavoriteIcon
        sx={{
          transition: 'all 0.3s ease-in-out',
          position: 'absolute',
          opacity: liked ? 1 : 0,
          color: 'red',
          transform: liked ? 'scale(1.3) rotate(0)' : 'scale(1) rotate(8deg)',
        }}
      />
      <FavoriteBorderIcon
        sx={{
          transition: 'all 0.3s ease-in-out',
          opacity: liked ? 0 : 1,
          transform: liked ? 'scale(1.6) rotate(0)' : 'scale(1) rotate(8deg)',
          position: 'absolute',
          color: '#cccccc',
        }}
      />
    </Box>
  );
};

WishListIcon.propTypes = {
  product: PropTypes.object.isRequired,
  top: PropTypes.string,
  right: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
};

export default WishListIcon;
