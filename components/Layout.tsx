// mui
import { Container } from "@mui/material";

import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container
        sx={{
          height: "100vh",
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
}
