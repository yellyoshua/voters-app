function binarySearch(array, item) {
  function recurse(min, max) {
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

function parseObjtArrToDoubleArr(objs, arrKeyValidator) {
  let arr = [arrKeyValidator];

  const searchObjKey = arrIndexValidator(arrKeyValidator);

  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];
    let objkeys = Object.keys(obj);

    if (typeof obj === "object") {
      let arrChild = [];

      objkeys.forEach(objkeyvalue => {
        let objKey = searchObjKey(objkeyvalue);
        if (typeof objKey === "number") {
          arrChild[objKey] = obj[objkeyvalue];
        }
      });

      arr.push(arrChild);
    } else {
      break;
    }
  }

  return arr;
}

function arrIndexValidator(arrKeys) {
  return objKey => {
    let arrFields = arrKeys.map(mapToUnderscore);
    let indexKeyFound = binarySearch(arrFields.sort(), toUnderscore(objKey));
    return indexKeyFound === -1 ? null : indexKeyFound;
  };
}
function mapToUnderscore(item, _index) {
  return String(item).toLowerCase().split(" ").join("_");
}

function toUnderscore(arg) {
  return String(arg).toLowerCase().split(" ").join("_");
}

var a = parseObjtArrToDoubleArr(
  [
    { name: "Carlos", idukay_code: 11, surname: "Ailun", ci: 123, enrollmentcode: 113 },
    { name: "Carlos1", idukay_code: 11, surname: "Ailun1", ci: 124, enrollmentcode: 113 },
    { name: "Carlos2", idukay_code: 11, surname: "Ailun2", ci: 126, enrollmentcode: 113 },
    { name: "Carlos3", idukay_code: 11, surname: "Ailun3", ci: 127, enrollmentcode: 113 },
    { name: "Carlos4", idukay_code: 11, surname: "Ailun4", ci: 129, enrollmentcode: 113 }
  ],
  ["name", "second_name", "surname", "second_surname", "ci", "enrollmentcode", "tag_slug", "idukay_code"]
);

function recursiveMap(arr, callback) {
  if (arr.length === 1) {
    return [callback(arr[0])];
  } else {
    return [callback(arr[0])].concat(recursiveMap(arr.slice(1), callback));
  }
}

function mapToUnderscore(item) {
  return String(item).toLowerCase().split(" ").join("_");
}

var e = recursiveMap(["hola mundo a", "hola mundo B"], mapToUnderscore);
