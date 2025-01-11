import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import NavigationButton from '../../components/navigation-button';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  CircularProgress,
} from '@mui/material';
import { apiFetchOneUser, apiUpdateUserProfile } from '../../api/api';
import LabelBg from '../../components/shared/LabelWithBg';
import { getFromDate } from '../../utils/getFromDate';
import InputMask from 'react-input-mask';
import { isCardNumberValid, isExpirationDateValid } from './card-validation';

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const getOneUser = async () => {
    try {
      const data = await apiFetchOneUser();

      const monthNumber = getFromDate(data.expiration_date).m;
      const yearNumber = getFromDate(data.expiration_date).y;
      const expirationDate = `${monthNumber}/${yearNumber}`;

      setUsername(data.username || '');
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
      setCardNumber(data.card_number || '');
      setExpirationDate(expirationDate || '');
      setCvv(data.cvv || '');
      setPhoneNumber(data.phone_number || '');
      setAddress(data.address || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setErrorMessage('Failed to load profile.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const handleSubmit = async () => {
    // add firt month to the expiration date
    const month = expirationDate.split('/')[0];
    const year = expirationDate.split('/')[1];
    const newExpirationDate = `${year}-${month}-01T00:00:00Z`;

    if (
      !isCardNumberValid(newCardNumber) ||
      !isExpirationDateValid(expirationDate)
    ) {
      setErrorMessage(
        'No se pudo guardar el Número de tarjeta o fecha de expiración por ser no válidos.'
      );
    }
    const saveCardNumber =
      isCardNumberValid(newCardNumber) && isExpirationDateValid(expirationDate);

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      cvv: cvv,
      ...(saveCardNumber && {
        card_number: newCardNumber,
        expiration_date: newExpirationDate,
      }),
    };

    try {
      await apiUpdateUserProfile(updatedData);
      setSuccessMessage('Perfil actualizado correctamente.');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile.');
      setSuccessMessage('');
    }
  };

  return (
    <PageContainer>
      <PageHeader title={username}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <NavigationButton href="/products" text="Productos ►" />
        </Box>
      </PageHeader>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              background: (theme) =>
                `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '600px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Información de Perfil
            </Typography>

            {errorMessage && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success" sx={{ marginBottom: 2 }}>
                {successMessage}
              </Typography>
            )}

            {/* profile form  */}
            <Box>
              <TextField
                label={<LabelBg>Usuario</LabelBg>}
                disabled
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label={<LabelBg>Nombre</LabelBg>}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label={<LabelBg>Apellido</LabelBg>}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <InputMask
                mask="(999) 999-9999"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))
                }
              >
                {() => (
                  <TextField
                    label={<LabelBg>Teléfono</LabelBg>}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                )}
              </InputMask>
              <TextField
                label={<LabelBg>Dirección</LabelBg>}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 8 }}
              />

              <Box
                id="card-number-box"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6">Tarjeta de crédito</Typography>
                <Typography
                  variant="caption"
                  textAlign="left"
                  sx={{ width: '100%' }}
                >
                  Número actual: {cardNumber}
                </Typography>
                <InputMask
                  mask="9999 9999 9999 9999"
                  value={newCardNumber}
                  onChange={(e) =>
                    setNewCardNumber(e.target.value.replace(/[^0-9]/g, ''))
                  }
                >
                  {() => (
                    <TextField
                      label={<LabelBg>Número de tarjeta</LabelBg>}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </InputMask>
                <TextField
                  label={<LabelBg>Fecha de Expiración</LabelBg>}
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label={<LabelBg>CVV</LabelBg>}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleSubmit}
              >
                Guardar cambios
              </Button>
            </Box>
          </Box>
        )}
      </Stack>
    </PageContainer>
  );
};

export default UserProfilePage;
