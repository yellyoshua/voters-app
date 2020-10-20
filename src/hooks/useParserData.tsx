import { parseArrToObjArr, parseObjtArrToArr, extractFieldArrValuesOf } from "utils/parsersData";

export default function useParserData() {
  return {
    getValuesFromDoubleArray,
    convertDoubleArrToObjArr,
    convertObjArrToDoubleArr
  };
}

function getValuesFromDoubleArray<T>(doubleArray: any[][], fieldToBeExtracted: string) {
  return extractFieldArrValuesOf(doubleArray, fieldToBeExtracted) as T[];
}

function convertDoubleArrToObjArr<T>(data: any[]) {
  return parseArrToObjArr(data) as T[];
}
function convertObjArrToDoubleArr(objArr: any[], arrkeyValidator: string[]) {
  return parseObjtArrToArr(objArr, arrkeyValidator) as any[][];
}