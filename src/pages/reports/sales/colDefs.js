import { dateFormatter } from '../shared/helpers';

// Formatter for currency fields
const currencyFormatter = (params) => {
  return `${parseFloat(params.value).toFixed(2)}`;
};

// prettier-ignore
export const columnDefs = [
	{ headerName: "Pedido", 			  field: "order_id", 			 		 mobile:true,  sortable: true, filter: true },
	{ headerName: "Hash", 			    field: "order_hash", 				 mobile:false,  sortable: true, filter: true },
	{ headerName: "Fecha", 					field: "created_at", 				 mobile:false, sortable: true, filter: true, valueFormatter: dateFormatter },
	{ headerName: "Usuario", 				field: "user_id", 					 mobile:false, sortable: true, filter: true },
	{ headerName: "Método de pago", field: "payment_method", 		 mobile:false, sortable: true, filter: true },
	{ headerName: "Cantidad", 			field: "quantity", 					 mobile:false, sortable: true, filter: true },
	{ headerName: "Id. Prod.", 		  field: "product_id", 				 mobile:false, sortable: true, filter: true },
	{ headerName: "Producto", 	    field: "name", 							 mobile:true, sortable: true, filter: true },
	{ headerName: "Categoría", 			field: "category",					 mobile:false, sortable: true, filter: true },
	{ headerName: "Precio", 				field: "price", 						 mobile:true, sortable: true, filter: true, valueFormatter: currencyFormatter },
];

export const getColumnDefs = (isMobile) =>
  columnDefs.filter((col) => (isMobile ? col.mobile : col));
