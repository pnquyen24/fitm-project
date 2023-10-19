import React from 'react';
import { Pagination, Stack, Paper } from '@mui/material';

const PaginationComponent = ({ data, currentPage, itemPerPage, onPageChange }) => {
  const totalPages = Math.ceil(data.length / itemPerPage);

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Paper elevation={3} style={{ margin: '0 auto', backgroundColor: '#F0F8FF', border: 'none', textAlign: 'center'}}>
      <Stack spacing={2} direction="row">
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
          boundaryCount={1}
          siblingCount={1}  // Adjust the number of displayed buttons
          hidePrevButton={currentPage === 1}  // Hide the previous button on the first page
          hideNextButton={currentPage === totalPages}  // Hide the next button on the last page
        />
      </Stack>
    </Paper>
  );
};

export default PaginationComponent;