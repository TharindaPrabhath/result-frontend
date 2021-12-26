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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
import db from "../firebase/index";

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
    width: "15em",
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
  gradeLetter: {
    backgroundColor: grey[400],
    padding: theme.spacing(0.5),
    width: "2em",
    textAlign: "center",
  },
}));

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const [examine, setExamine] = useState<any | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const classes = useStyles();

  const getAsResults = async (examineDoc: any) => {
    let tempSubjects: any[] = [];
    try {
      if (!isEmpty(examineDoc.subjects?.combinedMathematics)) {
        console.log("Getting combined Maths");
        const combinedMathematicsDoc = await getDoc(
          doc(db, "subjects", examineDoc.subjects?.combinedMathematics)
        );
        tempSubjects.push(combinedMathematicsDoc.data());
      }
      if (!isEmpty(examineDoc.subjects?.physics)) {
        console.log("Getting physics");
        const physicsDoc = await getDoc(
          doc(db, "subjects", examineDoc.subjects?.physics)
        );
        tempSubjects.push(physicsDoc.data());
      }
      if (!isEmpty(examineDoc.subjects?.chemistry)) {
        console.log("Getting chemistry");
        const chemistryDoc = await getDoc(
          doc(db, "subjects", examineDoc.subjects?.chemistry)
        );
        tempSubjects.push(chemistryDoc.data());
      }
      if (!isEmpty(examineDoc.subjects?.biology)) {
        console.log("Getting biology");
        const biologyDoc = await getDoc(
          doc(db, "subjects", examineDoc.subjects?.biology)
        );
        tempSubjects.push(biologyDoc.data());
      }
      console.log("adding");
      setSubjects(tempSubjects);
    } catch (err) {
      console.error("An error occured");
      console.error(err);
    }
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

    // get the relevant examine
    const q = query(
      collection(db, "examines"),
      where("index", "==", parseInt(index))
    );
    getDocs(q)
      .then(async (res) => {
        const docs = res.docs;
        if (docs.length === 0) {
          setError("Invalid index number");
          setLoading(false);
          return;
        }
        const examineDoc = docs[0].data();
        setExamine(examineDoc as any[]);
        getAsResults(examineDoc).finally(() => setLoading(false));
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setIndex("");
    setExamine(null);
    setSubjects([]);
  };

  console.log(examine);
  console.log(subjects);

  const renderSubjects = subjects?.map((subject, index) => {
    return (
      <Box key={index}>
        <Box className={classes.resultRow}>
          <Typography className={classes.key}>{subject?.name}</Typography>
          <Typography className={classes.gradeLetter}>
            {subject?.grade}
          </Typography>
        </Box>
        <Box className={classes.subjectPartsContainer}>
          {subject.name === Subject.COMBINED_MATHEMATICS ? (
            <>
              {subject.parts?.pureMathematics?.marks?.map(
                (mark: any, i: number) => {
                  return (
                    <Box key={i} className={classes.resultRow}>
                      <Typography className={classes.key}>
                        {`${mark?.name} (Pure)`}
                      </Typography>
                      <Typography>
                        {`${mark?.marks}/${mark?.maxMarks}`}
                      </Typography>
                    </Box>
                  );
                }
              )}
              {subject.parts?.appliedMathematics?.marks?.map(
                (mark: any, i: number) => {
                  return (
                    <Box key={i} className={classes.resultRow}>
                      <Typography className={classes.key}>
                        {`${mark?.name} (Applied)`}
                      </Typography>
                      <Typography>
                        {`${mark?.marks}/${mark?.maxMarks}`}
                      </Typography>
                    </Box>
                  );
                }
              )}
            </>
          ) : (
            <>
              {subject.marks?.map((mark: any, i: number) => {
                return (
                  <Box key={i} className={classes.resultRow}>
                    <Typography className={classes.key}>
                      {mark?.name}
                    </Typography>
                    <Typography>
                      {`${mark?.marks}/${mark?.maxMarks}`}
                    </Typography>
                  </Box>
                );
              })}
            </>
          )}
          <Box className={classes.resultRow}>
            <Typography className={classes.key}>Total Marks</Typography>
            <Typography>{`${subject?.totalMarks}%`}</Typography>
          </Box>
          <Accordion sx={{ marginTop: "1em" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>See more</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subject.name === Subject.COMBINED_MATHEMATICS ? (
                <Box>
                  <Grid container>
                    {/* pure */}
                    <Grid item xs={12} md={6}>
                      <Grid item xs={12} md={6}>
                        <Typography textAlign="center">Pure</Typography>
                        {/* structured */}
                        <Stack textAlign="center">
                          <Typography gutterBottom>structured</Typography>
                          <Divider />
                          {subject?.parts?.pureMathematics?.questions?.structured?.map(
                            (q: any, i: number) => {
                              return (
                                <Pair
                                  key={i}
                                  title={`Q ${q?.number}`}
                                  value={`${q?.marks}/${q?.maxMarks}`}
                                />
                              );
                            }
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {/* essay */}
                        <Stack textAlign="center">
                          <Typography gutterBottom>essay</Typography>
                          <Divider />
                          {subject?.parts?.pureMathematics?.questions?.essay?.map(
                            (q: any, i: number) => {
                              return (
                                <Pair
                                  key={i}
                                  title={`Q ${q?.number}`}
                                  value={`${q?.marks}/${q?.maxMarks}`}
                                />
                              );
                            }
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                    {/* applied */}
                    <Grid item xs={12} md={6}>
                      <Grid item xs={12} md={6}>
                        <Typography textAlign="center">Applied</Typography>
                        {/* structured */}
                        <Stack textAlign="center">
                          <Typography gutterBottom>structured</Typography>
                          <Divider />
                          {subject?.parts?.appliedMathematics?.questions?.structured?.map(
                            (q: any, i: number) => {
                              return (
                                <Pair
                                  key={i}
                                  title={`Q ${q?.number}`}
                                  value={`${q?.marks}/${q?.maxMarks}`}
                                />
                              );
                            }
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {/* essay */}
                        <Stack textAlign="center">
                          <Typography gutterBottom>essay</Typography>
                          <Divider />
                          {subject?.parts?.appliedMathematics?.questions?.essay?.map(
                            (q: any, i: number) => {
                              return (
                                <Pair
                                  key={i}
                                  title={`Q ${q?.number}`}
                                  value={`${q?.marks}/${q?.maxMarks}`}
                                />
                              );
                            }
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {/* structured */}
                    <Stack textAlign="center">
                      <Typography gutterBottom>structured</Typography>
                      <Divider />
                      <Stack justifyContent="center" alignItems="center">
                        {subject?.questions?.structured?.map(
                          (q: any, i: number) => {
                            return (
                              <Pair
                                key={i}
                                title={`Q ${q?.number}`}
                                value={`${q?.marks}/${q?.maxMarks}`}
                              />
                            );
                          }
                        )}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* essay */}
                    <Stack textAlign="center">
                      <Typography gutterBottom>essay</Typography>
                      <Divider />
                      <Stack justifyContent="center" alignItems="center">
                        {subject?.questions?.essay?.map((q: any, i: number) => {
                          return (
                            <Pair
                              key={i}
                              title={`Q ${q?.number}`}
                              value={`${q?.marks} /${q?.maxMarks}`}
                            />
                          );
                        })}
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    );
  });

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
          {subjects.length !== 0 && (
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
        {examine && (
          <Box marginBottom="2em">
            <Box className={classes.group}>
              <Box className={classes.group}>
                <Box className={classes.resultRow}>
                  <Typography className={classes.key}>Name</Typography>
                  <Typography>{examine?.name}</Typography>
                </Box>
                {/* <Box className={classes.resultRow}>
                      <Typography className={classes.key}>School</Typography>
                      <Typography>{examine?.school}</Typography>
                    </Box> */}
                <Box className={classes.resultRow}>
                  <Typography className={classes.key}>Index Number</Typography>
                  <Typography>{examine?.index}</Typography>
                </Box>
                <Box className={classes.resultRow}>
                  <Typography className={classes.key}>Year</Typography>
                  <Typography>2021</Typography>
                </Box>
                <Box className={classes.resultRow}>
                  <Typography className={classes.key}>
                    Subject Stream
                  </Typography>
                  <Typography>{examine?.stream}</Typography>
                </Box>
              </Box>
              <Divider />

              {/* subjects details */}
              {renderSubjects}

              <Divider />
              <Box className={classes.group}>
                <Box className={classes.resultRow}>
                  <Typography className={classes.key}>Z-Score</Typography>
                  <Typography>{examine?.zScore}</Typography>
                </Box>
                {/* <Box className={classes.resultRow}>
                      <Typography className={classes.key}>
                        Island Rank
                      </Typography>
                      <Typography>{result.examine.rank}</Typography>
                    </Box> */}
              </Box>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Home;

const Pair = ({ title, value }: { title: string; value: string }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" gap={theme.spacing(5)}>
      <Typography minWidth="5em" variant="caption">
        {title}
      </Typography>
      <Typography variant="caption">{value}</Typography>
    </Stack>
  );
};
