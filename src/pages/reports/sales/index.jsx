import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import { fetchSalesReport } from '../../../helpers/reports';
import CustomAgGrid from '../shared/CustomAgGrid';
import { columnDefs } from './colDefs';
import { getFromDate } from '../../../utils/getFromDate';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ChartCategory from './ChartCategory';
import { summarizeCategories } from './helpers/summarizeCategories';
import ChartSalesTrend from './ChartSalesTrend';
import DatePickerComponent from '../shared/DatePicker1';

const SalesReportPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date_start, setDate_start] = useState('2024-01-01');
  const [date_end, setDate_end] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [categoriesSummary, setCategoriesSummary] = useState([]);

  const getSales = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSalesReport({
        start_date: date_start,
        end_date: date_end,
      });
      setSalesData(data.salesData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  useEffect(() => {
    const summary = summarizeCategories(salesData);
    const labels = Object.keys(summary);
    const data = Object.values(summary);
    setCategoriesSummary({ labels, data });
  }, [salesData]);

  return (
    <PageContainer sx={{ backgroundColor: '#eeeeee' }}>
      <PageHeader title="Reporte de Ventas" isLoading={isLoading}></PageHeader>

      {/* Date pickers */}
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

        <Button variant="contained" onClick={getSales}>
          Actualizar
        </Button>
      </Box>

      {/* charts */}
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Ver / ocultar Gráficos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <ChartCategory
              info={categoriesSummary}
              title={`Ventas por categoría (${getFromDate(date_start).date} - ${
                getFromDate(date_end).date
              })`}
              sx={{ flex: 1, height: '300px', width: '400px' }}
            />
            {salesData && salesData.length > 0 && (
              <ChartSalesTrend
                info={salesData}
                title={`Ventas del mes (${getFromDate(date_start).date} - ${
                  getFromDate(date_end).date
                })`}
                sx={{ flex: 2, height: '300px', width: '400px' }}
              />
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* AG grid */}
      <CustomAgGrid
        colDefs={columnDefs}
        rowData={salesData}
        title={`${getFromDate(date_start).longDate} - ${
          getFromDate(date_end).longDate
        }`}
        width="100%"
      />
    </PageContainer>
  );
};

export default SalesReportPage;
