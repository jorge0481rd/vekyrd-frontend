import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import PropTypes from 'prop-types';

const SearchBox = ({
  value,
  onChange,
  label,
  filterOptions = [],
  selectedFilter,
  onFilterChange,
  placeholder = 'Buscar...',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      {/* Filter */}
      {filterOptions.length > 0 && (
        <FormControl sx={{ marginBottom: '1rem', flex: 1 }}>
          <InputLabel>Filtrar por</InputLabel>
          <Select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            label="Filtrar por"
          >
            {filterOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Search Box */}
      <FormControl sx={{ marginBottom: '1rem', flex: 2 }}>
        <TextField
          id="search"
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          sx={{ flex: 2 }}
        />
      </FormControl>
    </Box>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  filterOptions: PropTypes.array,
  selectedFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
  maxWidth: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBox;
