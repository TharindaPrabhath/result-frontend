// xlsx
import XLSX from "xlsx";

// reads the xlsx file & map to js object

const readFile = (file: any) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target!.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const worksheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      resolve(data);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
  return promise;
};

export default readFile;
