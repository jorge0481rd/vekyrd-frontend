import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomAgGrid = ({ colDefs, rowData, title }) => {
  const gridOptions = {
    autoSizeStrategy: {
      type: 'fitGridWidth',
    },
  };

  return (
    <Box sx={{ margin: 4 }}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <AgGridReact
        columnDefs={colDefs}
        rowData={rowData}
        domLayout="autoHeight"
        pagination={true}
        gridOptions={gridOptions}
      />
    </Box>
  );
};

CustomAgGrid.propTypes = {
  colDefs: PropTypes.array.isRequired,
  rowData: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CustomAgGrid;
