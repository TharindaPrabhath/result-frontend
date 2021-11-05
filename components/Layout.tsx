// mui
import { Box } from "@mui/material";

import React, { ReactNode } from "react";
import theme from "../theme";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
}
