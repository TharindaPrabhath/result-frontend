// mui
import { Box } from "@mui/material";

import React, { ReactNode } from "react";
import theme from "../theme";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box
        sx={{
          height: "100vh",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
