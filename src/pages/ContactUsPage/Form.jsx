import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { apiSendContactUs } from '../../api/api';


const Form = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
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
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            Nombre
                        </Typography>
                    }
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            Correo Electrónico
                        </Typography>
                    }
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            Teléfono (opcional)
                        </Typography>
                    }
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            Detalles Adicionales (opcional)
                        </Typography>
                    }
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
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            Mensaje
                        </Typography>
                    }
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
                        onClick={() =>
                            handleSubmit(name, email, phone, additionalDetails, message)
                        }
                    >
                        Enviar
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default Form