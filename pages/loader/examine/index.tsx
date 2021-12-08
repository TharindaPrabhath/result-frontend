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
import uploadExamines from "../../../utils/uploadExamines";

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
  const [data, setData] = useState<any[]>([]);
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

  const handleCancel = () => {
    setFile("");
    setData([]);
  };

  const handleUpload = async () => {
    uploadExamines(data);
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3">Subject Data Loader</Typography>
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
            rows={data}
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
