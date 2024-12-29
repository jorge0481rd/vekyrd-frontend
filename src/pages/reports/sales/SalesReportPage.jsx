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
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DatePicker1 from './DatePicker1';
import ChartCategory from './ChartCategory';
import { summarizeCategories } from './helpers/summarizeCategories';
import ChartSalesTrend from './ChartSalesTrend';

const SalesReportPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start_date, setStart_date] = useState('2024-01-01');
  const [end_date, setEnd_date] = useState('2024-12-31');
  const [categoriesSummary, setCategoriesSummary] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSalesReport({
          start_date,
          end_date,
        });
        setSalesData(data.salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, [end_date, start_date]);

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
      <DatePicker1
        setStart_date={setStart_date}
        setEnd_date={setEnd_date}
        start_date={start_date}
        end_date={end_date}
      />

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
          <ChartCategory
            info={categoriesSummary}
            title={`Ventas por categoría (${getFromDate(start_date).date} - ${
              getFromDate(end_date).date
            })`}
            width="400px"
          />
          {salesData && salesData.length > 0 && (
            <ChartSalesTrend
              info={salesData}
              title={`Ventas del mes (${getFromDate(start_date).date} - ${
                getFromDate(end_date).date
              })`}
              width="400px"
            />
          )}
        </AccordionDetails>
      </Accordion>

      <CustomAgGrid
        colDefs={columnDefs}
        rowData={salesData}
        title={`${getFromDate(start_date).longDate} - ${
          getFromDate(end_date).longDate
        }`}
        width="100%"
      />
    </PageContainer>
  );
};

export default SalesReportPage;
