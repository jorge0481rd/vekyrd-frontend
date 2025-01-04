import { currencyFormatter, percentageFormatter } from '../shared/helpers';

// prettier-ignore
export const columnDefsTopSelling = [
  { headerName: "Nombre del Producto", field: "product_name", 			sortable: true, cellStyle: {textAlign: 'center'}, filter: true },
  { headerName: "Categoría",           field: "category", 					sortable: true, cellStyle: {textAlign: 'center'}, filter: true },
  { headerName: "Cantidad Vendida",    field: "quantity_sold", 			sortable: true, cellStyle: {textAlign: 'center'}, filter: true },
  { headerName: "Fecha",    					 field: "date", 							sortable: true, cellStyle: {textAlign: 'center'}, filter: true }, 
  { headerName: "Ingresos Generados",  field: "revenue", 						sortable: true, cellStyle: {textAlign: 'right'},  filter: true, valueFormatter: currencyFormatter },
  { headerName: "Participación (%)",   field: "sales_percentage", 	sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: percentageFormatter },
];
