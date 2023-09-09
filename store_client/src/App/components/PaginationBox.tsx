import React from "react";
import { MetaData } from "../Models/Pagination";
import { Box, Pagination, Typography } from "@mui/material";

export interface Props {
  metaData: MetaData;
  onChange: (page: number) => void;
}
const PaginationBox = ({ metaData, onChange }: Props) => {
  const { currentPage, totalPages, totalCount, pageSize } = metaData;
  const start = pageSize * (currentPage - 1) + 1;
  const end = pageSize * currentPage;
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>
          {" "}
          Showing {start} - {end > totalCount ? totalCount : end} of{" "}
          {totalCount} products
        </Typography>
        <Pagination
          color="primary"
          count={totalPages}
          page={currentPage}
          shape="rounded"
          onChange={(e, page) => onChange(page)}
        />
      </Box>
    </>
  );
};

export default PaginationBox;
