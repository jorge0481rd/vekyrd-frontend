import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

const useDeviceType = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return { isMobile, isTablet, isDesktop };
};

export default useDeviceType;
