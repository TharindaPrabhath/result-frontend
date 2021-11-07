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
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

// utils
import { isEmpty } from "../../utils/index";

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

const columns: GridColDef[] = [
  { field: "id", headerName: "Index", width: 90 },
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
    field: "physics",
    headerName: "Physics",
    width: 100,
    editable: false,
  },
  {
    field: "chemistry",
    headerName: "Chemistry",
    width: 110,
    editable: false,
  },
  {
    field: "combinedMathematics",
    headerName: "Combined Mathematics",
    width: 210,
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

export default function Loader() {
  const [file, setFile] = useState("");
  const fileImportRef = createRef<HTMLInputElement>();
  const [data, setData] = useState<any[]>([]);
  const [stream, setStream] = useState("Physical Science");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

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
        index: d.id.toString(),
        name: d.name,
        school: d.school,
        email: d.email,
        rank: d.rank,
        zScore: d.zScore,
        subjectStream: stream,
        subjects: [
          {
            subject: "Physics",
            result: d.physics,
          },
          {
            subject: "Chemistry",
            result: d.chemistry,
          },
          {
            subject: "Combined Mathematics",
            result: d.combinedMathematics,
          },
        ],
        createdAt: serverTimestamp(),
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
        <Box style={{ width: "100%" }}>
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
              //rowsPerPageOptions={[5]}
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
