import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import { fetchReviewsReport } from '../../../helpers/reports';
import CustomAgGrid from '../shared/CustomAgGrid';
import { colDefsReviews } from './colDefsReviews';

const ReviewsReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    setIsLoading(true);

    try {
      const data = await fetchReviewsReport();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching top-selling products data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <PageContainer sx={{ backgroundColor: '#eeeeee' }}>
      <PageHeader
        title="Reporte de comentarios"
        isLoading={isLoading}
      ></PageHeader>
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Ver / ocultar Reseñas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAgGrid
            colDefs={colDefsReviews}
            rowData={reviews}
            width="100%"
          />
        </AccordionDetails>
      </Accordion>
    </PageContainer>
  );
};

export default ReviewsReportPage;
