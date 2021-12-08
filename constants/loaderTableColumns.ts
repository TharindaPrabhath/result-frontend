import { GridColDef } from "@mui/x-data-grid";

const nonCombinedMathematics: GridColDef[] = [
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

const combinedMathematics: GridColDef[] = [
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
    field: "pureTotalMarks",
    headerName: "Pure Total Marks",
    width: 180,
    editable: false,
  },
  {
    field: "appliedTotalMarks",
    headerName: "Applied Total Marks",
    width: 180,
    editable: false,
  },
  {
    field: "pm1",
    headerName: "PM-1",
    width: 90,
    editable: false,
  },
  {
    field: "pm2",
    headerName: "PM-2",
    width: 90,
    editable: false,
  },
  {
    field: "pm3",
    headerName: "PM-3",
    width: 90,
    editable: false,
  },
  {
    field: "pm4",
    headerName: "PM-4",
    width: 90,
    editable: false,
  },
  {
    field: "pm5",
    headerName: "PM-5",
    width: 90,
    editable: false,
  },
  {
    field: "pm6",
    headerName: "PM-6",
    width: 90,
    editable: false,
  },
  {
    field: "pm7",
    headerName: "PM-7",
    width: 90,
    editable: false,
  },
  {
    field: "pm8",
    headerName: "PM-8",
    width: 90,
    editable: false,
  },
  {
    field: "pm9",
    headerName: "PM-9",
    width: 90,
    editable: false,
  },
  {
    field: "pm10",
    headerName: "PM-10",
    width: 90,
    editable: false,
  },
  {
    field: "am1",
    headerName: "AM-1",
    width: 90,
    editable: false,
  },
  {
    field: "am2",
    headerName: "AM-2",
    width: 90,
    editable: false,
  },
  {
    field: "am3",
    headerName: "AM-3",
    width: 90,
    editable: false,
  },
  {
    field: "am4",
    headerName: "AM-4",
    width: 90,
    editable: false,
  },
  {
    field: "am5",
    headerName: "AM-5",
    width: 90,
    editable: false,
  },
  {
    field: "am6",
    headerName: "AM-6",
    width: 90,
    editable: false,
  },
  {
    field: "am7",
    headerName: "AM-7",
    width: 90,
    editable: false,
  },
  {
    field: "am8",
    headerName: "AM-8",
    width: 90,
    editable: false,
  },
  {
    field: "am9",
    headerName: "AM-9",
    width: 90,
    editable: false,
  },
  {
    field: "am10",
    headerName: "AM-10",
    width: 90,
    editable: false,
  },
];

const TABLE_COLUMNS = { nonCombinedMathematics, combinedMathematics };

export default TABLE_COLUMNS;
