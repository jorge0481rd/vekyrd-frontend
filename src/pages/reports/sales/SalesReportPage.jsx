import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Grid,
} from '@mui/material';
import { fetchSalesReport } from '../../../helpers/reports';
import TotalWidget from '../shared/TotalWidget';

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
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchSalesData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await fetchSalesReport({
  //         start_date: '2024-01-01',
  //         end_date: '2024-12-31',
  //         group_by: 'month',
  //       });
  //       setSalesData(data);
  //     } catch (error) {
  //       console.error('Error fetching sales data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchSalesData();
  // }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reporte de Ventas
      </Typography>
      {isLoading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Grid container spacing={3}>
            <TotalWidget
              value={salesData.total_sales}
              title="Total de ventas"
            />
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Ventas por categoría
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Categoría</TableCell>
                        <TableCell align="right">Ventas</TableCell>
                        <TableCell align="right">% de ventas</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {salesData.sales_by_category.map((row) => (
                        <TableRow key={row.category}>
                          <TableCell>{row.category}</TableCell>
                          <TableCell align="right">{row.total_sales}</TableCell>
                          <TableCell align="right">
                            {row.total_sales}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SalesReportPage;
