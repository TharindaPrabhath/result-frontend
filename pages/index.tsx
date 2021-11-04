import { Button, ThemeProvider } from "@mui/material";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import theme from "../theme";

const Index: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Button>Click Here</Button>
        <Button variant="contained">Click Here</Button>
        <Button variant="outlined">Click Here</Button>
        <Button variant="contained" color="secondary">
          Click Here
        </Button>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
