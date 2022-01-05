// react
import { useState } from "react";

// next
import Image from "next/image";
import Link from "next/link";

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
  useTheme,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

// constants
import { BRAND } from "../constants";
import { NAV_LINKS } from "../constants/links";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.secondary.light,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuBtn: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  container: {
    display: "flex",
    gap: theme.spacing(3),
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
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
  const theme = useTheme();

  return (
    <AppBar className={classes.appBar} position="sticky">
      <Toolbar className={classes.toolbar}>
        <Link href={BRAND.web.learnsteer}>
          <a>
            <Image
              src={BRAND.logo.logo1}
              alt="sasnaka learnsteer logo"
              height={70}
              width={200}
              objectFit="fill"
            />
          </a>
        </Link>
        <Container className={classes.container}>
          {NAV_LINKS.map((link, index) => {
            return (
              <Link href={link.to} key={index}>
                <a>
                  <Typography className={classes.navLink} key={index}>
                    {link.title}
                  </Typography>
                </a>
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
          sx={{
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
          }}
        >
          <Box
            sx={{ width: "100%" }}
            role="presentation"
            onClick={() => setOpenDrawer(false)}
            onKeyDown={() => setOpenDrawer(false)}
          >
            <List>
              {NAV_LINKS.map((link, index) => (
                <Link key={index} href={link.to}>
                  <a>
                    <ListItemButton>
                      <Typography className={classes.navLink}>
                        {link.title}
                      </Typography>
                    </ListItemButton>
                  </a>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
