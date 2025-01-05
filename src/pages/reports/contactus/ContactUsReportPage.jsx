import { useEffect, useState } from 'react';
import { apiFetchContactUsReport } from '../../../api/api';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import MessageDetails from './MessageDetails';
import { Button, Chip, Typography } from '@mui/material';
import CustomAgGrid from '../shared/CustomAgGrid';
import PropTypes from 'prop-types';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const VerButtonRenderer = (props) => {
    const handleClick = () => {
      setSelectedMessage(props.data);
      setOpen(true);
    };

    return (
      <Button size="small" variant="contained" onClick={handleClick}>
        Ver
      </Button>
    );
  };

  VerButtonRenderer.propTypes = {
    data: PropTypes.object.isRequired,
  };

  const [columnDefsContactUs] = useState([
    { headerName: 'Id', field: 'id', sortable: true, filter: true },
    { headerName: 'Fecha', field: 'created_at', sortable: true, filter: true },
    { headerName: 'Nombre', field: 'name', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Mensaje', field: 'message', sortable: true, filter: true },
    {
      headerName: 'Leído',
      field: 'read',
      cellRenderer: (params) => {
        const read = params.data.read;
        return (
          <Chip
            size="small"
            label={read ? 'Leído' : 'No leído'}
            color={read ? 'success' : 'default'}
          />
        );
      },
      cellStyle: {
        textAlign: 'center',
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Acciones',
      field: null,
      sortable: false,
      filter: false,
      cellRenderer: VerButtonRenderer,
    },
  ]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await apiFetchContactUsReport();
        setMessages(data);
      } catch (err) {
        setError('Error al cargar los mensajes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <PageContainer sx={{ position: 'relative' }}>
      <PageHeader title="Mensajes Recibidos" />
      <MessageDetails msg={selectedMessage} open={open} setOpen={setOpen} />
      {loading ? (
        <Typography>Cargando mensajes...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <CustomAgGrid
          colDefs={columnDefsContactUs}
          rowData={messages}
          width="100%"
        />
      )}
    </PageContainer>
  );
};

export default MessagesPage;
