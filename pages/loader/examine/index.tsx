// react
import { createRef, useState } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// utils
import { isEmpty } from "../../../utils";
import readFile from "../../../utils/readFile";

// firebase
import db from "../../../firebase/index";
import { doc, setDoc } from "firebase/firestore";

// constants
import { EXAM_ID } from "../../../constants/exam";

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

export default function ExamineLoader() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const fileImportRef = createRef<HTMLInputElement>();
  const [examines, setExamines] = useState<any[]>([]);
  const classes = useStyles();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 20 },
    { field: "index", headerName: "Index", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: false,
    },
    {
      field: "stream",
      headerName: "Stream",
      width: 250,
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
        setExamines(getDataForTable(res as any[]));
      })
      .catch((e) => console.error(e));
  };

  const getDataForTable = (arr: any[]): any[] => {
    let out: any[] = [];
    for (var i = 0; i < arr.length; i++) {
      const el = arr[i];
      out.push({
        id: i + 1,
        index: el.index,
        name: isEmpty(el.name) ? `Unknown${i + 1}` : el.name,
        stream: isEmpty(el.stream) ? "N/A" : el.stream,
        zScore: isEmpty(el.zScore) ? "N/A" : el.zScore,
        rank: isEmpty(el.rank) ? "N/A" : el.rank,
      });
    }
    return out;
  };

  const handleCancel = () => {
    setFile("");
    setExamines([]);
  };

  const handleUpload = async () => {
    uploadExamines(examines);
  };

  const uploadExamines = (examines: any[]) => {
    let successCount = 0;
    examines.forEach(async (examine, index) => {
      // add each examine to its own doc
      const docRef = doc(db, "examines", examine.index.toString());
      setDoc(docRef, {
        index: examine.index,
        examId: EXAM_ID,
        name: examine.name,
        stream: examine.stream,
        zScore: examine.zScore,
        rank: examine.rank,
      })
        .then((res) => {
          successCount++;
          console.log(`Total Success - ${successCount} ${examine.index} added`);
        })
        .catch((err) => {
          console.error(`${examine.index} failed to add`);
          console.error(err);
        });
    });
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3">Examine Data Loader</Typography>
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
            rows={examines}
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
