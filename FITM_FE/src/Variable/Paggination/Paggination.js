import React from 'react';
import { Pagination, Stack } from '@mui/material';

const PaginationComponent = ({ data, currentPage, itemPerPage, onPageChange }) => {
  const totalPages = Math.ceil(data.length / itemPerPage);

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
      <Stack spacing={2} direction="row" style={{marginLeft:"40%"}}>
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
  );
};

export default PaginationComponent;