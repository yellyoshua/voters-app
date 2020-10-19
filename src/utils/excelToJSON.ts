import XLSX from "xlsx";

export default function excelToJSON(file: File, cb: (data: { [k: string]: any[] }) => void) {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  reader.onloadend = ({ target }) => {
    const bstr = target?.result;
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

    let obj: { [k: string]: any[] } = {}

    wb.SheetNames.forEach((sheetName) => {
      obj[sheetName] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
        header: 1
      });
    });

    return cb(obj);
  }

  if (rABS) {
    return reader.readAsBinaryString(file);
  } else {
    return reader.readAsArrayBuffer(file);
  };
}