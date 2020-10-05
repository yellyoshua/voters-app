var election = {
  campaings: [
    ["name", "list"],
    ["Lista A", "lista_a"],
    ["Lista B", "lista_b"]
  ],
  candidates: [
    ["email", "password", "list"],
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
  if(typeof obj === "object") {
    var arr = [];
    for (let index = 0; index < Object.keys(obj).length; index++) {
      arr.push(obj[Object.keys(obj)[index]]);
    }
    return arr;
  }

  return []
};

var newElection = votar(0, 1, election);

console.log({ parseVoters,objectToArray: objectToArray(obj) , newElection, newParseVoters });
