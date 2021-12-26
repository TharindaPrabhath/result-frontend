// react
import { createRef, useState } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// utils
import readFile from "../../../utils/readFile";
import { isEmpty } from "../../../utils";

// firebase
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../../../firebase/index";

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

function CombinedMathematics() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const fileImportRef = createRef<HTMLInputElement>();
  const [data, setData] = useState<any[]>([]);
  const classes = useStyles();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 20 },
    { field: "index", headerName: "Index", width: 120 },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      editable: false,
    },
    {
      field: "total",
      headerName: "C Maths Total",
      width: 250,
      editable: false,
    },
    {
      field: "result",
      headerName: "Result",
      width: 100,
      editable: false,
    },
    {
      field: "zScore",
      headerName: "Z-Score",
      width: 100,
      editable: false,
    },
  ];

  const handleFileImport = (e: any) => {
    const f = e.target.files[0];
    setFile(f.name);

    readFile(f)
      .then((res) => {
        setData(getDataForTable(res as any[]));
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
        total: isEmpty(el.total) ? 0 : el.total,
        zScore: isEmpty(el.zScore) ? "N/A" : el.zScore,
        result: isEmpty(el.result) ? "(IWE)" : el.result,
      });
    }
    return out;
  };

  const handleCancel = () => {
    setFile("");
    setData([]);
  };

  const handleUpload = () => {
    updateCombinedMathsDocs(data);
  };

  const updateCombinedMathsDocs = async (arr: any[]) => {
    let successCount = 0;
    arr.forEach(async (item, index) => {
      // update each Combined Maths doc in subjects collection
      const q = query(
        collection(db, "subjects"),
        where("examineIndex", "==", parseInt(item.index))
      );
      const res = await getDocs(q);
      if (res.docs.length === 0) {
        console.error(
          `No C Maths Doc was found related to ${item.index} examine`
        );
      } else {
        const document = res.docs[0];

        // update the doc
        await setDoc(
          doc(db, "subjects", document.id),
          {
            totalMarks: item.total,
            grade: item.result,
            zScore: item.zScore,
          },
          { merge: true }
        );
        successCount++;
        console.log(
          `Total Success: ${successCount} Successfully updated ${item.index} examine's C Maths Doc`
        );
      }
    });
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3">
        Combined Maths (Finalized) Data Loader
      </Typography>
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

export default CombinedMathematics;
