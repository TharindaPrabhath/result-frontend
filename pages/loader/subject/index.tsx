// react
import { createRef, useEffect, useState } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { SelectChangeEvent } from "@mui/material";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";

// utils
import { isEmpty } from "../../../utils";
import readFile from "../../../utils/readFile";

// firebase
import db from "../../../firebase/index";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

// constants
import { EXAM_ID, Paper, Subject } from "../../../constants/exam";
import TABLE_COLUMNS from "../../../constants/loaderTableColumns";

const MAX_TOTAL_MARKS_FOR_MATHS_STRUCTURED = 500;
const MAX_TOTAL_MARKS_FOR_MATHS_ESSAY = 500;
const MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED = 50;
const MAX_MARKS_FOR_SINGLE_MATHS_ESSAY = 150;

const MAX_TOTAL_MARKS_FOR_NON_MATHS_STRUCTURED = 40;
const MAX_TOTAL_MARKS_FOR_NON_MATHS_ESSAY = 60;
const MAX_MARKS_FOR_SINGLE_NON_MATHS_STRUCTURED = 10;
const MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY = 50;

const MAX_TOTAL_MARKS_FOR_MCQ = 40;

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    margin: "3em auto",
    width: "100%",
  },
  button: {
    fontWeight: 600,
  },
}));

export default function SubjectLoader() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const fileImportRef = createRef<HTMLInputElement>();
  const [paper, setPaper] = useState("");
  const [columns, setColumns] = useState(TABLE_COLUMNS.nonMathematics);
  const [papers, setPapers] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (
      paper === Paper.PURE_MATHEMATICS ||
      paper === Paper.APPLIED_MATHEMATICS
    ) {
      setColumns(TABLE_COLUMNS.mathematics);
    } else {
      setColumns(TABLE_COLUMNS.nonMathematics);
    }
  }, [paper]);

  const handlePaperChange = (event: SelectChangeEvent) => {
    setPaper(event.target.value as string);
  };

  const handleFileImport = (e: any) => {
    const f = e.target.files[0];
    setFile(f.name);

    readFile(f)
      .then((res) => {
        setPapers(getData(res as any[]));
      })
      .catch((e) => console.error(e));
  };

  const getData = (arr: any[]): any[] => {
    let out: any[] = [];
    if (
      paper === Paper.PURE_MATHEMATICS ||
      paper === Paper.APPLIED_MATHEMATICS
    ) {
      for (var i = 0; i < arr.length; i++) {
        const el = arr[i];
        out.push({
          id: i + 1,
          index: el.index,
          name: el.name,
          structured: isEmpty(el.structured) ? 0 : el.structured,
          essay: isEmpty(el.essay) ? 0 : el.essay,
          paperTotalMarks: isEmpty(el.paperTotalMarks) ? 0 : el.paperTotalMarks,
          q1: isEmpty(el.q1) ? 0 : el.q1,
          q2: isEmpty(el.q2) ? 0 : el.q2,
          q3: isEmpty(el.q3) ? 0 : el.q3,
          q4: isEmpty(el.q4) ? 0 : el.q4,
          q5: isEmpty(el.q5) ? 0 : el.q5,
          q6: isEmpty(el.q6) ? 0 : el.q6,
          q7: isEmpty(el.q7) ? 0 : el.q7,
          q8: isEmpty(el.q8) ? 0 : el.q8,
          q9: isEmpty(el.q9) ? 0 : el.q9,
          q10: isEmpty(el.q10) ? 0 : el.q10,
          q11: isEmpty(el.q11) ? 0 : el.q11,
          q12: isEmpty(el.q12) ? 0 : el.q12,
          q13: isEmpty(el.q13) ? 0 : el.q13,
          q14: isEmpty(el.q14) ? 0 : el.q14,
          q15: isEmpty(el.q15) ? 0 : el.q15,
          q16: isEmpty(el.q16) ? 0 : el.q16,
          q17: isEmpty(el.q17) ? 0 : el.q17,
        });
      }
    } else if (paper === Paper.PHYSICS) {
      for (var i = 0; i < arr.length; i++) {
        const el = arr[i];

        out.push({
          id: i + 1,
          index: el.index,
          name: el.name,
          totalMarks: isEmpty(el.totalMarks) ? 0 : el.totalMarks,
          result: isEmpty(el.result) ? 0 : el.result,
          zScore: isEmpty(el.zScore) ? "N/A" : el.zScore,
          mcq: isEmpty(el.mcq) ? 0 : el.mcq,
          structured: isEmpty(el.structured) ? 0 : el.structured,
          essay: isEmpty(el.essay) ? 0 : el.essay,
          q1: isEmpty(el.q1) ? 0 : el.q1,
          q2: isEmpty(el.q2) ? 0 : el.q2,
          q3: isEmpty(el.q3) ? 0 : el.q3,
          q4: isEmpty(el.q4) ? 0 : el.q4,
          q5: isEmpty(el.q5) ? 0 : el.q5,
          q6: isEmpty(el.q6) ? 0 : el.q6,
          q7: isEmpty(el.q7) ? 0 : el.q7,
          q8: isEmpty(el.q8) ? 0 : el.q8,
          q9: el.q9A || el.q9B || 0,
          q10: el.q10A || el.q10B || 0,
        });
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        const el = arr[i];

        out.push({
          id: i + 1,
          index: el.index,
          name: el.name,
          totalMarks: isEmpty(el.totalMarks) ? 0 : el.totalMarks,
          result: isEmpty(el.result) ? 0 : el.result,
          zScore: isEmpty(el.zScore) ? "N/A" : el.zScore,
          mcq: isEmpty(el.mcq) ? 0 : el.mcq,
          structured: isEmpty(el.structured) ? 0 : el.structured,
          essay: isEmpty(el.essay) ? 0 : el.essay,
          q1: isEmpty(el.q1) ? 0 : el.q1,
          q2: isEmpty(el.q2) ? 0 : el.q2,
          q3: isEmpty(el.q3) ? 0 : el.q3,
          q4: isEmpty(el.q4) ? 0 : el.q4,
          q5: isEmpty(el.q5) ? 0 : el.q5,
          q6: isEmpty(el.q6) ? 0 : el.q6,
          q7: isEmpty(el.q7) ? 0 : el.q7,
          q8: isEmpty(el.q8) ? 0 : el.q8,
          q9: isEmpty(el.q9) ? 0 : el.q9,
          q10: isEmpty(el.q10) ? 0 : el.q10,
        });
      }
    }

    return out;
  };

  const handleCancel = () => {
    setFile("");
    setPapers([]);
  };

  const handleUpload = () => {
    uploadPapers(papers);
  };

  const uploadPapers = (papers: any[]) => {
    let successCount = 0;
    const collectionRef = collection(db, "subjects");

    if (
      paper === Paper.APPLIED_MATHEMATICS ||
      paper === Paper.PURE_MATHEMATICS
    ) {
      const paperExactly =
        paper === Paper.APPLIED_MATHEMATICS
          ? "appliedMathematics"
          : "pureMathematics";

      papers.forEach(async (paper, index) => {
        // make sure that combined mathematics doc exists or not in the db related to this examine index
        const q = query(
          collectionRef,
          where("examineIndex", "==", paper.index)
        );
        getDocs(q).then((res) => {
          const matchedDocs = res.docs;
          if (matchedDocs.length === 0) {
            console.log(
              `No Combined Maths existing doc was found. Going to create a new one`
            );

            // create a new combined maths doc in subjects collection
            addDoc(collectionRef, {
              examineIndex: paper.index,
              examId: EXAM_ID,
              name: Subject.COMBINED_MATHEMATICS,
              parts: {
                [paperExactly]: {
                  marks: [
                    {
                      name: "structured",
                      marks: paper.structured,
                      maxMarks: MAX_TOTAL_MARKS_FOR_MATHS_STRUCTURED,
                    },
                    {
                      name: "essay",
                      marks: paper.essay,
                      maxMarks: MAX_TOTAL_MARKS_FOR_MATHS_ESSAY,
                    },
                  ],
                  questions: {
                    structured: [
                      {
                        number: 1,
                        marks: paper.q1,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 2,
                        marks: paper.q2,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 3,
                        marks: paper.q3,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 4,
                        marks: paper.q4,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 5,
                        marks: paper.q5,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 6,
                        marks: paper.q6,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 7,
                        marks: paper.q7,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 8,
                        marks: paper.q8,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 9,
                        marks: paper.q9,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                      {
                        number: 10,
                        marks: paper.q10,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                      },
                    ],

                    essay: [
                      {
                        number: 11,
                        marks: paper.q11,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                      {
                        number: 12,
                        marks: paper.q12,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                      {
                        number: 13,
                        marks: paper.q13,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                      {
                        number: 14,
                        marks: paper.q14,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                      {
                        number: 15,
                        marks: paper.q15,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                      {
                        number: 16,
                        marks: paper.q16,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                      {
                        number: 17,
                        marks: paper.q17,
                        maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                      },
                    ],
                  },
                  totalMarks: paper.paperTotalMarks,
                },
              },
            })
              .then(async (res) => {
                successCount++;
                console.log(
                  `Total Succes: ${successCount} ${paper.index} Successfully added Combined Maths Doc. Going to update Examine Doc`
                );

                // updating the relevant examine doc
                const docRef = doc(db, "examines", paper.index.toString());
                setDoc(
                  docRef,
                  {
                    subjects: {
                      combinedMathematics: res.id,
                    },
                  },
                  { merge: true }
                )
                  .then((res) =>
                    console.log(
                      `Successfully updated ${paper.index} Examine Doc `
                    )
                  )
                  .catch((err) => {
                    console.error(`Couldn't update ${paper.index} Examine Doc`);
                    console.error(err);
                  });
              })
              .catch((err) => {
                console.error("Couldn't add Combined Maths Doc");
                console.error(err);
              });
          } else {
            // get first document from the matchedDocs array. (Technically, there should be only one element in that array. otherwise it's an error)
            const docId = matchedDocs[0].id;
            // update this specific document
            const docRef = doc(collectionRef, docId);
            setDoc(
              docRef,
              {
                parts: {
                  [paperExactly]: {
                    marks: [
                      {
                        name: "structured",
                        marks: paper.structured,
                        maxMarks: MAX_TOTAL_MARKS_FOR_MATHS_STRUCTURED,
                      },
                      {
                        name: "essay",
                        marks: paper.essay,
                        maxMarks: MAX_TOTAL_MARKS_FOR_MATHS_ESSAY,
                      },
                    ],
                    questions: {
                      structured: [
                        {
                          number: 1,
                          marks: paper.q1,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 2,
                          marks: paper.q2,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 3,
                          marks: paper.q3,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 4,
                          marks: paper.q4,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 5,
                          marks: paper.q5,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 6,
                          marks: paper.q6,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 7,
                          marks: paper.q7,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 8,
                          marks: paper.q8,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 9,
                          marks: paper.q9,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                        {
                          number: 10,
                          marks: paper.q10,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_STRUCTURED,
                        },
                      ],

                      essay: [
                        {
                          number: 11,
                          marks: paper.q11,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                        {
                          number: 12,
                          marks: paper.q12,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                        {
                          number: 13,
                          marks: paper.q13,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                        {
                          number: 14,
                          marks: paper.q14,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                        {
                          number: 15,
                          marks: paper.q15,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                        {
                          number: 16,
                          marks: paper.q16,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                        {
                          number: 17,
                          marks: paper.q17,
                          maxMarks: MAX_MARKS_FOR_SINGLE_MATHS_ESSAY,
                        },
                      ],
                    },
                    totalMarks: paper.paperTotalMarks,
                  },
                },
              },
              { merge: true }
            )
              .then((res) => {
                successCount++;
                console.log(
                  `Total Succes: ${successCount} ${paper.index} Successfully updated Combined Maths Doc`
                );
              })
              .catch((err) => {
                console.error("Couldn't update Combined Maths Doc");
                console.error(err);
              });
          }
        });
      });
    } else {
      // the paper is Physics or Chemistry or Biology
      let paperExactly = "";
      if (paper === Paper.PHYSICS) paperExactly = "physics";
      else if (paper === Paper.CHEMISTRY) paperExactly = "chemistry";
      else paperExactly = "biology";

      papers.forEach(async (p, index) => {
        addDoc(collectionRef, {
          examineIndex: p.index,
          examId: EXAM_ID,
          name: paper,
          totalMarks: p.totalMarks,
          zScore: p.zScore,
          grade: p.result,
          marks: [
            {
              name: "mcq",
              marks: p.mcq,
              maxMarks: MAX_TOTAL_MARKS_FOR_MCQ,
            },
            {
              name: "structured",
              marks: p.structured,
              maxMarks: MAX_TOTAL_MARKS_FOR_NON_MATHS_STRUCTURED,
            },
            {
              name: "essay",
              marks: p.essay,
              maxMarks: MAX_TOTAL_MARKS_FOR_NON_MATHS_ESSAY,
            },
          ],
          questions: {
            structured: [
              {
                number: 1,
                marks: p.q1,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_STRUCTURED,
              },
              {
                number: 2,
                marks: p.q2,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_STRUCTURED,
              },
              {
                number: 3,
                marks: p.q3,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_STRUCTURED,
              },
              {
                number: 4,
                marks: p.q4,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_STRUCTURED,
              },
            ],

            essay: [
              {
                number: 5,
                marks: p.q5,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY,
              },
              {
                number: 6,
                marks: p.q6,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY,
              },
              {
                number: 7,
                marks: p.q7,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY,
              },
              {
                number: 8,
                marks: p.q8,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY,
              },
              {
                number: 9,
                marks: p.q9,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY,
              },
              {
                number: 10,
                marks: p.q10,
                maxMarks: MAX_MARKS_FOR_SINGLE_NON_MATHS_ESSAY,
              },
            ],
          },
        })
          .then(async (res) => {
            successCount++;
            console.log(
              `Total Succes: ${successCount} ${p.index} Successfully added ${paper} Doc`
            );

            // updating the relevant examine doc
            const docRef = doc(db, "examines", p.index.toString());
            setDoc(
              docRef,
              {
                subjects: {
                  [paperExactly]: res.id,
                },
              },
              { merge: true }
            )
              .then((res) =>
                console.log(`Successfully updated ${p.index} Examine Doc `)
              )
              .catch((err) => {
                console.error(`Couldn't update ${p.index} Examine Doc`);
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(`Couldn't add ${paper} doc`);
            console.error(err);
          });
      });
    }
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3">Subject Data Loader</Typography>
      <FormControl sx={{ width: "15em" }}>
        <InputLabel id="paper">Paper</InputLabel>
        <Select
          labelId="paper"
          label="Paper"
          value={paper}
          onChange={handlePaperChange}
        >
          <MenuItem value={Paper.PHYSICS}>{Paper.PHYSICS}</MenuItem>
          <MenuItem value={Paper.CHEMISTRY}>{Paper.CHEMISTRY}</MenuItem>
          <MenuItem value={Paper.BIOLOGY}>{Paper.BIOLOGY}</MenuItem>
          <MenuItem value={Paper.PURE_MATHEMATICS}>
            {Paper.PURE_MATHEMATICS}
          </MenuItem>
          <MenuItem value={Paper.APPLIED_MATHEMATICS}>
            {Paper.APPLIED_MATHEMATICS}
          </MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          value=""
          ref={fileImportRef}
          onChange={handleFileImport}
          style={{ display: "none" }}
        />
        {!isEmpty(paper) && (
          <>
            <TextField value={file} fullWidth disabled />
            {!isEmpty(file) ? (
              <Button
                className={classes.button}
                variant="contained"
                color="error"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                onClick={() => fileImportRef.current!.click()}
              >
                Import
              </Button>
            )}
          </>
        )}
      </Box>

      {!isEmpty(file) && (
        <Box>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size="1rem" color="secondary" />
              ) : null
            }
          >
            {loading ? "Uploading" : "Upload"}
          </Button>
        </Box>
      )}

      {!isEmpty(file) && (
        <Box style={{ marginTop: "1em", width: "100%" }}>
          <DataGrid
            rows={papers}
            columns={columns}
            //pageSize={5}
            rowsPerPageOptions={[10, 25, 50, 100]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
          />
        </Box>
      )}
    </Box>
  );
}
