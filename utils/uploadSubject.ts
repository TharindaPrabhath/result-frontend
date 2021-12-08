// firebase
import {
  addDoc,
  setDoc,
  collection,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/index";

// constants
const MAX_MCQ_TOTAL_MARKS = 50;
const MAX_STRUCTURED_TOTAL_MARKS = 40;
const MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS = 40;
const MAX_ESSAY_TOTAL_MARKS = 60;
const MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS = 40;

const MAX_SINGLE_STRUCTURED_MARKS = 10;
const MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS = 50;
const MAX_SINGLE_ESSAY_MARKS = 15;
const MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS = 150;

const uploadSubject = (data: any[], subject: string) => {
  if (subject === "physics") {
    console.log("Here in physics");
    handleNotCMaths(data, "physics");
  } else if (subject === "chemistry") {
    console.log("Here in chemistry");
    handleNotCMaths(data, "chemistry");
  } else if (subject === "biology") {
    console.log("Here in biology");
    handleNotCMaths(data, "biology");
  } else {
    console.log("Here in combined mathematics");
    handleCMaths(data);
  }
};

export default uploadSubject;

const handleNotCMaths = (data: any[], subject: string) => {
  let successCount = 0;
  let failCount = 0;
  data.forEach(async (d) => {
    await addDoc(collection(db, subject), {
      examine: d.index.toString(),
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
      .then((insertedSubjectDoc) => {
        successCount++;
        console.log(
          `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${insertedSubjectDoc.id}`
        );

        // get all the examine docs having this index number
        const q = query(
          collection(db, "examines"),
          where("index", "==", d.index.toString())
        );
        getDocs(q).then((res) => {
          const docs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

          // adding the relation to the relevant examine in the db
          // (updating the examine document)
          docs.map((document: any) => {
            if (document.index === d.index.toString()) {
              setSubject(document.id, insertedSubjectDoc.id, subject);
            }
          });
        });
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
    await addDoc(collection(db, "combinedMathematics"), {
      examine: d.index.toString(),
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
      appliedMathematics: {
        marks: {
          structured: {
            marks: d.am_structured,
            maxMarks: MAX_COMBINED_MATHEMATICS_STRUCTURED_TOTAL_MARKS,
          },
          essay: {
            marks: d.am_essay,
            maxMarks: MAX_COMBINED_MATHEMATICS_ESSAY_TOTAL_MARKS,
          },
        },
        questions: {
          structured: [
            {
              question: 1,
              marks: d.am1,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 2,
              marks: d.am2,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 3,
              marks: d.am3,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 4,
              marks: d.am4,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 5,
              marks: d.am5,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 6,
              marks: d.am6,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 7,
              marks: d.am7,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 8,
              marks: d.am8,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 9,
              marks: d.am9,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
            {
              question: 10,
              marks: d.am10,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_STRUCTURED_MARKS,
            },
          ],

          essay: [
            {
              question: 11,
              marks: d.am11,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 12,
              marks: d.am12,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 13,
              marks: d.am13,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 14,
              marks: d.am14,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 15,
              marks: d.am15,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 16,
              marks: d.am16,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
            {
              question: 17,
              marks: d.am17,
              maxMarks: MAX_COMBINED_MATHEMATICS_SINGLE_ESSAY_MARKS,
            },
          ],
        },
      },
    })
      .then((insertedSubjectDoc) => {
        successCount++;
        console.log(
          `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${insertedSubjectDoc.id}`
        );

        // get all the examine docs having this index number
        const q = query(
          collection(db, "examines"),
          where("index", "==", d.index.toString())
        );
        getDocs(q).then((res) => {
          const docs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

          // adding the relation to the relevant examine in the db
          // (updating the examine document)
          docs.map((document: any) => {
            if (document.index === d.index.toString()) {
              setSubject(
                document.id,
                insertedSubjectDoc.id,
                "combinedMathematics"
              );
            }
          });
        });
      })
      .catch((e) => {
        failCount++;
        console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
      });
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
