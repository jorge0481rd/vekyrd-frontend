import { currencyFormatter, dateFormatter } from '../shared/helpers';

// prettier-ignore
export const colDefsPendingOrders = [
  { headerName: "Id usuario",    field: "user_id", 			        sortable: true, cellStyle: {textAlign: 'left'}, filter: true },  
  { headerName: "Usuario",       field: "username", 					  sortable: true, cellStyle: {textAlign: 'left'}, filter: true },
  { headerName: "Email",         field: "email", 			          sortable: true, cellStyle: {textAlign: 'left'}, filter: true},
  { headerName: "Total",    		 field: "total_price", 					sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: currencyFormatter }, 
  { headerName: "Fecha",         field: "created_at", 					sortable: true, cellStyle: {textAlign: 'left'},  filter: true, valueFormatter: dateFormatter  },
  { headerName: "Statis",        field: "status", 	            sortable: true, cellStyle: {textAlign: 'left'}, filter: true },
];
