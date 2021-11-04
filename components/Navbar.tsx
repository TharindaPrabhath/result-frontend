// mui
import {
  AppBar,
  Container,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Drawer,
  Box,
  List,
  ListItemButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

// next
import Image from "next/image";
import Link from "next/link";

// constants
import { BRAND } from "../constants";
import NAV_LINKS from "../constants/navLinks";

import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.secondary.light,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuBtn: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  container: {
    display: "flex",
    gap: theme.spacing(3),
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(8),
    },
  },
  navLink: {
    cursor: "pointer",
    fontWeight: 600,
  },
}));

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        <Image src={BRAND.logo.logo1} alt="logo1" height={40} width={100} />
        <Container className={classes.container}>
          {NAV_LINKS.map((link, index) => {
            return (
              <Link href={link.to} key={index} passHref>
                <Typography className={classes.navLink} key={index}>
                  {link.title}
                </Typography>
              </Link>
            );
          })}
        </Container>
        <IconButton
          className={classes.menuBtn}
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setOpenDrawer(true)}
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor="top"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box
            sx={{ width: "auto" }}
            role="presentation"
            onClick={() => setOpenDrawer(false)}
            onKeyDown={() => setOpenDrawer(false)}
          >
            <List>
              {NAV_LINKS.map((link, index) => (
                <ListItemButton key={index} alignItems="center">
                  <Link href={link.to} passHref>
                    <Typography className={classes.navLink}>
                      {link.title}
                    </Typography>
                  </Link>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
