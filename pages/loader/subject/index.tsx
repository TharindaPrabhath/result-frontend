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

// constants
import { Subject } from "../../../constants/exam";
import TABLE_COLUMNS from "../../../constants/loaderTableColumns";
import uploadSubject from "../../../utils/uploadSubject";

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
  const [subject, setSubject] = useState("");
  const [columns, setColumns] = useState(TABLE_COLUMNS.nonCombinedMathematics);
  const [data, setData] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (subject === Subject.COMBINED_MATHEMATICS)
      setColumns(TABLE_COLUMNS.combinedMathematics);
    else setColumns(TABLE_COLUMNS.nonCombinedMathematics);
  }, [subject]);

  const handleSubjectChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
  };

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

  const handleUpload = () => {
    console.log("Called");
    uploadSubject(data, subject.toLowerCase());
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3">Subject Data Loader</Typography>
      <FormControl sx={{ width: "15em" }}>
        <InputLabel id="subject">Subject</InputLabel>
        <Select
          labelId="subject"
          label="Subject"
          value={subject}
          onChange={handleSubjectChange}
        >
          <MenuItem value={Subject.PHYSICS}>{Subject.PHYSICS}</MenuItem>
          <MenuItem value={Subject.CHEMISTRY}>{Subject.CHEMISTRY}</MenuItem>
          <MenuItem value={Subject.BIOLOGY}>{Subject.BIOLOGY}</MenuItem>
          <MenuItem value={Subject.COMBINED_MATHEMATICS}>
            {Subject.COMBINED_MATHEMATICS}
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
        {!isEmpty(subject) && (
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
