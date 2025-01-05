import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import { Box, Button } from '@mui/material';
import DatePickerComponent from '../shared/DatePicker1';
import { fetchPendingOrdersReport } from '../../../helpers/reports';
import CustomAgGrid from '../shared/CustomAgGrid';
import { colDefsPendingOrders } from './colDefs';

const PendingOrdersReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);
  const [date_start, setDate_start] = useState('2024-01-01');
  const [date_end, setDate_end] = useState('2024-12-31');

  const getPendingOrdersReport = async () => {
    setIsLoading(true);

    try {
      const response = await fetchPendingOrdersReport();

      setPendingOrdersData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPendingOrdersReport();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Reporte de órdenes pendientes"
        isLoading={isLoading}
      ></PageHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          marginTop: 2,
          alignItems: 'center',
        }}
      >
        <DatePickerComponent
          setDate_start={setDate_start}
          setDate_end={setDate_end}
          date_start={date_start}
          date_end={date_end}
        />

        <Button
          variant="contained"
          onClick={() => getPendingOrdersReport({ date_start, date_end })}
        >
          Actualizar
        </Button>
      </Box>
      {/* Pending orders  table */}
      <CustomAgGrid
        colDefs={colDefsPendingOrders}
        rowData={pendingOrdersData}
        title="Pending Orders"
        width="100%"
      />
    </PageContainer>
  );
};

export default PendingOrdersReportPage;
