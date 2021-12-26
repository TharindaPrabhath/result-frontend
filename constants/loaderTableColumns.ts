import { GridColDef } from "@mui/x-data-grid";

const nonMathematics: GridColDef[] = [
  { field: "id", headerName: "Id", width: 20 },
  { field: "index", headerName: "Index", width: 120 },
  {
    field: "result",
    headerName: "Result",
    width: 100,
    editable: false,
  },
  {
    field: "totalMarks",
    headerName: "Total Marks",
    width: 140,
    editable: false,
  },
  {
    field: "mcq",
    headerName: "MCQ",
    width: 80,
    editable: false,
  },
  {
    field: "structured",
    headerName: "Structured",
    width: 80,
    editable: false,
  },
  {
    field: "essay",
    headerName: "Essay",
    width: 80,
    editable: false,
  },
  {
    field: "q1",
    headerName: "1",
    width: 80,
    editable: false,
  },
  {
    field: "q2",
    headerName: "2",
    width: 80,
    editable: false,
  },
  {
    field: "q3",
    headerName: "3",
    width: 80,
    editable: false,
  },
  {
    field: "q4",
    headerName: "4",
    width: 80,
    editable: false,
  },
  {
    field: "q5",
    headerName: "5",
    width: 80,
    editable: false,
  },
  {
    field: "q6",
    headerName: "6",
    width: 80,
    editable: false,
  },
  {
    field: "q7",
    headerName: "7",
    width: 80,
    editable: false,
  },
  {
    field: "q8",
    headerName: "8",
    width: 80,
    editable: false,
  },
  {
    field: "q9",
    headerName: "9",
    width: 80,
    editable: false,
  },
  {
    field: "q10",
    headerName: "10",
    width: 80,
    editable: false,
  },
];

const mathematics: GridColDef[] = [
  { field: "id", headerName: "Id", width: 20 },
  { field: "index", headerName: "Index", width: 120 },
  {
    field: "paperTotalMarks",
    headerName: "Paper Total Marks",
    width: 180,
    editable: false,
  },
  {
    field: "structured",
    headerName: "Structured Total Marks",
    width: 80,
    editable: false,
  },
  {
    field: "essay",
    headerName: "Essay Total Marks",
    width: 80,
    editable: false,
  },
  {
    field: "q1",
    headerName: "1",
    width: 90,
    editable: false,
  },
  {
    field: "q2",
    headerName: "2",
    width: 90,
    editable: false,
  },
  {
    field: "q3",
    headerName: "3",
    width: 90,
    editable: false,
  },
  {
    field: "q4",
    headerName: "4",
    width: 90,
    editable: false,
  },
  {
    field: "q5",
    headerName: "5",
    width: 90,
    editable: false,
  },
  {
    field: "q6",
    headerName: "6",
    width: 90,
    editable: false,
  },
  {
    field: "q7",
    headerName: "7",
    width: 90,
    editable: false,
  },
  {
    field: "q8",
    headerName: "8",
    width: 90,
    editable: false,
  },
  {
    field: "q9",
    headerName: "9",
    width: 90,
    editable: false,
  },
  {
    field: "q10",
    headerName: "10",
    width: 90,
    editable: false,
  },
  {
    field: "q11",
    headerName: "11",
    width: 90,
    editable: false,
  },
  {
    field: "q12",
    headerName: "12",
    width: 90,
    editable: false,
  },
  {
    field: "q13",
    headerName: "13",
    width: 90,
    editable: false,
  },
  {
    field: "q14",
    headerName: "14",
    width: 90,
    editable: false,
  },
  {
    field: "q15",
    headerName: "15",
    width: 90,
    editable: false,
  },
  {
    field: "q16",
    headerName: "16",
    width: 90,
    editable: false,
  },
  {
    field: "q17",
    headerName: "17",
    width: 90,
    editable: false,
  },
];

const TABLE_COLUMNS = { nonMathematics, mathematics };

export default TABLE_COLUMNS;
