import React from "react";
import { Box, Skeleton } from "@mui/material";

const skeletons = Array.from(Array(8).keys());

export const LoadingPlaceholder = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {skeletons.map((item) => (
        <Skeleton key={item} animation="wave" height={50} />
      ))}
    </Box>
  );
};
