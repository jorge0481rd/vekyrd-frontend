import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { apiSendContactUs } from '../api/api';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ContactCard from '../components/shared/contactus/contact-card';

const ContactUsPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const [additionalDetails, setAdditionalDetails] = useState(''); // New state for additional contact details
  const [message, setMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    const formData = {
      name,
      email,
      phone,
      additionalDetails,
      message,
    };
    apiSendContactUs(formData);

    setSuccessMessage(
      '¡Gracias por contactarnos! Nos pondremos en contacto pronto.'
    );
    setEmail('');
    setName('');
    setPhone('');
    setAdditionalDetails('');
    setMessage('');
  };

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
          id="contact-info-cards"
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

        <Box
          id="contact-form"
          sx={{
            background: (theme) =>
              `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: { xs: 'translateY(0)', md: 'translateY(-100px)' },
            paddingTop: { xs: '2rem', md: '8rem' },
          }}
        >
          <form>
            <Typography variant="h4" gutterBottom textAlign={'center'} mb={4}>
              Envíanos tu mensaje
            </Typography>
            <TextField
              label="Nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Correo Electrónico"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Teléfono (opcional)"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Detalles Adicionales (opcional)"
              name="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Mensaje"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: 2 }}
            />
            {successMessage && (
              <Typography color="primary" sx={{ marginBottom: 2 }}>
                {successMessage}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                type="button" // Use "button" to prevent form submission
                variant="outlined"
                color="#ffffff"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setPhone('');
                  setAdditionalDetails('');
                  setMessage('');
                  setSuccessMessage('');
                }}
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="#ffffff"
                disabled={!name || !email || !message}
              >
                Enviar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Stack>
  );
};

export default ContactUsPage;
