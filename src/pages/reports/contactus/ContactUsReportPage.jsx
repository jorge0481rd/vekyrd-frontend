import { useEffect, useState } from 'react';
import { apiFetchContactUsReport } from '../../../api/api';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import MessageDetails from './MessageDetails';
import { Typography } from '@mui/material';
import { columnDefsContactUs } from './colsDef';
import CustomAgGrid from '../shared/CustomAgGrid';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

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
