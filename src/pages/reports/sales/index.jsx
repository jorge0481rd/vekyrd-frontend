import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import { fetchSalesReport } from '../../../helpers/reports';
import CustomAgGrid from '../shared/CustomAgGrid';
import { getColumnDefs } from './colDefs';
import { getFromDate } from '../../../utils/getFromDate';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ChartCategory from './ChartCategory';
import { summarizeCategories } from './helpers/summarizeCategories';
import ChartSalesTrend from './ChartSalesTrend';
import DatePickerComponent from '../shared/DatePicker1';
import useDeviceType from '../../../utils/isMobile';

const SalesReportPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date_start, setDate_start] = useState('2024-01-01');
  const [date_end, setDate_end] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [categoriesSummary, setCategoriesSummary] = useState([]);
  const isMobile = useDeviceType().isMobile;
  const columnDefs = getColumnDefs(isMobile);

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

  const trendTitle = (
    <Box>
      <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
        Ventas del mes
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', width: '100%' }}>
        {getFromDate(date_start).longDate} - {getFromDate(date_end).longDate}
      </Typography>
    </Box>
  );

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
      <DatePickerComponent
        setDate_start={setDate_start}
        setDate_end={setDate_end}
        date_start={date_start}
        date_end={date_end}
        updateFunc={getSales}
      />

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
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <ChartCategory
              info={categoriesSummary}
              title={`Ventas por categoría (${getFromDate(date_start).date} - ${
                getFromDate(date_end).date
              })`}
              sx={{
                flex: 2,
                width: '200px',
              }}
            />
            {salesData && salesData.length > 0 && (
              <ChartSalesTrend
                info={salesData}
                sx={{
                  flex: 2,
                  width: '200px',
                }}
              />
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* AG grid */}
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Ver / ocultar Tabla
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAgGrid
            colDefs={columnDefs}
            rowData={salesData}
            title={trendTitle}
            width="100%"
          />
        </AccordionDetails>
      </Accordion>
    </PageContainer>
  );
};

export default SalesReportPage;
