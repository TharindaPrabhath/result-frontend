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
import { Subject, TEST_NAME } from "../constants/exam";

// utils
import { isEmpty } from "../utils";

// firebase
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
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

interface Examine {
  name: string;
  index: string;
  school?: string;
  email?: string;
  subjectStream: string;
  rank: number;
  zScore: number;
  subjects: any;
}

interface Result {
  examine: Examine;
  subjects: ISubject[];
}

interface ISubject {
  name: string;
  content: any;
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const classes = useStyles();

  const getAsResults = async (arr: any[]) => {
    let tempResults: Result[] = [];
    // let tempExamines: any[] = [];

    arr.forEach(async (i) => {
      let tempSubjects: ISubject[] = [];
      const examine = i.data() as Examine;

      // get each subject doc
      if (examine.subjectStream === "Physical Science") {
        // get combined mathematics
        !isEmpty(examine.subjects?.combinedMathematics) &&
          getDoc(
            doc(
              db,
              "combinedMathematics",
              examine.subjects?.combinedMathematics
            )
          ).then((subject) => {
            tempSubjects.push({
              name: Subject.COMBINED_MATHEMATICS,
              content: subject.data(),
            });
          });
      } else {
        // get biology
        !isEmpty(examine.subjects?.biology) &&
          getDoc(doc(db, "biology", examine.subjects?.biology)).then(
            (subject) => {
              tempSubjects.push({
                name: Subject.BIOLOGY,
                content: subject.data(),
              });
            }
          );
      }

      // get physics
      !isEmpty(examine.subjects?.physics) &&
        getDoc(doc(db, "physics", examine.subjects?.physics)).then(
          (subject) => {
            tempSubjects.push({
              name: Subject.PHYSICS,
              content: subject.data(),
            });

            // get chemistry
            !isEmpty(examine.subjects?.chemistry) &&
              getDoc(doc(db, "chemistry", examine.subjects?.chemistry)).then(
                (subject) => {
                  tempSubjects.push({
                    name: Subject.CHEMISTRY,
                    content: subject.data(),
                  });
                  tempResults.push({
                    examine: examine,
                    subjects: tempSubjects,
                  });
                  setResults([...tempResults]);
                }
              );
          }
        );

      // const physicsDoc = await getDoc(
      //   doc(db, "physics", examine.subjects?.physics)
      // );
      // const chemistryDoc = await getDoc(
      //   doc(db, "chemistry", examine.subjects?.chemistry)
      // );

      // tempSubjects.push({
      //   name: Subject.PHYSICS,
      //   content: physicsDoc.data(),
      // });

      // tempSubjects.push({
      //   name: Subject.CHEMISTRY,
      //   content: chemistryDoc.data(),
      // });

      //setResults(tempResults);
    });
    // setResults(tempResults);
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
      .then(async (res) => {
        const docs = res.docs;
        if (docs.length === 0) {
          setError("Invalid index number");
          return;
        }

        getAsResults(docs).finally(() => setLoading(false));
      })
      .catch((e) => console.error(e));
    //.finally(() => setLoading(false));

    // await sleep(5000);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setResults([]);
  };

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
          {results.length !== 0 && (
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
        {results && results.length > 1 && (
          <Typography>
            * Multiple examines have registered under the same index number
          </Typography>
        )}
        {results &&
          results.map((result, i) => {
            return (
              <Box key={i}>
                {results.length > 1 && (
                  <Typography
                    className={classes.multipleExmineTopic}
                  >{`Examine: ${i + 1}`}</Typography>
                )}

                <Box className={classes.group}>
                  <Box className={classes.group}>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>Name</Typography>
                      <Typography>{result.examine.name}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>School</Typography>
                      <Typography>{result.examine.school}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Index Number
                      </Typography>
                      <Typography>{result.examine.index}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>Year</Typography>
                      <Typography>2021</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Subject Stream
                      </Typography>
                      <Typography>{result.examine.subjectStream}</Typography>
                    </Box>
                  </Box>
                  <Divider />

                  <Box className={classes.group}>
                    {result.subjects.map((subject, index) => {
                      return (
                        <Box key={index}>
                          <Box className={classes.resultRow}>
                            <Typography className={classes.key}>
                              {subject.name}
                            </Typography>
                            <Typography>{subject.content.result}</Typography>
                          </Box>

                          <Box className={classes.subjectPartsContainer}>
                            {subject.name === Subject.COMBINED_MATHEMATICS ? (
                              <Box>
                                {/* pure structured */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    Structured (Pure)
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.pureMathematics.marks.structured.marks} out of ${subject.content.pureMathematics.marks.structured.maxMarks}`}
                                  </Typography>
                                </Box>

                                {/* pure essay */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    Essay (Pure)
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.pureMathematics.marks.essay.marks} out of ${subject.content.pureMathematics.marks.essay.maxMarks}`}
                                  </Typography>
                                </Box>

                                {/* applied structured */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    Structured (Applied)
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.appliedMathematics.marks.structured.marks} out of ${subject.content.appliedMathematics.marks.structured.maxMarks}`}
                                  </Typography>
                                </Box>

                                {/* applied essay */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    Essay (Applied)
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.appliedMathematics.marks.essay.marks} out of ${subject.content.appliedMathematics.marks.essay.maxMarks}`}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <Box>
                                {/* mcq */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    MCQ
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.marks.mcq.marks} out of ${subject.content.marks.mcq.maxMarks}`}
                                  </Typography>
                                </Box>

                                {/* structured */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    Structured
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.marks.structured.marks} out of ${subject.content.marks.structured.maxMarks}`}
                                  </Typography>
                                </Box>

                                {/* essay */}
                                <Box className={classes.resultRow}>
                                  <Typography className={classes.key}>
                                    Essay
                                  </Typography>
                                  <Typography>
                                    {`${subject.content.marks.essay.marks} out of ${subject.content.marks.essay.maxMarks}`}
                                  </Typography>
                                </Box>
                              </Box>
                            )}

                            {/* {subject.content &&
                                subject.content.map((part, index) => {
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
                                })} */}
                            <Box className={classes.resultRow}>
                              <Typography className={classes.key}>
                                Total Marks
                              </Typography>
                              <Typography>{`${subject.content.totalMarks}%`}</Typography>
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
                      <Typography>{result.examine.zScore}</Typography>
                    </Box>
                    <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Island Rank
                      </Typography>
                      <Typography>{result.examine.rank}</Typography>
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
