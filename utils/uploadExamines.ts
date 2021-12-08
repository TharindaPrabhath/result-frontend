// firebase
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/index";

// constants
import { TEST_NAME } from "../constants/exam";

const uploadExamines = (data: any[]) => {
  let successCount = 0;
  let failCount = 0;
  data.forEach(async (d) => {
    await addDoc(collection(db, "examines"), {
      index: d.index.toString(),
      name: d.name,
      school: d.school,
      email: d.email,
      rank: d.rank,
      zScore: d.zScore,
      subjectStream: d.subjectStream,
      exam: TEST_NAME,
      year: "2021",
    })
      .then((doc) => {
        successCount++;
        console.log(
          `${successCount} - ${d.id} : ${d.index} SUCCESS -> ${doc.id}`
        );
      })
      .catch((e) => {
        failCount++;
        console.error(`${failCount} - ${d.id} : ${d.index} FAIL -> ${e}`);
      });
  });
};

export default uploadExamines;
