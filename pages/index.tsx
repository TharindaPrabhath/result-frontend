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
import { TEST_NAME } from "../constants/exam";
import { Subject } from "../constants/exam";

// utils
import { isEmpty } from "../utils";

// firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";

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
  multipleExmineTopic: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    textAlign: "center",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  subjectPartsContainer: {
    marginLeft: theme.spacing(3),
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
    totalMarks: number;
    parts: {
      name: string;
      marks: number;
    }[];
  }[];
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result[]>(null!);
  const classes = useStyles();

  const getAsResults = (arr: any[]): Result[] => {
    let temp: any[] = [];
    arr.forEach((i, index) => {
      temp.push(i.data() as Result);
    });
    return temp;
  };

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

        setResult(getAsResults(docs));
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
        {result && result.length > 1 && (
          <Typography>
            * Multiple examines have registered under the same index number
          </Typography>
        )}
        {result &&
          result.map((r, i) => {
            return (
              <Box key={i}>
                {result.length > 1 && (
                  <Typography
                    className={classes.multipleExmineTopic}
                  >{`Examine: ${i + 1}`}</Typography>
                )}

                <Box className={classes.group}>
                  <Box className={classes.group}>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>Name</Typography>
                      <Typography>{r.name}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>School</Typography>
                      <Typography>{r.school}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Index Number
                      </Typography>
                      <Typography>{r.index}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>Year</Typography>
                      <Typography>2021</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Subject Stream
                      </Typography>
                      <Typography>{r.subjectStream}</Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={classes.group}>
                    {r.subjects &&
                      r.subjects.map((subject, index) => {
                        return (
                          <Box key={index}>
                            <Box className={classes.resultRow}>
                              <Typography className={classes.key}>
                                {subject.subject}
                              </Typography>
                              <Typography>{subject.result}</Typography>
                            </Box>

                            <Box className={classes.subjectPartsContainer}>
                              {subject.parts &&
                                subject.parts.map((part, index) => {
                                  return (
                                    <Box key={index}>
                                      <Box className={classes.resultRow}>
                                        <Typography className={classes.key}>
                                          {part.name}
                                        </Typography>
                                        <Typography>
                                          {subject.subject ===
                                          Subject.COMBINED_MATHEMATICS.toString()
                                            ? part.marks / 10
                                            : part.marks}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  );
                                })}
                              <Box className={classes.resultRow}>
                                <Typography className={classes.key}>
                                  Total Marks
                                </Typography>
                                <Typography>{`${subject.totalMarks}%`}</Typography>
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>
                  <Divider />
                  <Box className={classes.group}>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>Z-Score</Typography>
                      <Typography>{r.zScore}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Island Rank
                      </Typography>
                      <Typography>{r.rank}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Card>
    </Box>
  );
};

export default Home;
