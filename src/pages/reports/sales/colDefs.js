import { dateFormatter } from '../shared/helpers';

// Formatter for currency fields
const currencyFormatter = (params) => {
  return `${parseFloat(params.value).toFixed(2)}`;
};

// prettier-ignore
export const columnDefs = [
	{ headerName: "Order ID", 			field: "order_id", 					 sortable: true, filter: true },
	{ headerName: "Date", 					field: "created_at", 				 sortable: true, filter: true, valueFormatter: dateFormatter },
	{ headerName: "User ID", 				field: "user_id", 					 sortable: true, filter: true },
	{ headerName: "Payment Method", field: "payment_method", 		 sortable: true, filter: true },
	{ headerName: "Product ID", 		field: "product_id", 				 sortable: true, filter: true },
	{ headerName: "Quantity", 			field: "quantity", 					 sortable: true, filter: true },
	{ headerName: "Product Name", 	field: "name", 							 sortable: true, filter: true },
	{ headerName: "Category", 			field: "category",					 sortable: true, filter: true },
	{ headerName: "Price", 					field: "price", 						 sortable: true, filter: true, valueFormatter: currencyFormatter },
	{ headerName: "Total Price", 		field: "total_price", 			 sortable: true, filter: true, valueFormatter: currencyFormatter }
];
