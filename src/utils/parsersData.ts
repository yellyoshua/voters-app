type Obj = { [k: string]: any };

export function mapToUnderscore(item: string, _index?: number) {
  return String(item).trim().toLowerCase().split(" ").join("_");
}

export function toUnderscore(arg: string) {
  return String(arg).trim().toLowerCase().split(" ").join("_")
}

export function parseDoubleArrToObjArr<T>(arr: any[][]) {
  const doubleArr = [...arr];
  var arrContainChilds = Array.isArray(doubleArr) ? Array.isArray(doubleArr[0]) : false;
  if (arrContainChilds) {
    const arrFields = doubleArr.shift();
    return doubleArr.map((arrItem: any[], index: number) => {
      let obj: any = {};

      arrFields!.forEach((field, index) => {
        obj[field] = arrItem[index];
      });

      return { ...obj, id: index };
    });
  }
  return [];
}

export function doubleArrExtractValues<T>(arr: any[][], field: string): T[] {
  const doubleArr = [...arr];
  var arrContainChilds = Array.isArray(doubleArr) ? Array.isArray(doubleArr[0]) : false;
  if (arrContainChilds) {
    const arrFields = doubleArr.shift();
    const itemFound = arrFields!.map(mapToUnderscore).findIndex(compareWith(toUnderscore(field)));
    if (itemFound !== -1) {
      return doubleArr.map(arrItem => {
        return arrItem[itemFound];
      });
    }
    return [];
  }
  return [];
}

function compareWith(matchWith: string) {
  return (arg: string) => (arg === matchWith);
}

export function doubleArrPushValues(arr: any[][], field: string, fieldValue: any) {
  const doubleArr = [...arr];
  var arrContainChilds = Array.isArray(doubleArr) ? true : false;

  if (arrContainChilds) {
    let arrFields = doubleArr.shift();


    if (binarySearch(arrFields!.map(mapToUnderscore).sort(), toUnderscore(field)) === -1) {
      arrFields = [...arrFields!, field];
    }

    var itemFound = arrFields!.map(mapToUnderscore).findIndex(compareWith(toUnderscore(field)));

    return [
      arrFields!,
      ...doubleArr.map((arrItem => {
        arrItem[itemFound] = fieldValue;
        return arrItem;
      }))
    ];
  }
  return [arr];
}

export function populateObjRef(obj: Obj, populate: Obj, origin: string, fieldPopulate?: string) {
  let objResult: Obj = {};
  const popuKeys = Object.keys(populate);

  popuKeys.forEach(function (popuField) {
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

  return { ...obj, ...objResult };
}

export function populateArrObjRef(objs: Obj[], populates: Obj[], origin: string, fieldPopulate?: string) {
  return objs.map(function (obj) {
    let newObj = obj;
    populates.forEach(function (populate) {
      newObj = populateObjRef(obj, populate, origin, fieldPopulate);
    });
    return newObj;
  });
}

export function doubleArrRemoveItem(arr: any[][], field: string, matchValue: string) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;

  if (arrContainChilds) {
    var itemFound = arr[0].map(mapToUnderscore).findIndex(compareWith(toUnderscore(field)));
    if (itemFound !== -1) {
      return arr.filter(arrItem => {
        const hasMatchWith = compareWith(toUnderscore(matchValue));
        return !hasMatchWith(toUnderscore(arrItem[itemFound]));
      });
    }
    return [arr];
  }
  return [arr];
}

export function parseObjtArrToDoubleArr(objs: { [key: string]: any }[], arrKeyValidator: string[]) {
  let arr = [arrKeyValidator];

  objs.forEach(function (obj) {
    if (typeof obj === "object") {
      arr.push(parseObjtToArr(obj, arrKeyValidator));
    }
  });

  return arr;
}

export function parseObjtToArr<T>(obj: Obj, arrKeys: string[], defaultValue?: number | string) {
  if (typeof obj === "object") {
    return arrKeys.map(function (field) {
      const finded = Object.prototype.hasOwnProperty.call(obj, field);
      if (finded) {
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


export function binarySearchObject(array: Obj[], field: string, matchValue: number | string) {

  function recurse(min: number, max: number): number {

    if (min > max) {
      return -1;
    }

    var middle = Math.floor((min + max) / 2);

    if (array[middle][field] === matchValue) {
      return middle;
    }

    if (array[middle][field] > matchValue) {
      return recurse(min, middle - 1);
    }

    return recurse(middle + 1, max);
  }

  return recurse(0, array.length - 1);
}

export function sortField(field: string, DESCENDING: boolean = true) {
  return function sort(a: any, b: any) {
    if (DESCENDING) {
      if (a[field] > b[field]) return 1;
      if (a[field] < b[field]) return -1;
      return 0;
    } else {
      if (a[field] > b[field]) return -1;
      if (a[field] < b[field]) return 1;
      return 0;
    }
  }
}

export function uniqueArray<T>(arr: T[]): T[] {
  var hashMap: any = {};
  var uniqueArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (!hashMap.hasOwnProperty(arr[i])) {
      uniqueArr.push(arr[i]);
      hashMap[arr[i]] = i;
    }
  }

  return uniqueArr;
}