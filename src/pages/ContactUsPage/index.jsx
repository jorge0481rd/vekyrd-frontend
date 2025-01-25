import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Stack, Typography } from '@mui/material';
import ContactCard from '../../components/shared/contactus/contact-card';
import Form from './Form';

const ContactUsPage = () => {
  return (
    <Stack>
      <Box
        id="contactus-container"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h3" gutterBottom>
          Contáctanos
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Si tienes alguna consulta, comentario o necesitas asistencia, no dudes
          en escribirnos. Estamos aquí para ayudarte.
        </Typography>
        <Box
          className="contact-info-cards"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            margin: '2rem',
            zIndex: 1,
          }}
        >
          <ContactCard Icon={LocalPhoneIcon} title="Teléfono">
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <WhatsAppIcon /> 809-802-5668
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <WhatsAppIcon /> 809-688-4040
            </Typography>
          </ContactCard>
          <ContactCard Icon={LocationOnIcon} title="email">
            <Typography variant="body1" textAlign={'center'}>
              Calle J #4, Matahambre, La Feria III, Santo Domingo, D. N., Rep.
              Dom.
            </Typography>
          </ContactCard>
          <ContactCard Icon={EmailIcon} title="email">
            <Typography variant="body1">
              <a href="mailto:info@vekyrd.com">info@vekyrd.com</a>
            </Typography>
          </ContactCard>
        </Box>

        <Form />

        <Box
          className="contact-info-cards"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            zIndex: 1,
            margin: '2rem 0',
          }}
        >
          <ContactCard Icon={InstagramIcon} title="Instagram">
            <Typography variant="body1">
              <a href="https://www.instagram.com/vekyrd/?hl=es">
                Visítanos en Instagram
              </a>
            </Typography>
          </ContactCard>
          <ContactCard Icon={FacebookIcon} title="Facebook">
            <Typography variant="body1">
              <a href="https://www.facebook.com/profile.php?id=100064147778470">
                Visítanos en Facebook
              </a>
            </Typography>
          </ContactCard>
        </Box>
      </Box>
    </Stack>
  );
};

export default ContactUsPage;
