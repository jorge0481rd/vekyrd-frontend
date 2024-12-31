import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import CustomAgGrid from '../shared/CustomAgGrid';
import { columnDefsTopSelling } from './colDefs';
import { fetchTopSellingProductsReport } from '../../../helpers/reports';
import { Box, Button } from '@mui/material';
import { TextField } from '@mui/material';
import DatePickerComponent from '../shared/DatePicker1';
import { getFromDate } from '../../../utils/getFromDate';

const TopSellingProductsReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topSellingProductsData, setTopSellingProductsData] = useState([]);
  const [date_start, setDate_start] = useState('2024-01-01');
  const [date_end, setDate_end] = useState('2024-12-31');
  const [amount_records, setAmount_records] = useState(10);

  const fetchTopSellingData = async () => {
    setIsLoading(true);

    try {
      const data = await fetchTopSellingProductsReport({
        date_start,
        date_end,
        amount_records,
      });
      setTopSellingProductsData(data);
    } catch (error) {
      console.error('Error fetching top-selling products data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSellingData();
  }, []);

  return (
    <PageContainer sx={{ backgroundColor: '#eeeeee' }}>
      <PageHeader
        title="Reporte de Productos Más Vendidos"
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

        <TextField
          label="Cantidad de Registros"
          type="number"
          value={amount_records}
          onChange={(e) => setAmount_records(e.target.value)}
          sx={{ background: '#ffffff' }}
        />

        <Button variant="contained" onClick={fetchTopSellingData}>
          Actualizar
        </Button>
      </Box>

      {/* Top-selling products table */}
      <CustomAgGrid
        colDefs={columnDefsTopSelling}
        rowData={topSellingProductsData}
        title={`${getFromDate(date_start).longDate} - ${
          getFromDate(date_end).longDate
        }`}
        width="100%"
      />
    </PageContainer>
  );
};

export default TopSellingProductsReportPage;
