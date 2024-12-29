import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import TotalWidget from '../shared/TotalWidget';
import CustomAgGrid from '../shared/CustomAgGrid';
import { fetchSalesReport } from '../../../helpers/reports';
import { fetchCategoriesAnalysis } from '../../../helpers/reportsAiAnalysis';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AiLoadingSpinner from '../../../components/LoadingIndicator/AiLoadingSpinner';
import {
  colDefCategoryy,
  colDefSalesTrend,
  colDefTopSellingProducts,
} from './colDefs';
import SalesTrendChart from './SalesTrendChart';

const SalesReportPage = () => {
  const [salesData, setSalesData] = useState({
    total_sales: 15000,
    sales_by_category: [
      {
        category: 'Shampoos',
        total_sales: 5000,
      },
      {
        category: 'Conditioners',
        total_sales: 3000,
      },
    ],
    sales_trend: [
      {
        date: '2024-12-01',
        total_sales: 2000,
      },
      {
        date: '2024-12-02',
        total_sales: 2500,
      },
    ],
    top_selling_products: [
      {
        id: 5,
        name: 'Champú Anti-Caída',
        units_sold: 100,
        revenue: 2000,
      },
    ],
  });
  const [categoriesAnalysis, setCategoriesAnalysis] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSalesReport({
          start_date: '2024-01-01',
          end_date: '2024-12-31',
          group_by: 'month',
        });
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    const getCategoriesAnalysis = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCategoriesAnalysis(salesData.sales_by_category);
        setCategoriesAnalysis(data);
      } catch (error) {
        console.error('Error fetching categories analysis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategoriesAnalysis();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Reporte de Ventas"></PageHeader>
      <Box
        sx={{
          width: '100%',
          marginBottom: 2,
        }}
      >
        <TotalWidget value={salesData.total_sales} title="Total de ventas" />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomAgGrid
              colDefs={colDefSalesTrend}
              rowData={salesData.sales_trend}
              width="500px"
              title="Ventas del mes"
            />
            <SalesTrendChart sales_trend={salesData.sales_trend} />
          </Box>
          <CustomAgGrid
            colDefs={colDefTopSellingProducts}
            rowData={salesData.top_selling_products}
            width="500px"
            title="Productos más vendidos"
          />
        </Box>
        <hr />
        <hr />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <CustomAgGrid
            colDefs={colDefCategoryy}
            rowData={salesData.sales_by_category}
            width="500px"
            title="Ventas por categoría"
          />
          <Box
            id="categoryy-ai-interpretation"
            sx={{ width: '500px', paddingTop: 4 }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Análisis de categorías <AutoAwesomeIcon />
            </Typography>
            {!isLoading && (
              <Typography
                dangerouslySetInnerHTML={{ __html: categoriesAnalysis }}
              />
            )}
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '400px',
                }}
              >
                <AiLoadingSpinner size="10rem" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default SalesReportPage;
