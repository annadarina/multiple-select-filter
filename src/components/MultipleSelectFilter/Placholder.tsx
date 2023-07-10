import React from "react";
import { Grid, Typography } from "@mui/material";
import { InfoRounded } from "@mui/icons-material";

interface Props {
  message: string;
  status: "error" | "info";
}

export const Placeholder = ({ message, status }: Props) => {
  return (
    <Grid container flexDirection="column" alignItems="center">
      <InfoRounded color={status} />
      <Typography variant="caption">{message}</Typography>
    </Grid>
  );
};
