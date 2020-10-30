type Obj = { [k: string]: any };

export function mapToUnderscore(item: string, _index?: number) {
  return String(item).trim().toLowerCase().split(" ").join("_");
}

export function toUnderscore(arg: string) {
  return String(arg).trim().toLowerCase().split(" ").join("_")
}

export function parseDoubleArrToObjArr<T>(arr: any[][]) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;
  if (arrContainChilds) {
    const arrFields = arr[0];
    return arr.map((arrItem: any[], index: number) => {
      let obj: any = {};

      arrFields.forEach((field, index) => {
        obj[field] = arrItem[index];
      });

      return { ...obj, id: index - 1 };
    }).splice(1);
  }
  return [];
}

export function extractFieldArrValuesOf(arr: any[][], field: string) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;
  if (arrContainChilds) {
    var indexField = arr[0].map(mapToUnderscore).findIndex(compareWith(toUnderscore(field)));
    return indexField !== -1 ? arr.map(arrItem => {
      return arrItem[indexField];
    }).splice(1) : [];
  }
  return [];
}

function compareWith(matchWith: string) {
  return (arg1: string) => (arg1 === matchWith);
}

export function addArrChildFromArr(arr: any[][], field: string, newValue: any) {
  var arrContainChilds = Array.isArray(arr) ? true : false;

  if (arrContainChilds) {
    let arrFields = arr[0].map(mapToUnderscore);

    if (arrFields.findIndex(compareWith(toUnderscore(field))) === -1) {
      arrFields = [...arr[0], field];
    }

    var indexField = arrFields.findIndex(compareWith(toUnderscore(field)));

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

export function populateObjRef(obj: Obj, populate: Obj, origin: string, fieldPopulate?: string) {
  let objResult = obj;
  const popuKeys = Object.keys(populate);

  recursiveMap(popuKeys, function (popuField) {
    const popuValue = populate[popuField];
    const found = popuValue === obj[origin];
    if (found) {

      if (fieldPopulate === undefined) {
        objResult[origin] = popuValue;
        return popuField;
      }

      objResult[origin] = populate[fieldPopulate];
      return popuField;
    }
    return popuField;
  });

  return objResult;
}

export function populateArrObjRef(objs: Obj[], populates: Obj[], origin: string, fieldPopulate?: string) {
  return recursiveMap(objs, function (obj) {
    let newObj = obj;
    recursiveMap(populates, function (populate) {
      newObj = populateObjRef(obj, populate, origin, fieldPopulate);
    });
    return newObj;
  });
}

export function rmArrChildFromArr(arr: any[][], field: string, matchValue: string) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;

  if (arrContainChilds) {
    var indexField = arr[0].map(mapToUnderscore).findIndex(compareWith(toUnderscore(field)));

    return indexField !== -1 ? arr.filter(arrItem => {
      const hasMatchWith = compareWith(toUnderscore(matchValue));
      return !hasMatchWith(toUnderscore(arrItem[indexField]));
    }) : [arr];
  }
  return [arr];
}

export function parseObjtArrToDoubleArr(objs: { [key: string]: any }[], arrKeyValidator: string[]) {
  let arr = [arrKeyValidator];

  recursiveMap(objs, function (obj) {
    if (typeof obj === "object") {
      arr.push(parseObjtToArr(obj, arrKeyValidator));
    }
  });

  return arr;
}

export function parseObjtToArr<T>(obj: { [key: string]: any }, arrKeys: string[], defaultValue?: number | string) {
  if (typeof obj === "object") {
    const arrObjKeyValidator = arrIndexValidator(Object.keys(obj));

    return recursiveMap(arrKeys, function (field) {
      let objKeyIndex = arrObjKeyValidator(field);
      if (typeof objKeyIndex === "number") {
        return obj[field];
      } else {
        if (defaultValue === undefined) {
          return null;
        }
        return defaultValue;
      }
    });
  }

  return [];
}

export function arrIndexValidator(arrKeys: string[]) {
  return (objKey: string) => {
    let indexKeyFound = recursiveFindIndex(recursiveMap(arrKeys, mapToUnderscore), compareWith(toUnderscore(objKey)));
    return indexKeyFound === -1 ? null : indexKeyFound;
  };
}

export function binarySearch(array: number[] | string[], item: number | string) {

  function recurse(min: number, max: number): number {

    if (min > max) {
      return -1;
    }

    var middle = Math.floor((min + max) / 2);

    if (array[middle] === item) {
      return middle;
    }

    if (array[middle] > item) {
      return recurse(min, middle - 1);
    }

    return recurse(middle + 1, max);
  }

  return recurse(0, array.length - 1);
}

export function recursiveMap<T>(arr: T[], callback: (val: T) => any): T[] {
  if (arr.length === 1) {
    return [callback(arr[0])];
  } else {
    return [callback(arr[0])].concat(recursiveMap(arr.slice(1), callback))
  }
}

export function recursiveFind<T>(arr: T[], compareFunc: (currElement: T) => boolean): T | null {
  const arrMin = 0;
  const arrMax = arr.length;

  function recurse(index: number): T | null {
    const isEnd = (index + 1) === arrMax;
    const nextIndex = isEnd ? index : index + 1;
    const currElement = arr[index];
    const isFinded = compareFunc(currElement);

    if (isFinded) {
      return currElement;
    }

    if (isEnd) {
      return null;
    }

    return recurse(nextIndex);
  }

  return recurse(arrMin);
}

export function recursiveFindIndex<T>(arr: T[], compareFunc: (currElement: T) => boolean): number {
  const arrMin = 0;
  const arrMax = arr.length;

  function recurse(index: number): number {
    const isEnd = (index + 1) === arrMax;
    const nextIndex = isEnd ? index : index + 1;
    const currElement = arr[index];
    const isFinded = compareFunc(currElement);

    if (isFinded) {
      return index;
    }

    if (isEnd) {
      return -1 as number;
    }

    return recurse(nextIndex);
  }

  return recurse(arrMin);
}