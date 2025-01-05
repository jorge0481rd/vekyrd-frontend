// prettier-ignore
export const columnDefsContactUs = [
  { headerName: "Id", field: "id", sortable: true, filter: true },
  { headerName: "Fecha", field: "created_at", sortable: true, filter: true },
  { headerName: "Nombre", field: "name", sortable: true, filter: true },
  { headerName: "Email", field: "email", sortable: true, filter: true },
  { headerName: "Mensaje", field: "message", sortable: true, filter: true },
  { headerName: 'Leído', field: 'read'},
]

// label={params.read ? 'Leído' : 'No leído'}
// color={params.read ? 'success' : 'default'}
