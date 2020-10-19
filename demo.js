var election = {
  campaings: [
    ["name", "list"],
    ["Lista A", "lista_a"],
    ["Lista B", "lista_b"]
  ],
  candidates: [
    ["email", "password", "list", "tag_slug"],
    ["yoshualopez@gmail.com", "contrasena", "lista_a"],
    ["yoshualopez@gmail.com", "contrasena", "lista_a"]
  ],
  tags: [],
  voters: [
    ["name", "email", "password", "code", "election"],
    ["name1", "email1", "password1", "001", "lista_b"]
  ]
};
var parseVoters = election.voters
  .map((voter, index) => {
    var obj = {};
    for (var i = 0; i < election.voters[0].length; ++i) {
      obj[election.voters[0][i]] = voter[i];
    }
    return { ...obj, id: index - 1 };
  })
  .splice(1);

var votar = (voterIndex, campaignIndex, election) => {
  var newElection = election;
  var votarIndex = 4;

  for (let index = 0; index < newElection.voters.length; index++) {
    if (index === voterIndex + 1) {
      newElection.voters[index][votarIndex] = newElection.campaings[campaignIndex + 1][1];
      break;
    }
  }

  return newElection;
};

var obj = { code: "001", election: "lista_b", email: "email1", id: 0, name: "name1", password: "password1" };

var objectToArray = function (obj) {
  if (typeof obj === "object") {
    var arr = [];
    for (let index = 0; index < Object.keys(obj).length; index++) {
      arr.push(obj[Object.keys(obj)[index]]);
    }
    return arr;
  }

  return [];
};

function mapParseValuesArr(arr) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;
  if (arrContainChilds) {
    return arr.map(itemArr => {
      return arr[0].map((arrItem, key) => {
        if (!itemArr[key]) {
          itemArr[key] = "";
        }
        return itemArr[key];
      });
    });
  }
  return [arr];
}

function addArrChildFromArr(arr, field, newValue) {
  var arrContainChilds = Array.isArray(arr) ? Array.isArray(arr[0]) : false;

  if (arrContainChilds) {
    var arrFields = arr[0];
    var indexFieldFound = arrFields.map(String).findIndex(fields => fields.toLowerCase() === String(field).toLowerCase());
    var indexField = indexFieldFound !== -1 ? indexFieldFound : arrFields.length;
    return [
      arrFields,
      ...arr.splice(1).map(arrItem => {
        return arrFields.map((_, key) => {
          if (key === indexField) {
            arrItem[key] = newValue;
          }
          return arrItem[key];
        });
      })
    ];
  }
  return [arr];
}

var updated = addArrChildFromArr(mapParseValuesArr(election.candidates), "tag_slug", "slug_list_a");

var newElection = votar(0, 1, election);

console.log({ updated, parseVoters, objectToArray: objectToArray(obj), newElection });
