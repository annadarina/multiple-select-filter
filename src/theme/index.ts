import { createTheme } from "@mui/material/styles";

/** Override some default styles and colors */
export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *:before, *:after": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
          scrollBehavior: "smooth",
        },
        "#root": {
          display: "flex",
          flexDirection: "column",
          maxWidth: 1920,
          width: "100%",
          height: "100%",
          margin: "0 auto",
          padding: 24,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});
