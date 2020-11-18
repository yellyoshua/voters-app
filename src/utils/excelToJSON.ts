import XLSX from "xlsx";
import _ from "underscore";
import { parseDoubleArrToObjArr } from "./parsersData";

type Obj<T> = { [k: string]: T }

export type ResultExecToJSON = {
  json: { [sheetName: string]: Obj<any>[] };
  sheetNames: string[];
  columnNames: string[];
}

export default function excelToJSON(file: File, cb: (result: ResultExecToJSON) => void) {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  reader.onloadend = ({ target }) => {
    const bstr = target?.result;
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

    const sheetNames: string[] = wb.SheetNames;
    let columnNames: string[] = [];
    let json: { [sheetName: string]: Obj<any>[] } = {}

    wb.SheetNames.forEach((sheetName) => {
      const currentSheet = parseDoubleArrToObjArr<Obj<any>>(
        XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
          header: 1, blankrows: false
        })
      );

      currentSheet.forEach((sheet) => {
        columnNames.push(...Object.keys(sheet));
      });
      columnNames = _.uniq(columnNames);
      json[sheetName] = currentSheet;
    });

    return cb({ json, sheetNames, columnNames });
  }

  if (rABS) {
    return reader.readAsBinaryString(file);
  } else {
    return reader.readAsArrayBuffer(file);
  };
}