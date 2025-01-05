import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { apiDeleteComment, apiSetCommentAsRead } from '../../../api/api';

const MessageDetails = ({ msg, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleRead = () => {
    apiSetCommentAsRead(msg.id);
    handleClose();
  };

  const handleDelete = () => {
    apiDeleteComment(msg.id);
    handleClose();
  };

  if (!msg) return null;

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        left: '50%',
        maxWidth: '600px',
        opacity: open ? 1 : 0,
        padding: '20px',
        position: 'absolute',
        top: '100px',
        transform: `translate(-50%, ${open ? 0 : '20%'})`,
        transition: 'all 0.3s ease-in-out',
        width: '80%',
        maxHeight: '80%',
        overflow: 'auto',
        outline: 'solid 1px #ccc',
        zIndex: 10,
      }}
    >
      <Typography variant="body1" fontWeight="bold">
        Nombre:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        {msg.name}
      </Typography>

      <Typography variant="body1" fontWeight="bold">
        Email:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        {msg.email}
      </Typography>

      <Typography variant="body1" fontWeight="bold">
        Mensaje
      </Typography>
      <Typography variant="body1dy1" sx={{ marginBottom: '2rem' }}>
        {msg.message}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          margin: '2rem',
        }}
      >
        <Button
          variant="contained"
          sx={{ background: 'red' }}
          onClick={handleDelete}
        >
          Borrar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRead}>
          Marcar como leído
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};

MessageDetails.propTypes = {
  msg: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default MessageDetails;
