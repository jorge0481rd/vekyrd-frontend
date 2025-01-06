import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import CustomAgGrid from '../shared/CustomAgGrid';
import useDeviceType from '../../../utils/isMobile';
import {
  getColumnDefsInventoryHistory,
  getColumnDefsInventory,
} from './colDefs';
import {
  fetchInventoryHistoryReport,
  fetchInventoryReport,
} from '../../../helpers/reports';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InvetoryReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryHistoryData, setInventoryHistoryData] = useState([]);

  const isMobile = useDeviceType().isMobile;
  const columnDefsInventory = getColumnDefsInventory(isMobile);
  const columnDefsInventoryHistory = getColumnDefsInventoryHistory(isMobile);

  const getInventory = async () => {
    setIsLoading(true);

    try {
      const data = await fetchInventoryReport();
      setInventoryData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInventoryHistory = async () => {
    setIsLoading(true);

    try {
      const data = await fetchInventoryHistoryReport();
      setInventoryHistoryData(data);
    } catch (error) {
      console.error('Error fetching inventory history data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInventory();
    getInventoryHistory();
  }, []);

  return (
    <PageContainer sx={{ backgroundColor: '#eeeeee' }}>
      <PageHeader
        title="Reporte de Inventario"
        isLoading={isLoading}
      ></PageHeader>
      {/* refresh table */}
      <Button onClick={getInventory}>Actualizar</Button>

      {/* inventory */}
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Ver / ocultar Inventario
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAgGrid
            colDefs={columnDefsInventory}
            rowData={inventoryData}
            width="100%"
          />
        </AccordionDetails>
      </Accordion>

      {/* inventory history */}
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Ver / ocultar Historial de Inventario
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAgGrid
            colDefs={columnDefsInventoryHistory}
            rowData={inventoryHistoryData}
            width="100%"
          />
        </AccordionDetails>
      </Accordion>
    </PageContainer>
  );
};

export default InvetoryReportPage;
