import { Box } from '@mui/material';
import OfferFiftyPercentOff from '../../components/offers/15-percent-off';
import OfferCrecimiento from '../../components/offers/crecimiento';

const CurrentOffers = () => {
  return (
    <Box
      sx={{
        marginBottom: 6,
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        overflow: 'hidden',
        gap: 3,
        alignItems: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <OfferFiftyPercentOff />
      <OfferCrecimiento />
    </Box>
  );
};

export default CurrentOffers;
