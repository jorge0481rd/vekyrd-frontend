import { currencyFormatter, dateFormatter } from '../shared/helpers';

const STOCK_THRESHOLD = 10; // Define the stock threshold

// prettier-ignore
export const columnDefsInventory = [
  { headerName: "Id", field: "id", sortable: true, filter: true },
  { headerName: "Nombre", field: "name", sortable: true, filter: true },
  { headerName: "SKU", field: "sku", sortable: true, filter: true },
  { headerName: "Precio", field: "price", sortable: true, filter: true, valueFormatter: currencyFormatter },
  { headerName: "Categoría", field: "category", sortable: true, filter: true },
  { headerName: "Stock", field: "stock", sortable: true, filter: true },
  {
    headerName: "Estado", 
    field: "stock", 
    sortable: true, 
    filter: true, 
    valueGetter: (params) => {
      const stock = params.data.stock;
			let state = "Disponible";
			
			if (stock < STOCK_THRESHOLD) {
				state = "Bajo Stock";
			}
			
			if (stock === 0) {
				state = "Agotado";
			}
			return state;			
    },
		cellStyle: (params) => {
			const stock = params.data.stock;
      if (stock === 0) {
        return { color: 'red', fontWeight: 'bold' };
      } else if (stock < STOCK_THRESHOLD) {
        return { color: 'orange', fontWeight: 'bold' };
      } else {
        return { color: '#000000' };
      }
    },
  },
];

// prettier-ignore
export const columnDefsInventoryHistory = [
	{ headerName: "Fecha",               field: "date",            sortable: true, filter: true, valueFormatter: dateFormatter },
	{ headerName: "Cantidad",            field: "quantity",        sortable: true, filter: true },
	{ headerName: "Nombre",              field: "name",            sortable: true, filter: true },
	{ headerName: "Categoría",           field: "category",        sortable: true, filter: true },
	{ headerName: "Tipo de operación",   field: "operation_type",  sortable: true, filter: true, cellStyle: (params) => {
		const operation_type = params.data.operation_type;
		let color = "#000000";

		if(operation_type === "entrada") {
			color = "#008000";
		}
		if(operation_type === "salida") {
			color = "red";
		}
		if(operation_type === "actualizacion") {
			color = "orange";
		}

		return { color: color };
	}},
]
