import { currencyFormatter, dateFormatter } from '../shared/helpers';

// prettier-ignore
export const colDefsPendingOrders = [
  { headerName: "Id",            field: "user_id", 			        mobile:true, sortable: true, cellStyle: {textAlign: 'left'}, filter: true },  
  { headerName: "Usuario",       field: "username", 					  mobile:true, sortable: true, cellStyle: {textAlign: 'left'}, filter: true },
  { headerName: "Email",         field: "email", 			          mobile:false, sortable: true, cellStyle: {textAlign: 'left'}, filter: true},
  { headerName: "Total",    		 field: "total_price", 					mobile:true, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: currencyFormatter }, 
  { headerName: "Fecha",         field: "created_at", 					mobile:true, sortable: true, cellStyle: {textAlign: 'left'},  filter: true, valueFormatter: dateFormatter  },
  { headerName: "Status",        field: "status", 	            mobile:false, sortable: true, cellStyle: {textAlign: 'left'}, filter: true },
];

export const getColumnDefsPendingOrders = (isMobile) =>
  colDefsPendingOrders.filter((col) => (isMobile ? col.mobile : col));
