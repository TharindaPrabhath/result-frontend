// mui
import { Typography, Box, Theme, Icon } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

// next
import Image from "next/image";
import Link from "next/link";

// constants
import { BRAND } from "../constants";
import { NAV_LINKS, SOCIAL_MEDIA_LINKS } from "../constants/links";

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "2rem",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  link: {
    color: grey[400],
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.contrastText,
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.box} padding={5}>
      <Box className={classes.innerBox}>
        <Image src={BRAND.logo.logo1} alt="logo1" height={40} width={100} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <Typography sx={{ fontWeight: 600, marginBottom: "1em" }}>
            Pages
          </Typography>
          {NAV_LINKS.map((link, index) => {
            return (
              <Link href={link.to} key={index} passHref>
                <Typography className={classes.link} key={index}>
                  {link.title}
                </Typography>
              </Link>
            );
          })}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, marginBottom: "1em" }}>
            Our Media
          </Typography>
          <Box sx={{ display: "flex", gap: "1em" }}>
            {SOCIAL_MEDIA_LINKS.map((link, index) => {
              return (
                <a href={link.to} key={index}>
                  <link.icon className={classes.link} />
                </a>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "2em", textAlign: "center" }}>
        <Typography fontSize="0.7rem" color={grey[400]}>
          2021 All Rights Reserved © {BRAND.fullName}
        </Typography>
      </Box>
    </Box>
  );
}
