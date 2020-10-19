export function parseArrToObjArr(arr: any[]) {
  return Array.isArray(arr) ? arr
    .map((arrItem: any[], index: number) => {
      let obj: any = {};
      for (let i = 0; i < arr[0].length; ++i) {
        obj[arr[0][i]] = arrItem[i];
      }
      return { ...obj, id: index - 1 };
    })
    .splice(1) : [];
}

export function extractFieldArrValuesOf(arr: any[][], field: string) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;
  if (arrContainChilds) {
    var indexField = arr[0].map(String).findIndex(compareInLowerCase(field));
    return indexField !== -1 ? arr.map(arrItem => {
      return arrItem[indexField];
    }).splice(1) : [];
  }
  return [];
}

function compareInLowerCase(matchWith: string) {
  return (arg1: string) => {
    return String(arg1).toLowerCase() === String(matchWith).toLowerCase()
  };
}

export function addArrChildFromArr(arr: any[][], field: string, newValue: any) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;

  if (arrContainChilds) {
    let arrFields = arr[0];

    if (arrFields.findIndex(compareInLowerCase(field)) === -1) {
      arrFields = [...arr[0], field];
    }

    var indexField = arrFields.findIndex(compareInLowerCase(field));

    return [
      arrFields,
      ...arr.splice(1).map(arrItem => {
        arrItem[indexField] = newValue;
        return arrItem;
      })
    ];
  }
  return [arr];
}

export function relationObjFieldValue(arg: { [k: string]: any }[], findInTo: { [k: string]: any }[], fieldName: string, extractValueFromField?: string) {
  return arg.map((argItem) => {

    const value = findInTo.find((into) => {
      let hasFinded = false;
      Object.keys(into).forEach((intoKey) => {
        if (!hasFinded) {
          return hasFinded = into[intoKey] === argItem[fieldName];
        }
      })
      return hasFinded;
    });

    if (extractValueFromField) {
      return { ...argItem, [fieldName]: value ? value[extractValueFromField] : null };
    }

    return { ...argItem, [fieldName]: value ? value : null }
  });
}

export function mapParseValuesArr(arr: string[][]) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;
  if (arrContainChilds) {
    return arr.map((itemArr) => {
      return arr[0].map((arrItem, key) => {
        if (!itemArr[key]) {
          itemArr[key] = "";
        }
        return itemArr[key];
      })
    })
  }
  return [arr];
}

export function rmArrChildFromArr(arr: any[][], field: string, matchValue: string) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;

  if (arrContainChilds) {
    var indexField = arr[0].map(String).findIndex(compareInLowerCase(field));

    return indexField !== -1 ? arr.filter(arrItem => {
      const hasMatchWith = compareInLowerCase(matchValue);
      return !hasMatchWith(arrItem[indexField]);
    }) : [arr];
  }
  return [arr];
}

export function parseObjtArrToArr(objs: { [key: string]: any }[], arrKeyValidator: string[]) {
  let arr = [arrKeyValidator];

  const ObjKeyValidator = arrIndexValidator(arrKeyValidator);

  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];

    if (typeof obj === "object") {
      let arrChild = [];
      for (let index = 0; index < Object.keys(obj).length; index++) {
        let objKey = ObjKeyValidator(Object.keys(obj)[index]);
        if (typeof objKey === "number") {
          arrChild[objKey] = obj[Object.keys(obj)[index]];
        }
      }
      arr.push(arrChild);
    } else {
      break;
    }
  }

  return arr;
}

export function parseObjtToArr(obj: { [key: string]: any }, arrKeys: string[]) {
  const arrObjKeyValidator = arrIndexValidator(arrKeys);
  let arr = [];
  if (typeof obj === "object") {
    for (let index = 0; index < Object.keys(obj).length; index++) {
      let objKeyIndex = arrObjKeyValidator(Object.keys(obj)[index]);
      if (typeof objKeyIndex === "number") {
        arr[objKeyIndex] = obj[Object.keys(obj)[index]];
      }
    }
  }
  return arr;
}

export function arrIndexValidator(arrKeys: string[]) {
  return (objKey: string) => {
    let indexKeyFound = arrKeys.map(String).findIndex((val, key) => {
      return Boolean(val === objKey);
    });
    return indexKeyFound === -1 ? null : indexKeyFound;
  };
}

export function ObjKeyValidator(obj: { [key: string]: any }, key: string | string[]) {
  let indexKeyFound = Object.keys(obj).findIndex(objKey => {
    if (typeof key === "string") return Boolean(objKey === key);
    return (
      key.map(String).findIndex(keyVal => {
        return Boolean(objKey === keyVal);
      }) !== -1
    );
  });
  return indexKeyFound !== -1;
}
