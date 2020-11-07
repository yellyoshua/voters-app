import {
  sortField,
  binarySearch,
  binarySearchObject,
  parseObjtToArr,
  parseDoubleArrToObjArr,
  parseObjtArrToDoubleArr,
  mapToUnderscore,
  populateArrObjRef,
  populateObjRef,
  doubleArrPushValues,
  doubleArrExtractValues,
  doubleArrRemoveItem,
  toUnderscore
} from "utils/parsersData";


// if("b" in {b: 1,a: 2})  => true!

describe("test parsersData", function () {

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

  test("binarySearchObject", () => {
    const listItems = [
      { say: "hi" }, { say: "he" }, { say: "fi" },
      { say: "hu" }, { say: "ai" }, { say: "ao" }
    ].sort(sortField("say", true));

    const finded = binarySearchObject(listItems, "say", "ai");
    const noFinded = binarySearchObject(listItems, "say", "ho");

    expect(listItems[finded]).toStrictEqual({ say: "ai" });
    expect(noFinded).toBe(-1);
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
    const data = [
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ];
    const objArr = parseDoubleArrToObjArr(data);

    expect(objArr).toStrictEqual([
      { name: "Yoshua", id: 0, surname: "Lopez", ci: 11111 },
      { name: "Yoo", id: 1, surname: "LL", ci: 2222 },
      { name: "Yuip", id: 2, surname: "Lpop", ci: 333 },
    ]);
    expect(data).toStrictEqual([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
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

  test("doubleArrPushValues", () => {
    const result = doubleArrPushValues([
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

  test("doubleArrExtractValues", () => {
    const result = doubleArrExtractValues([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "name");
    const noExtractedValues = doubleArrExtractValues([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "names");

    expect(result).toStrictEqual(["Yoshua", "Yoo", "Yuip"]);
    expect(noExtractedValues).toStrictEqual([]);
  });

  test("doubleArrRemoveItem", () => {
    const result = doubleArrRemoveItem([
      ["name", "surname", "ci"],
      ["Yoshua", "Lopez", 11111],
      ["Yoo", "LL", 2222],
      ["Yuip", "Lpop", 333]
    ], "name", "Yoshua");
    const withNoRemove = doubleArrRemoveItem([
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