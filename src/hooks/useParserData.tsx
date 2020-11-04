import { parseDoubleArrToObjArr, parseObjtArrToDoubleArr, doubleArrExtractValues } from "utils/parsersData";

export default function useParserData() {
  return {
    getValuesFromDoubleArray,
    convertDoubleArrToObjArr,
    convertObjArrToDoubleArr
  };
}

function getValuesFromDoubleArray<T>(doubleArray: any[][], fieldToBeExtracted: string) {
  return doubleArrExtractValues<T>(doubleArray, fieldToBeExtracted);
}

function convertDoubleArrToObjArr<T>(data: any[]) {
  return parseDoubleArrToObjArr(data) as T[];
}
function convertObjArrToDoubleArr(objArr: any[], arrkeyValidator: string[]) {
  return parseObjtArrToDoubleArr(objArr, arrkeyValidator) as any[][];
}