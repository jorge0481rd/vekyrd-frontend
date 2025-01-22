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
import { apiFetchOneUser, apiCreateCreditCard, apiUpdateUserProfile, apiRemoveCreditCard, apiGetCreditCard } from '../../api/api';
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

  const [editingCreditcard, setEditingCreditcard] = useState(false);
  const [hasCreditcard, setHasCreditcard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardAddress, setCardAddress] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const getOneUser = async () => {
    try {
      const userData = await apiFetchOneUser();
      setUsername(userData.username || '');
      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');
      setPhoneNumber(userData.phone_number || '');
      setAddress(userData.address || '');

      const creditCardData = await apiGetCreditCard();

      if (creditCardData) {
        setHasCreditcard(true);
        const monthNumber = getFromDate(creditCardData.expiration_date).m;
        const yearNumber = getFromDate(creditCardData.expiration_date).y;
        const expirationDate = `${monthNumber}/${yearNumber}`;
        setCardNumber(creditCardData.card_number || '');
        setExpirationDate(expirationDate || '');
        setCvv(creditCardData.cvv || '');
      }


      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setErrorMessage('Fallo al cargar el perfil.');
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

  const createCreditCard = async ({
    cardNumber,
    expirationDate,
    cvv,
    cardholderName
  }) => {
    // add firt month to the expiration date
    const month = expirationDate.split('/')[0];
    const year = expirationDate.split('/')[1];
    const newExpirationDate = `${year}-${month}-01T00:00:00Z`;
    console.log({ expirationDate, month, year, newExpirationDate });

    if (
      !isCardNumberValid(cardNumber) ||
      !isExpirationDateValid(expirationDate)
    ) {
      setErrorMessage(
        'No se pudo guardar el Número de tarjeta o fecha de expiración por ser no válidos.'
      );
    }

    try {
      await apiCreateCreditCard({
        card_number: cardNumber,
        expiration_date: newExpirationDate,
        cvv: cvv,
        cardholder_name: cardholderName
      });
      setHasCreditcard(true);
      setEditingCreditcard(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Fallo al guardar la tarjeta de crédito.');
      setSuccessMessage('');
    }
  };

  const removeCreditCard = async () => {
    try {
      await apiRemoveCreditCard();
      setHasCreditcard(false);
      setEditingCreditcard(false);
      setCardNumber('');
      setExpirationDate('');
      setCvv('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Fallo al eliminar la tarjeta de crédito.');
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
              background: 'white',
              color: 'black',
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
                  border: 'double 1px #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <Typography variant="h6">Tarjeta de crédito</Typography>

                {/* if user has credit card, show card number and expiration date and buttons to edit or delete */}
                {hasCreditcard && !editingCreditcard && (<>
                  <Typography
                    variant="caption"
                    textAlign="left"
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                  >
                    Número: {cardNumber}
                  </Typography>
                  <Typography
                    variant="caption"
                    textAlign="left"
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                  >
                    Fecha de expiración: {expirationDate}
                  </Typography>
                  <Typography
                    variant="caption"
                    textAlign="left"
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                  >
                    CVV: {cvv}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginTop: 2, background: 'red' }}
                      onClick={() => removeCreditCard()}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginTop: 2 }}
                      onClick={() => setEditingCreditcard(true)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginTop: 2 }}
                      onClick={() => apiGetCreditCard()}
                    >
                      Actualizar
                    </Button>
                  </Box>
                </>)}
                {/* create/update credit card form  */}
                {!hasCreditcard && <>
                  <Typography
                    variant="caption"
                    textAlign="left"
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                  >
                    No tienes tarjeta de crédito
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => setEditingCreditcard(true)}
                  >
                    Agregar tarjeta de crédito
                  </Button>
                </>}

                {editingCreditcard && (<>
                  <TextField
                    label={<LabelBg>Direccion</LabelBg>}
                    variant="outlined"
                    fullWidth
                    onChange={e => setCardAddress(e.target.value)}
                    value={cardAddress}
                  />

                  <InputMask
                    mask="9999 9999 9999 9999"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/[^0-9]/g, ''))
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
                  {/* for the year, it will always start with 20 and the user will only be able to input the last 2 digits */}
                  <InputMask
                    mask="99/9999"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                  >
                    {() => (
                      <TextField
                        label={<LabelBg>Fecha de Expiración</LabelBg>}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </InputMask>
                  <TextField
                    label={<LabelBg>CVV</LabelBg>}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2, background: 'red' }}
                      onClick={() => setEditingCreditcard(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => createCreditCard({
                        cardNumber,
                        expirationDate,
                        cvv,
                        cardholderName: `${firstName} ${lastName}`
                      })}
                      disabled={!isCardNumberValid(cardNumber) || !isExpirationDateValid(expirationDate)}
                    >
                      Guardar tarjeta
                    </Button>
                  </Box>
                </>)}
              </Box>

              {!editingCreditcard && <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "4rem" }}
                onClick={handleSubmit}
              >
                Guardar cambios
              </Button>}
            </Box>
          </Box>
        )}
      </Stack>
    </PageContainer>
  );
};

export default UserProfilePage;
