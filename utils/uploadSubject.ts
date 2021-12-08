// firebase
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index";

// utils
import { generateExamineId, generateSubjectId } from "./index";

// constants
import { Paper, Subject } from "../constants/exam";

const MAX_MCQ_TOTAL_MARKS = 50;
const MAX_STRUCTURED_TOTAL_MARKS = 40;
const MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS = 40;
const MAX_ESSAY_TOTAL_MARKS = 60;
const MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS = 40;

const MAX_SINGLE_STRUCTURED_MARKS = 10;
const MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS = 50;
const MAX_SINGLE_ESSAY_MARKS = 15;
const MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS = 150;

const uploadSubject = (data: any[], paper: string) => {
  switch (paper) {
    case Paper.PHYSICS:
      console.log("Here in physics");
      handleNotCMaths(data, Subject.PHYSICS);
      break;

    case Paper.CHEMISTRY:
      console.log("Here in chemistry");
      handleNotCMaths(data, Subject.CHEMISTRY);
      break;

    case Paper.BIOLOGY:
      console.log("Here in biology");
      handleNotCMaths(data, Subject.BIOLOGY);
      break;

    case Paper.PURE_MATHEMATICS:
      console.log("Here in pure");
      handlePureMathematics(data);
      break;

    case Paper.APPLIED_MATHEMATICS:
      console.log("Here in applied");
      handleAppliedMathematics(data);
      break;

    default:
      return;
  }
};

export default uploadSubject;

const handleNotCMaths = (data: any[], subject: string) => {
  let successCount = 0;
  let failCount = 0;
  data.forEach(async (d) => {
    const examineId = generateExamineId(d.index.toString(), d.name);
    const subjectId = generateSubjectId(d.index.toString(), d.name, subject);
    const docRef = doc(db, subject.toLowerCase(), subjectId);
    await setDoc(docRef, {
      examine: examineId,
      result: d.result,
      totalMarks: d.totalMarks,
      marks: {
        mcq: {
          marks: d.mcq,
          maxMarks: MAX_MCQ_TOTAL_MARKS,
        },
        structured: {
          marks: d.structured,
          maxMarks: MAX_STRUCTURED_TOTAL_MARKS,
        },
        essay: {
          marks: d.essay,
          maxMarks: MAX_ESSAY_TOTAL_MARKS,
        },
      },
      questions: {
        structured: [
          {
            question: 1,
            marks: d.q1,
            maxMarks: MAX_SINGLE_STRUCTURED_MARKS,
          },
          {
            question: 2,
            marks: d.q2,
            maxMarks: MAX_SINGLE_STRUCTURED_MARKS,
          },
          {
            question: 3,
            marks: d.q3,
            maxMarks: MAX_SINGLE_STRUCTURED_MARKS,
          },
          {
            question: 4,
            marks: d.q4,
            maxMarks: MAX_SINGLE_STRUCTURED_MARKS,
          },
        ],

        essay: [
          {
            question: 5,
            marks: d.q5,
            maxMarks: MAX_SINGLE_ESSAY_MARKS,
          },
          {
            question: 6,
            marks: d.q6,
            maxMarks: MAX_SINGLE_ESSAY_MARKS,
          },
          {
            question: 7,
            marks: d.q7,
            maxMarks: MAX_SINGLE_ESSAY_MARKS,
          },
          {
            question: 8,
            marks: d.q8,
            maxMarks: MAX_SINGLE_ESSAY_MARKS,
          },
          {
            question: 9,
            marks: d.q9,
            maxMarks: MAX_SINGLE_ESSAY_MARKS,
          },
          {
            question: 10,
            marks: d.q10,
            maxMarks: MAX_SINGLE_ESSAY_MARKS,
          },
        ],
      },
    })
      .then(() => {
        successCount++;
        console.log(
          `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${docRef.id}`
        );

        updateExamineDoc(examineId, subjectId, subject);
      })
      .catch((e) => {
        failCount++;
        console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
      });
  });
};

const handleCMaths = (data: any[]) => {
  let successCount = 0;
  let failCount = 0;
  data.forEach(async (d) => {
    const examineId = generateExamineId(d.index.toString(), d.name);
    const subjectId = generateSubjectId(
      d.index.toString(),
      d.name,
      Subject.COMBINED_MATHEMATICS
    );
    const docRef = doc(db, "combinedMathematics", subjectId);

    await setDoc(docRef, {
      examine: examineId,
      result: d.result,
      totalMarks: d.totalMarks,
      pureMathematics: {
        marks: {
          structured: {
            marks: d.pm_structured,
            maxMarks: MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS,
          },
          essay: {
            marks: d.pm_essay,
            maxMarks: MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS,
          },
        },
        questions: {
          structured: [
            {
              question: 1,
              marks: d.pm1,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 2,
              marks: d.pm2,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 3,
              marks: d.pm3,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 4,
              marks: d.pm4,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 5,
              marks: d.pm5,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 6,
              marks: d.pm6,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 7,
              marks: d.pm7,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 8,
              marks: d.pm8,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 9,
              marks: d.pm9,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 10,
              marks: d.pm10,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
          ],

          essay: [
            {
              question: 11,
              marks: d.pm11,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 12,
              marks: d.pm12,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 13,
              marks: d.pm13,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 14,
              marks: d.pm14,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 15,
              marks: d.pm15,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 16,
              marks: d.pm16,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 17,
              marks: d.pm17,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
          ],
        },
      },
    })
      .then(() => {
        successCount++;
        console.log(
          `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${docRef.id}`
        );

        updateExamineDoc(examineId, subjectId, Subject.COMBINED_MATHEMATICS);
      })
      .catch((e) => {
        failCount++;
        console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
      });
  });
};

const handlePureMathematics = (data: any[]) => {
  let successCount = 0;
  let failCount = 0;

  data.forEach(async (d) => {
    const examineId = generateExamineId(d.index.toString(), d.name);
    const subjectId = generateSubjectId(
      d.index.toString(),
      d.name,
      Subject.COMBINED_MATHEMATICS
    );

    getDoc(doc(db, "combinedMathematics", subjectId)).then((subject) => {
      if (subject.exists()) {
        setDoc(
          doc(db, "combinedMathematics", subjectId),
          {
            pureMathematics: {
              totalMarks: d.paperTotalMarks,
              marks: {
                structured: {
                  marks: d.structured,
                  maxMarks: MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS,
                },
                essay: {
                  marks: d.essay,
                  maxMarks: MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS,
                },
              },
              questions: {
                structured: [
                  {
                    question: 1,
                    marks: d.q1,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 2,
                    marks: d.q2,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 3,
                    marks: d.q3,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 4,
                    marks: d.q4,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 5,
                    marks: d.q5,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 6,
                    marks: d.q6,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 7,
                    marks: d.q7,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 8,
                    marks: d.q8,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 9,
                    marks: d.q9,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 10,
                    marks: d.q10,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                ],

                essay: [
                  {
                    question: 11,
                    marks: d.q11,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 12,
                    marks: d.q12,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 13,
                    marks: d.q13,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 14,
                    marks: d.q14,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 15,
                    marks: d.q15,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 16,
                    marks: d.q16,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 17,
                    marks: d.q17,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                ],
              },
            },
          },
          { merge: true }
        )
          .then(() => {
            successCount++;
            console.log(
              `${successCount} - ${d.id} : ${d.index} SUCCESS (UPDATE) -> ${subjectId}`
            );
          })
          .catch((e) => {
            failCount++;
            console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
          });
      } else {
        setDoc(
          doc(db, "combinedMathematics", subjectId),
          {
            examine: examineId,
            result: d.result,
            totalMarks: d.totalMarks,
            pureMathematics: {
              totalMarks: d.paperTotalMarks,
              marks: {
                structured: {
                  marks: d.structured,
                  maxMarks: MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS,
                },
                essay: {
                  marks: d.essay,
                  maxMarks: MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS,
                },
              },
              questions: {
                structured: [
                  {
                    question: 1,
                    marks: d.q1,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 2,
                    marks: d.q2,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 3,
                    marks: d.q3,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 4,
                    marks: d.q4,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 5,
                    marks: d.q5,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 6,
                    marks: d.q6,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 7,
                    marks: d.q7,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 8,
                    marks: d.q8,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 9,
                    marks: d.q9,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 10,
                    marks: d.q10,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                ],

                essay: [
                  {
                    question: 11,
                    marks: d.q11,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 12,
                    marks: d.q12,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 13,
                    marks: d.q13,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 14,
                    marks: d.q14,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 15,
                    marks: d.q15,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 16,
                    marks: d.q16,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 17,
                    marks: d.q17,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                ],
              },
            },
          },
          { merge: true }
        )
          .then(() => {
            successCount++;
            console.log(
              `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${subjectId}`
            );

            updateExamineDoc(
              examineId,
              subjectId,
              Subject.COMBINED_MATHEMATICS
            );
          })
          .catch((e) => {
            failCount++;
            console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
          });
      }
    });
  });
};

const handleAppliedMathematics = (data: any[]) => {
  let successCount = 0;
  let failCount = 0;

  data.forEach(async (d) => {
    const examineId = generateExamineId(d.index.toString(), d.name);
    const subjectId = generateSubjectId(
      d.index.toString(),
      d.name,
      Subject.COMBINED_MATHEMATICS
    );

    getDoc(doc(db, "combinedMathematics", subjectId)).then((subject) => {
      if (subject.exists()) {
        setDoc(
          doc(db, "combinedMathematics", subjectId),
          {
            appliedMathematics: {
              totalMarks: d.paperTotalMarks,
              marks: {
                structured: {
                  marks: d.structured,
                  maxMarks: MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS,
                },
                essay: {
                  marks: d.essay,
                  maxMarks: MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS,
                },
              },
              questions: {
                structured: [
                  {
                    question: 1,
                    marks: d.q1,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 2,
                    marks: d.q2,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 3,
                    marks: d.q3,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 4,
                    marks: d.q4,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 5,
                    marks: d.q5,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 6,
                    marks: d.q6,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 7,
                    marks: d.q7,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 8,
                    marks: d.q8,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 9,
                    marks: d.q9,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 10,
                    marks: d.q10,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                ],

                essay: [
                  {
                    question: 11,
                    marks: d.q11,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 12,
                    marks: d.q12,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 13,
                    marks: d.q13,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 14,
                    marks: d.q14,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 15,
                    marks: d.q15,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 16,
                    marks: d.q16,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 17,
                    marks: d.q17,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                ],
              },
            },
          },
          { merge: true }
        )
          .then(() => {
            successCount++;
            console.log(
              `${successCount} - ${d.id} : ${d.index} SUCCESS (UPDATE) -> ${subjectId}`
            );
          })
          .catch((e) => {
            failCount++;
            console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
          });
      } else {
        setDoc(
          doc(db, "combinedMathematics", subjectId),
          {
            examine: examineId,
            result: d.result,
            totalMarks: d.totalMarks,
            appliedMathematics: {
              totalMarks: d.paperTotalMarks,
              marks: {
                structured: {
                  marks: d.structured,
                  maxMarks: MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS,
                },
                essay: {
                  marks: d.essay,
                  maxMarks: MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS,
                },
              },
              questions: {
                structured: [
                  {
                    question: 1,
                    marks: d.q1,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 2,
                    marks: d.q2,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 3,
                    marks: d.q3,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 4,
                    marks: d.q4,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 5,
                    marks: d.q5,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 6,
                    marks: d.q6,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 7,
                    marks: d.q7,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 8,
                    marks: d.q8,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 9,
                    marks: d.q9,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                  {
                    question: 10,
                    marks: d.q10,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
                  },
                ],

                essay: [
                  {
                    question: 11,
                    marks: d.q11,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 12,
                    marks: d.q12,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 13,
                    marks: d.q13,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 14,
                    marks: d.q14,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 15,
                    marks: d.q15,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 16,
                    marks: d.q16,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                  {
                    question: 17,
                    marks: d.q17,
                    maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
                  },
                ],
              },
            },
          },
          { merge: true }
        )
          .then(() => {
            successCount++;
            console.log(
              `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${subjectId}`
            );
            updateExamineDoc(
              examineId,
              subjectId,
              Subject.COMBINED_MATHEMATICS
            );
          })
          .catch((e) => {
            failCount++;
            console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
          });
      }
    });
  });
};

const updateExamineDoc = (
  examineId: string,
  subjectId: string,
  subject: string
) => {
  // get the exact examine doc
  getDoc(doc(db, "examines", examineId)).then((examine) => {
    if (examine.exists()) {
      // update the examine doc by adding this subject ref id
      setSubject(examineId, subjectId, subject);
    } else {
      console.error(`${examineId}: No such an examine was found`);
    }
  });
};

const setSubject = (
  examineId: string,
  insertedSubjectId: string,
  subject: string
) => {
  if (subject === "physics") {
    setPhysics(examineId, insertedSubjectId);
  } else if (subject === "chemistry") {
    setChemistry(examineId, insertedSubjectId);
  } else if (subject === "biology") {
    setBiology(examineId, insertedSubjectId);
  } else {
    setCombinedMathematics(examineId, insertedSubjectId);
  }
};

// below methods will set relavant properties to relevant examine documents
const setPhysics = (examineId: string, insertedSubjectId: string) => {
  setDoc(
    doc(db, "examines", examineId),
    {
      physics: insertedSubjectId,
    },
    { merge: true }
  );
};

const setChemistry = (examineId: string, insertedSubjectId: string) => {
  setDoc(
    doc(db, "examines", examineId),
    {
      chemistry: insertedSubjectId,
    },
    { merge: true }
  );
};

const setBiology = (examineId: string, insertedSubjectId: string) => {
  setDoc(
    doc(db, "examines", examineId),
    {
      biology: insertedSubjectId,
    },
    { merge: true }
  );
};

const setCombinedMathematics = (
  examineId: string,
  insertedSubjectId: string
) => {
  setDoc(
    doc(db, "examines", examineId),
    {
      combinedMathematics: insertedSubjectId,
    },
    { merge: true }
  );
};
