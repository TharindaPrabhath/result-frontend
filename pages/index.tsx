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

// constants
import { TEST_NAME } from "../constants";

// utils
import { isEmpty } from "../utils";

// firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: theme.palette.primary.light,
    padding: "2em 0",
  },
  card: {
    padding: "4em 1em",
    margin: "5% auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      maxWidth: "50em",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  formBtn: {
    fontWeight: 600,
    fontSize: "1.1em",
    width: "100%",
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

interface Result {
  name: string;
  index: string;
  school?: string;
  email?: string;
  subjectStream: string;
  rank: number;
  zScore: number;
  subjects: {
    subject: string;
    result: string;
  }[];
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(null!);
  const classes = useStyles();

  const handleChange = (e: any) => {
    const value = e.target.value;
    setIndex(value);
    !value ? setError("Required") : setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // validating the index number
    if (isEmpty(index)) {
      setError("Required");
      return;
    }

    setLoading(true);

    // fetch data from firestore
    const q = query(collection(db, "examines"), where("index", "==", index));
    getDocs(q)
      .then((res) => {
        const docs = res.docs;
        if (docs.length === 0) {
          setError("Invalid index number");
          return;
        }

        setResult(docs[0].data() as Result);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));

    // await sleep(5000);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setResult(null!);
  };

  console.log(result);

  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "-1em" }}
        >
          {TEST_NAME}
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
            sx={{ fontWeight: 600, fontSize: "1.1em", width: "100%" }}
            startIcon={
              loading ? (
                <CircularProgress size="1rem" color="secondary" />
              ) : null
            }
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </Button>
          {result && (
            <Button
              variant="contained"
              color="error"
              className={classes.formBtn}
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </form>

        {result && (
          <Box className={classes.group}>
            <Divider />
            <Box className={classes.group}>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>Name</Typography>
                <Typography>{result.name}</Typography>
              </Box>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>School</Typography>
                <Typography>{result.school}</Typography>
              </Box>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>Index Number</Typography>
                <Typography>{result.index}</Typography>
              </Box>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>Year</Typography>
                <Typography>2021</Typography>
              </Box>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>Subject Stream</Typography>
                <Typography>{result.subjectStream}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box className={classes.group}>
              {result.subjects.map((subject, index) => {
                return (
                  <Box className={classes.resultRow} key={index}>
                    <Typography className={classes.key}>
                      {subject.subject}
                    </Typography>
                    <Typography>{subject.result}</Typography>
                  </Box>
                );
              })}
            </Box>
            <Divider />
            <Box className={classes.group}>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>Z-Score</Typography>
                <Typography>{result.zScore}</Typography>
              </Box>
              <Box className={classes.resultRow}>
                <Typography className={classes.key}>Island Rank</Typography>
                <Typography>{result.rank}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Home;
