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
import uploadSubject from "../../../utils/uploadSubject";

// constants
import { Paper } from "../../../constants/exam";
import TABLE_COLUMNS from "../../../constants/loaderTableColumns";

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
  const [paper, setPaper] = useState("");
  const [columns, setColumns] = useState(TABLE_COLUMNS.nonMathematics);
  const [data, setData] = useState<any[]>([]);
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
        setData(getData(res as any[]));
      })
      .catch((e) => console.error(e));
  };

  const getData = (arr: any[]): any[] => {
    let out: any[] = [];
    for (var i = 0; i < arr.length; i++) {
      const el = arr[i];
      out.push({
        id: i + 1,
        index: el.index,
        name: el.name,
        totalMarks: el.totalMarks,
        result: el.result,
        mcq: el.mcq,
        structured: el.structured,
        essay: el.essay,
        q1: el.q1,
        q2: el.q2,
        q3: el.q3,
        q4: el.q4,
        q5: el.q5,
        q6: el.q6,
        q7: el.q7,
        q8: el.q8,
        q9: el.q9A || el.q9B || el.q9,
        q10: el.q10A || el.q10B || el.q10,
      });
    }
    return out;
  };

  const handleCancel = () => {
    setFile("");
    setData([]);
  };

  const handleUpload = () => {
    uploadSubject(data, paper);
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
