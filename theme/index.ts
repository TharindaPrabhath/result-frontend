import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0098DA",
      light: "#E2E2E2",
      contrastText: "#232630",
    },
    secondary: {
      main: "#232630",
      light: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
