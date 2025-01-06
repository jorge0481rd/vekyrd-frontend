import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { apiSendContactUs } from '../api/api';
import ContactInfo from '../components/shared/contact-info';

const ContactUsPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    const formData = {
      name,
      email,
      message,
    };
    apiSendContactUs(formData);

    setSuccessMessage(
      '¡Gracias por contactarnos! Nos pondremos en contacto pronto.'
    );
    setEmail('');
    setName('');
    setMessage('');
  };

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '600px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Envíanos tu mensaje
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Si tienes alguna consulta, comentario o necesitas asistencia, no dudes
        en escribirnos. Estamos aquí para ayudarte.
      </Typography>
      <form onSubmit={handleSubmit}>
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
            onClick={handleSubmit}
          >
            Limpiar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!name || !email || !message}
          >
            Enviar
          </Button>
        </Box>
      </form>
      <ContactInfo />
    </Box>
  );
};

export default ContactUsPage;
