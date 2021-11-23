export const TEST_NAME = "Learnsteer Test - 2021";

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
