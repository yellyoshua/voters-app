import {
  recursiveMap,
  binarySearch,
  arrIndexValidator,
  parseObjtToArr,
  parseDoubleArrToObjArr,
  parseObjtArrToDoubleArr,
  mapToUnderscore,
  populateArrObjRef,
  populateObjRef,
  recursiveFind,
  recursiveFindIndex,
  addArrChildFromArr,
  extractFieldArrValuesOf,
  rmArrChildFromArr,
  toUnderscore
} from "utils/parsersData";


// if("b" in {b: 1,a: 2})  => true!

function multipliByTwo(arg: number) {
  return arg * 2;
}

describe("test parsersData", function () {
  test("recursiveMap", () => {
    const multipliedByTwo = recursiveMap([1, 2, 3], multipliByTwo);
    const oneMultipliedByTwo = recursiveMap([1], multipliByTwo);

    expect(multipliedByTwo).toStrictEqual([2, 4, 6]);
    expect(oneMultipliedByTwo).toStrictEqual([2]);
  });

  test("binarySearch", () => {
    const keyFindedString = binarySearch(["hi", " hola", "hola", " hola "], "hola")
    const keyNoFindedString = binarySearch(["hi", " hola", "hola", " hola "], "hallo")
    const keyFindedNumber = binarySearch([1, 5, 89, 99], 5);
    const keyNoFindedNumber = binarySearch([1, 5, 89, 99], 10);

    expect(keyFindedString).toBe(2);
    expect(keyNoFindedString).toBe(-1);
    expect(keyFindedNumber).toBe(1);
    expect(keyNoFindedNumber).toBe(-1);
  });

  test("arrIndexValidator", () => {
    const objKeyValidator = arrIndexValidator(["b", "d", "a", "c"]);
    const obj2KeyValidator = arrIndexValidator(["b", "d", "a", "c"]);
    const existInObj = objKeyValidator("c");
    const noExistInObj = obj2KeyValidator("f");

    expect(existInObj).toBe(3);
    expect(noExistInObj).toBe(null);
  });

  test("parseObjtToArr", () => {
    const array = parseObjtToArr<number>({ a: 1, b: 2, c: 3 }, ["a", "c", "b"]);
    const arrayWithEmptyField = parseObjtToArr<number>({ a: 1, b: 2, c: 3 }, ["a", "c", "b", "e"]);
    const arrayMiddleEmptyField = parseObjtToArr<number>({ a: 1, b: 2, c: 3 }, ["a", "e", "c", "b", "e"]);
    const arrayWithNoMatchField = parseObjtToArr<number>({ a: 1, b: 2, c: 3 }, ["f", "g", "h", "e"], "");

    expect(array).toStrictEqual([1, 3, 2]);
    expect(arrayWithEmptyField).toStrictEqual([1, 3, 2, null]);
    expect(arrayMiddleEmptyField).toStrictEqual([1, null, 3, 2, null]);
    expect(arrayWithNoMatchField).toStrictEqual(["", "", "", ""]);
  });

  test("parseDoubleArrToObjArr", () => {
    const objArr = parseDoubleArrToObjArr([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333],
    ]);

    expect(objArr).toStrictEqual([
      { name: "Yoshua", id: 0, surname: "Lopez", ci: 11111 },
      { name: "Yoo", id: 1, surname: "LL", ci: 2222 },
      { name: "Yuip", id: 2, surname: "Lpop", ci: 333 },
    ]);
  });

  test("parseObjtArrToDoubleArr", () => {
    const result = parseObjtArrToDoubleArr([
      { name: "Yoshua", id: 0, surname: "Lopez", ci: 11111 },
      { name: "Yoo", id: 1, surname: "LL", ci: 2222 },
      { name: "Yuip", id: 2, surname: "Lpop", ci: 333 },
    ], ["name", "surname", "ci"]);

    expect(result).toStrictEqual([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333],
    ]);
  });

  test("mapToUnderscore", () => {
    const arrParsed = ["a b c", "a b c", " a   b  "].map(mapToUnderscore);

    expect(arrParsed).toStrictEqual(["a_b_c", "a_b_c", "a___b"]);
  });

  test("populateArrObjRef", () => {
    const result = populateArrObjRef([{ slug: "id" }], [{ name: "hola", slug: "id" }], "slug", "name");
    const resultWithNoDestiny = populateArrObjRef([{ slug: "id" }], [{ name: "hola", slug: "id" }], "slug");

    expect(result).toStrictEqual([{ slug: "hola" }]);
    expect(resultWithNoDestiny).toStrictEqual([{ slug: "id" }]);
  });

  test("populateObjRef", () => {
    const result = populateObjRef({ name: "id", pop: "hi" }, { id: "hi", slug: "hola mundo" }, "pop", "slug");
    const resultWithNoDestiny = populateObjRef({ name: "id", pop: "hi" }, { id: "hi", slug: "hola mundo" }, "pop");

    expect(result).toStrictEqual({ name: "id", pop: "hola mundo" });
    expect(resultWithNoDestiny).toStrictEqual({ name: "id", pop: "hi" });
  });

  test("recursiveFind", () => {
    const hasFinded = recursiveFind([{ name: "yoshua2" }, { name: "yoshua1" }, { name: "yoshua" }], function (element) {
      return element.name === "yoshua";
    });
    const noFinded = recursiveFind([{ name: "yoshua" }, { name: "yoshua" }, { name: "yoshua" }], function (element) {
      return element.name === "yo";
    });

    expect(hasFinded).toStrictEqual({ name: "yoshua" });
    expect(noFinded).toBeNull();
  });

  test("recursiveFindIndex", () => {
    const hasFindedIndex = recursiveFindIndex([{ name: "yoshua2" }, { name: "yoshua1" }, { name: "yoshua" }], function (element) {
      return element.name === "yoshua";
    });
    const noFindedIndex = recursiveFindIndex([{ name: "yoshua" }, { name: "yoshua" }, { name: "yoshua" }], function (element) {
      return element.name === "yo";
    });

    expect(hasFindedIndex).toBe(2);
    expect(noFindedIndex).toBe(-1);
  });

  test("addArrChildFromArr", () => {
    const result = addArrChildFromArr([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "slug", "d");

    expect(result).toStrictEqual([
      ["name", "surname", "ci", "slug"],
      ["Yoshua", "Lopez", 11111, "d"],
      ["Yoo", "LL", 2222, "d"],
      ["Yuip", "Lpop", 333, "d"]
    ]);
  });

  test("extractFieldArrValuesOf", () => {
    const result = extractFieldArrValuesOf([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "name");
    const noExtractedValues = extractFieldArrValuesOf([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "names");

    expect(result).toStrictEqual(["Yoshua", "Yoo", "Yuip"]);
    expect(noExtractedValues).toStrictEqual([]);
  });

  test("rmArrChildFromArr", () => {
    const result = rmArrChildFromArr([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "name", "Yoshua");
    const withNoRemove = rmArrChildFromArr([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "name", "no_one");

    expect(result).toStrictEqual([
      ["name", "surname", "ci"],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ]);
    expect(withNoRemove).toStrictEqual([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ]);
  });

  test("toUnderscore", () => {
    const result = toUnderscore("i am yell");
    const resultWithTrim = toUnderscore("  i am yell  ");

    expect(result).toBe("i_am_yell");
    expect(resultWithTrim).toBe("i_am_yell");
  });
});