import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ContactInfo = () => {
  return (
    <Box
      sx={{ marginTop: 4, textAlign: 'center', fontSize: '0.8rem', flex: 1 }}
    >
      <Typography variant="body1" fontWeight={700} gutterBottom>
        Dirección
      </Typography>
      <Typography variant="body1">
        C/Duarte #45, Miraflores, Santo Domingo Este
      </Typography>
      <Typography variant="body1" fontWeight={700} gutterBottom>
        Tel./ Whatsapp
      </Typography>
      <Typography variant="body1">809-803-4040</Typography>
      <Typography variant="body1" fontWeight={700} gutterBottom>
        Email
      </Typography>
      <Typography variant="body1">
        <Link href="mailto:info@vekyrd.com">info@vekyrd.com</Link>
      </Typography>
    </Box>
  );
};

export default ContactInfo;
