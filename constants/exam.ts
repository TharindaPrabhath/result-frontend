export const TEST_NAME = "G.C.E A/L Island Wide Model Test";

export const EXAM_ID = "EQONmHgQK6Osc5a6KBkB";

export interface ResultLetter {
  A: number;
  B: number;
  C: number;
  S: number;
}

export enum Subject {
  PHYSICS = "Physics",
  CHEMISTRY = "Chemistry",
  COMBINED_MATHEMATICS = "Combined Mathematics",
  BIOLOGY = "Biology",
}

export enum Paper {
  PHYSICS = "Physics",
  CHEMISTRY = "Chemistry",
  BIOLOGY = "Biology",
  PURE_MATHEMATICS = "Pure Mathematics",
  APPLIED_MATHEMATICS = "Applied Mathematics",
}

const PHYSICS: ResultLetter = {
  A: 75,
  B: 65,
  C: 55,
  S: 35,
};

const CHEMISTRY: ResultLetter = {
  A: 75,
  B: 65,
  C: 55,
  S: 35,
};

const COMBINED_MATHEMATICS: ResultLetter = {
  A: 75,
  B: 65,
  C: 55,
  S: 35,
};

const BIOLOGY: ResultLetter = {
  A: 75,
  B: 65,
  C: 55,
  S: 35,
};

export const CUT_OFF_MARKS = {
  PHYSICS,
  CHEMISTRY,
  COMBINED_MATHEMATICS,
  BIOLOGY,
};
