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
      }}
    ></Box>
  );
};

const PictureCarrousel = ({ pictures = [] }) => {
  const [selectedImg, setSelectedImg] = useState('/img/products/shampoo1.jpg');

  const handleThumbnailClick = (img) => {
    setSelectedImg(img);
  };
  return (
    <Box
      id="picture-carrousel"
      sx={{
        flex: 1,
        minWidth: '300px',
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
        {pictures.map((url) => (
          <Thumbnail
            key={url}
            onClick={() => handleThumbnailClick(url)}
            imgUrl={url}
          />
        ))}
      </Box>
    </Box>
  );
};

PictureCarrousel.propTypes = {
  pictures: PropTypes.array,
};

Thumbnail.propTypes = {
  imgUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default PictureCarrousel;
