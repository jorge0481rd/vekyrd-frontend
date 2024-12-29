import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomAgGrid = ({ colDefs, rowData, title, width }) => {
  return (
    <Box sx={{ width: width, margin: 4 }}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <AgGridReact
        columnDefs={colDefs}
        rowData={rowData}
        domLayout="autoHeight"
        pagination={true}
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
