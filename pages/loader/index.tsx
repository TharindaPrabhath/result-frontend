// react
import { createRef, useState } from "react";

// mui
import {
  Typography,
  Box,
  Theme,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// xlsx
import XLSX from "xlsx";

// firebase
import { db } from "../../firebase/index";
import { addDoc, collection } from "@firebase/firestore";

// utils
import { isEmpty } from "../../utils/index";

// constants
import { CUT_OFF_MARKS, Subject } from "../../constants/exam";

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    margin: "3em auto",
  },
  button: {
    fontWeight: 600,
  },
}));

const readFile = (file: any) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target!.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const worksheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      resolve(data);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
  return promise;
};

const calculateTotalMarks = (
  part1: number,
  part2: number,
  subject: Subject
): number => {
  if (subject === Subject.COMBINED_MATHEMATICS) {
    return Math.round((part1 + part2) / 20);
  }
  return part1 + part2;
};

const calculateResult = (totalMarks: number, subject: Subject): string => {
  switch (subject) {
    case Subject.PHYSICS:
      if (totalMarks >= CUT_OFF_MARKS.PHYSICS.A) return "A";
      else if (totalMarks >= CUT_OFF_MARKS.PHYSICS.B) return "B";
      else if (totalMarks >= CUT_OFF_MARKS.PHYSICS.C) return "C";
      else if (totalMarks >= CUT_OFF_MARKS.PHYSICS.S) return "S";
      return "F";

    case Subject.CHEMISTRY:
      if (totalMarks >= CUT_OFF_MARKS.CHEMISTRY.A) return "A";
      else if (totalMarks >= CUT_OFF_MARKS.CHEMISTRY.B) return "B";
      else if (totalMarks >= CUT_OFF_MARKS.CHEMISTRY.C) return "C";
      else if (totalMarks >= CUT_OFF_MARKS.CHEMISTRY.S) return "S";
      return "F";

    case Subject.COMBINED_MATHEMATICS:
      if (totalMarks >= CUT_OFF_MARKS.COMBINED_MATHEMATICS.A) return "A";
      else if (totalMarks >= CUT_OFF_MARKS.COMBINED_MATHEMATICS.B) return "B";
      else if (totalMarks >= CUT_OFF_MARKS.COMBINED_MATHEMATICS.C) return "C";
      else if (totalMarks >= CUT_OFF_MARKS.COMBINED_MATHEMATICS.S) return "S";
      return "F";

    case Subject.BIOLOGY:
      if (totalMarks >= CUT_OFF_MARKS.BIOLOGY.A) return "A";
      else if (totalMarks >= CUT_OFF_MARKS.BIOLOGY.B) return "B";
      else if (totalMarks >= CUT_OFF_MARKS.BIOLOGY.C) return "C";
      else if (totalMarks >= CUT_OFF_MARKS.BIOLOGY.S) return "S";
      return "F";
  }
};

export default function Loader() {
  const [file, setFile] = useState("");
  const fileImportRef = createRef<HTMLInputElement>();
  const [data, setData] = useState<any[]>([]);
  const [stream, setStream] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 20 },
    { field: "index", headerName: "Index", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "school",
      headerName: "School",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
    },
    {
      field: "physicsPart1",
      headerName: "Physics MCQ",
      width: 160,
      editable: false,
    },
    {
      field: "physicsPart2",
      headerName: "Physics Essay",
      width: 160,
      editable: false,
    },
    {
      field: "chemistryPart1",
      headerName: "Chemistry MCQ",
      width: 160,
      editable: false,
    },
    {
      field: "chemistryPart2",
      headerName: "Chemistry Essay",
      width: 160,
      editable: false,
    },
    {
      field:
        stream === "Physical Science"
          ? "combinedMathematicsPart1"
          : "biologyPart1",
      headerName:
        stream === "Physical Science"
          ? "Combined Mathematics Part 1"
          : "Biology MCQ",
      width: stream === "Physical Science" ? 250 : 160,
      editable: false,
    },
    {
      field:
        stream === "Physical Science"
          ? "combinedMathematicsPart2"
          : "biologyPart2",
      headerName:
        stream === "Physical Science"
          ? "Combined Mathematics Part 2"
          : "Biology Essay",
      width: stream === "Physical Science" ? 250 : 160,
      editable: false,
    },
    {
      field: "zScore",
      headerName: "Z-Score",
      width: 100,
      editable: false,
    },
    {
      field: "rank",
      headerName: "Rank",
      width: 100,
      editable: false,
    },
  ];

  const handleFileImport = (e: any) => {
    const f = e.target.files[0];
    setFile(f.name);

    readFile(f)
      .then((res) => {
        setData(res as any[]);
      })
      .catch((e) => console.error(e));
  };

  const uploadToFirebase = () => {
    data.forEach(async (d) => {
      setLoading(true);
      await addDoc(collection(db, "examines"), {
        index: d.index.toString(),
        name: d.name,
        school: d.school,
        email: d.email,
        rank: d.rank,
        zScore: d.zScore,
        subjectStream: stream,
        subjects: [
          {
            subject: "Physics",
            result: calculateResult(
              calculateTotalMarks(
                d.physicsPart1,
                d.physicsPart2,
                Subject.PHYSICS
              ),
              Subject.PHYSICS
            ),
            totalMarks: calculateTotalMarks(
              d.physicsPart1,
              d.physicsPart2,
              Subject.PHYSICS
            ),
            parts: [
              {
                name: "MCQ",
                marks: d.physicsPart1,
              },
              {
                name: "Essay",
                marks: d.physicsPart2,
              },
            ],
          },
          {
            subject: "Chemistry",
            result: calculateResult(
              calculateTotalMarks(
                d.chemistryPart1,
                d.chemistryPart2,
                Subject.CHEMISTRY
              ),
              Subject.CHEMISTRY
            ),
            totalMarks: calculateTotalMarks(
              d.chemistryPart1,
              d.chemistryPart2,
              Subject.CHEMISTRY
            ),
            parts: [
              {
                name: "MCQ",
                marks: d.chemistryPart1,
              },
              {
                name: "Essay",
                marks: d.chemistryPart2,
              },
            ],
          },
          {
            subject:
              stream === "Physical Science"
                ? "Combined Mathematics"
                : "Biology",
            result:
              stream === "Physical Science"
                ? calculateResult(
                    calculateTotalMarks(
                      d.combinedMathematicsPart1,
                      d.combinedMathematicsPart2,
                      Subject.COMBINED_MATHEMATICS
                    ),
                    Subject.COMBINED_MATHEMATICS
                  )
                : calculateResult(
                    calculateTotalMarks(
                      d.biologyPart1,
                      d.biologyPart2,
                      Subject.BIOLOGY
                    ),
                    Subject.BIOLOGY
                  ),
            totalMarks:
              stream === "Physical Science"
                ? calculateTotalMarks(
                    d.combinedMathematicsPart1,
                    d.combinedMathematicsPart2,
                    Subject.COMBINED_MATHEMATICS
                  )
                : calculateTotalMarks(
                    d.biologyPart1,
                    d.biologyPart2,
                    Subject.BIOLOGY
                  ),
            parts: [
              {
                name: stream === "Physical Science" ? "Part 1" : "MCQ",
                marks:
                  stream === "Physical Science"
                    ? d.combinedMathematicsPart1
                    : d.biologyPart1,
              },
              {
                name: stream === "Physical Science" ? "Part 2" : "Essay",
                marks:
                  stream === "Physical Science"
                    ? d.combinedMathematicsPart2
                    : d.biologyPart2,
              },
            ],
          },
        ],
      })
        .then(() => {
          console.log(d.id + " Successfully added");
        })
        .catch((e) => {
          console.error(`${d.id} -> an error happened: ${e}`);
        });
    });

    setLoading(false);
  };

  const handleCancel = () => {
    setStream("");
    setFile("");
    setData([]);
  };

  const handleSubjectStream = (event: SelectChangeEvent) => {
    setStream(event.target.value as string);
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3">Data Loader</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: "15em" }}>
          <InputLabel id="stream">Subject Stream</InputLabel>
          <Select
            labelId="stream"
            label="Subject Stream"
            value={stream}
            onChange={handleSubjectStream}
          >
            <MenuItem value="Physical Science">Physical Science</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
          </Select>
        </FormControl>
        {!isEmpty(stream) && (
          <>
            <input
              type="file"
              value=""
              ref={fileImportRef}
              onChange={handleFileImport}
              style={{ display: "none" }}
            />
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
        <Box style={{ width: "100%" }}>
          {!isEmpty(stream) && (
            <Button
              className={classes.button}
              variant="contained"
              onClick={uploadToFirebase}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size="1rem" color="secondary" />
                ) : null
              }
            >
              {loading ? "Uploading" : "Upload"}
            </Button>
          )}

          <Box style={{ marginTop: "1em" }}>
            <DataGrid
              rows={data}
              columns={columns}
              //pageSize={5}
              rowsPerPageOptions={[10, 25, 50, 100]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
