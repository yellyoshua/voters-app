import XLSX from "xlsx";
import { uuidv4 } from "./createUID";
import { doubleArrPushValues, parseDoubleArrToObjArr, uniqueArray } from "./parsersData";

type Obj<T> = { [k: string]: T }

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

export function convertSheetsToObjArr(data: Obj<any[]>, fieldSheetSlug: string = "sheet_slug") {

  const excel = { ...data };
  let sheetsContent: any[] = [];
  let fieldsSheet: any[] = [];


  const sheets: any[] = Object.keys(excel).map(tagName => {
    const slug = uuidv4();
    return { name: tagName, slug: slug }
  });

  sheets.forEach(({ name: sheet, slug }) => {

    excel[sheet][0].forEach((field: any) => {
      fieldsSheet.push(field);
    });

    sheetsContent = sheetsContent.concat(
      parseDoubleArrToObjArr(
        doubleArrPushValues(
          excel[sheet],
          fieldSheetSlug,
          slug
        )
      )
    );
  });

  fieldsSheet = uniqueArray(fieldsSheet);

  return { sheetsContent, fieldsSheet, sheets };
}