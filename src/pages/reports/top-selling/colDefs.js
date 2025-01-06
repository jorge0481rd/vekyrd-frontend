import { currencyFormatter, percentageFormatter } from '../shared/helpers';

// prettier-ignore
export const columnDefsTopSelling = [
  { headerName: "Producto", 			     field: "product_name", 			mobile:true, sortable: true, cellStyle: {textAlign: 'center'}, filter: true },
  { headerName: "Categoría",           field: "category", 					mobile:false, sortable: true, cellStyle: {textAlign: 'center'}, filter: true },
  { headerName: "Cantidad",            field: "quantity_sold", 			mobile:true, sortable: true, cellStyle: {textAlign: 'center'}, filter: true },
  { headerName: "Fecha",    					 field: "date", 							mobile:false, sortable: true, cellStyle: {textAlign: 'center'}, filter: true }, 
  { headerName: "Ingresos",            field: "revenue", 						mobile:false, sortable: true, cellStyle: {textAlign: 'right'},  filter: true, valueFormatter: currencyFormatter },
  { headerName: "Participación (%)",   field: "sales_percentage", 	mobile:true, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: percentageFormatter },
];

export const getColumnDefsTopSelling = (isMobile) =>
  columnDefsTopSelling.filter((col) => (isMobile ? col.mobile : col));
