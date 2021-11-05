// mui
import {
  Button,
  Typography,
  Card,
  TextField,
  Theme,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// next
import type { NextPage } from "next";
import { useState } from "react";

// utils
import { isEmpty } from "../utils";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const useStyles = makeStyles((theme: Theme) => ({
  box: { backgroundColor: theme.palette.primary.light, padding: "2em 0" },
  card: {
    padding: "4em 1em",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      maxWidth: "30em",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  resultRow: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(2),
    },
  },
  key: {
    fontWeight: 600,
    width: "10em",
  },
}));

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleChange = (e: any) => {
    const value = e.target.value;
    setIndex(value);
    !value ? setError("Required") : setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (isEmpty(index)) setError("Required");
    else console.log(index);
    await sleep(5000);
    setLoading(false);
  };

  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "-1em" }}
        >
          Learnsteer Test
        </Typography>
        <Typography>Enter your index number to see your results</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Enter Your Index No"
            value={index}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            fullWidth
          ></TextField>
          <Button
            variant="contained"
            type="submit"
            sx={{ fontWeight: 600, fontSize: "1.1em" }}
            startIcon={
              loading ? (
                <CircularProgress size="1rem" color="secondary" />
              ) : null
            }
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </Button>
        </form>
        <Divider />
        <Box className={classes.group}>
          <Box className={classes.group}>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Name</Typography>
              <Typography>Tharinda P Anurajeewa</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>School</Typography>
              <Typography>Dharmaraja College, Kandy</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Index Number</Typography>
              <Typography>3230853</Typography>
            </Box>
          </Box>

          <Box className={classes.group}>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Z-Score</Typography>
              <Typography>2.4073</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Island Rank</Typography>
              <Typography>247</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Index Number</Typography>
              <Typography>3230853</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Index Number</Typography>
              <Typography>3230853</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Index Number</Typography>
              <Typography>3230853</Typography>
            </Box>
            <Box className={classes.resultRow}>
              <Typography className={classes.key}>Index Number</Typography>
              <Typography>3230853</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Home;
