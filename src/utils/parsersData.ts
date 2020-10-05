export function parseArrToObjArr(arr: any[]) {
  return arr
    .map((arrItem: any[], index: number) => {
      let obj: any = {};
      for (let i = 0; i < arr[0].length; ++i) {
        obj[arr[0][i]] = arrItem[i];
      }
      return { ...obj, id: index - 1 };
    })
    .splice(1);
}

export function parseObjtArrToArr(objs: { [key: string]: any }[], arrKeyValidator: string[]) {
  let arr = [];

  const ObjKeyValidator = arrIndexValidator(arrKeyValidator);

  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];

    if (typeof obj === "object") {
      for (let index = 0; index < Object.keys(obj).length; index++) {
        let objKey = ObjKeyValidator(Object.keys(obj)[index]);
        if (typeof objKey === "number") {
          arr[objKey] = obj[Object.keys(obj)[index]];
        }
      }
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
