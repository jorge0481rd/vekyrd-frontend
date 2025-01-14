import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import NavigationButton from '../../components/navigation-button';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import CustomAgGrid from '../reports/shared/CustomAgGrid';
import { apiFetchUserOrders } from '../../api/api';
import { dateFormatter } from '../reports/shared/helpers.js';
import useDeviceType from '../../utils/isMobile.js';
import SelectedOrder from './SelectedOrder.jsx';

const MyOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getUserOrders = async () => {
    setLoading(true);
    try {
      const data = await apiFetchUserOrders();
      setOrdersData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);

  // colDefs
  const statusRenderer = ({ value }) => {
    if (value === 'pending') {
      return <span style={{ color: 'orange' }}>Pendiente</span>;
    }
    if (value === 'paid') {
      return <span style={{ color: 'green' }}>Pagado</span>;
    }
    return <span style={{ color: 'red' }}>Cancelado</span>;
  };

  const VerButtonRenderer = (params) => {
    const handleClick = () => {
      console.log(params);
      setSelectedData(params.data);
      setOpenModal(true);
    };

    return (
      <Button size="small" variant="contained" onClick={handleClick}>
        Ver
      </Button>
    );
  };

  // prettier-ignore
  const columnDefsMyOrders = [
		{ headerName: "Fecha",         field: "created_at",          mobile:true, sortable: true, filter: true, valueFormatter: dateFormatter },
		{ headerName: "Código",        field: "order_hash",          mobile:true, sortable: true, filter: true },
		{ headerName: "Subtotal",      field: "subtotal",            mobile:false, sortable: true, filter: true },
		{ headerName: "Impuestos",     field: "taxes",               mobile:false, sortable: true, filter: true },
		{ headerName: "Total",         field: "total_price",         mobile:false, sortable: true, filter: true },
		{ headerName: "Método",        field: "payment_method",      mobile:false, sortable: true, filter: true},
		{ headerName: "Estado",        field: "status",              mobile:true, sortable: true, filter: true, cellRenderer: statusRenderer},
		{
			headerName: 'Acciones',
			field: null,
			sortable: false,
			filter: false,
			cellRenderer: VerButtonRenderer,
		}
	];

  const getColumnDefsMyOrders = (isMobile) =>
    columnDefsMyOrders.filter((col) => (isMobile ? col.mobile : col));

  const isMobile = useDeviceType().isMobile;

  return (
    <PageContainer>
      <PageHeader
        title="Mis Pedidos"
        subtitle="Aquí podrás ver todos tus pedidos y sus estados."
        isLoading={loading}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <NavigationButton href="/products" text="Productos ►" />
        </Box>
      </PageHeader>
      <SelectedOrder
        data={selectedData}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
      <CustomAgGrid
        colDefs={getColumnDefsMyOrders(isMobile)}
        rowData={ordersData}
      />
    </PageContainer>
  );
};

export default MyOrdersPage;
