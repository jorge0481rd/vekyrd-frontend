import { formatPrice } from '../../../utils/formatPrice';
import { getFromDate } from '../../../utils/getFromDate';

export const colDefCategoryy = [
  { headerName: 'Categoría', field: 'category', flex: 1 },
  {
    headerName: 'Total',
    field: 'total',
    valueFormatter: (params) => formatPrice(params.value),
    cellStyle: { textAlign: 'right' },
  },
];

export const colDefSalesTrend = [
  {
    headerName: 'Fecha',
    field: 'date',
    flex: 1,
    valueFormatter: (param) => {
      const date = getFromDate(param.data.date);
      console.log(param, date);
      return `${date.weekday} ${date.day} de ${date.month} del ${date.year}`;
    },
  },
  {
    headerName: 'Ventas',
    field: 'total_sales',
    valueFormatter: (params) => formatPrice(params.value),
    cellStyle: { textAlign: 'right' },
  },
];

export const colDefTopSellingProducts = [
  { headerName: 'ID', field: 'product_id' },
  { headerName: 'Nombre', field: 'name' },
  {
    headerName: 'Unidades',
    field: 'count',
  },
  {
    headerName: 'Neto',
    field: 'sum',
    valueFormatter: (params) => formatPrice(params.value),
  },
];
