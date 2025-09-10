// Takes in name of csv and populates necessary data in table
function readFromCSV(path) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", path, false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        let allText = rawFile.responseText;
        let out = CSV.parse(allText);
        let trainees = convertCSVArrayToTraineeData(out);
        populateTable(trainees);
      }
    }
  };
  rawFile.send(null);
}

function findTraineeById(id) {
  for (let i = 0; i < trainees.length; i++) {
    if (id === trainees[i].id) { 
      return trainees[i];
    }
  }
  return newTrainee();
}

// If the user has saved a ranking via id, then recover it here
function getRanking() {
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("r")) {
    let rankString = atob(urlParams.get("r"))
    let rankingIds = [];
    for (let i = 0; i < rankString.length; i += 2) {
      let traineeId = rankString.substr(i, 2);
      rankingIds.push(parseInt(traineeId));
    }
    for (let i = 0; i < rankingIds.length; i++) {
      traineeId = rankingIds[i];
      if (traineeId < 0) {
        ranking[i] = newTrainee();
      } else {
        let trainee = findTraineeById(rankingIds[i])
        trainee.selected = true;
        ranking[i] = trainee;
      }
    }
    rerenderTable();
    rerenderRanking();
  }
}

// Takes in an array of trainees and converts it to js objects
function convertCSVArrayToTraineeData(csvArrays) {
  trainees = csvArrays.map(function(traineeArray, index) {
    trainee = {};
    trainee.name_romanized = traineeArray[0];
    if (traineeArray[2] === "-") {
      trainee.name_hangul = traineeArray[1];
    } else {
      trainee.name_japanese = traineeArray[1];
      trainee.name_hangul = traineeArray[2];
    }
    trainee.company = traineeArray[3];
    trainee.birthyear = traineeArray[5];
    trainee.eliminated = traineeArray[6] === 'e';
    trainee.id = parseInt(traineeArray[7]) - 1;
    trainee.image =
      trainee.name_romanized.replace(" ", "").replace("-", "") + ".jpg";
    return trainee;
  });
  filteredTrainees = trainees;
  return trainees;
}

// Constructor for a blank trainee
function newTrainee() {
  return {
    id: -1,
    name_romanized: '&#8203;',
    company: '&#8203;',
    image: 'emptyrank.png',
  };
}

// Constructor for a blank ranking list
function newRanking() {
  let ranking = new Array(12);
  for (let i = 0; i < ranking.length; i++) {
    ranking[i] = newTrainee();
  }
  return ranking;
}

// rerender method for table
function rerenderTable() {
  clearTable();
  populateTable(filteredTrainees);
}

// rerender method for ranking
function rerenderRanking() {
  clearRanking();
  populateRanking();
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Clears out the table
function clearTable() {
  let table = document.getElementById("table__entry-container");
  removeAllChildren(table);
}

// Clears out the ranking
function clearRanking() {
  let ranking_chart = document.getElementById("ranking__pyramid");
  let rankRows = Array.from(ranking_chart.children).slice(1);
  for (let i = 0; i < rowNums.length; i++) {
    let rankRow = rankRows[i];
    for (let j = 0; j < rowNums[i]; j++) {
      removeAllChildren(rankRow);
    }
  }
}

// Populate trainee table
function populateTable(trainees) {
  let table = document.getElementById("table__entry-container");
  for (let i = 0; i < trainees.length; i++) {
    table.insertAdjacentHTML("beforeend", populateTableEntry(trainees[i]));
    let insertedEntry = table.lastChild;
    insertedEntry.addEventListener("click", function (event) {
      tableClicked(trainees[i]);
    });
  }
}

function populateTableEntry(trainee) {
  let eliminated = (showEliminated && trainee.eliminated) ? "eliminated" : "";
  const tableEntry = `
  <div class="table__entry ${eliminated}">
    <div class="table__entry-icon">
      <img class="table__entry-img" src="assets/trainees/${trainee.image}" />
      <div class="table__entry-icon-border ${eliminated ? 'no-rank-border' : 'default-rank-border'}"></div>
      ${trainee.selected ? '<img class="table__entry-check" src="assets/check.png"/>' : ""}
    </div>
    <div class="table__entry-text">
      <span class="name"><strong>${trainee.name_romanized}</strong></span>
      <span class="hangul">(${trainee.name_hangul})</span>
      <span class="companyandyear">${trainee.company.toUpperCase()} • ${trainee.birthyear}</span>
    </div>
  </div>`;
  return tableEntry;
}

// Populate ranking pyramid
function populateRanking() {
  let ranking_chart = document.getElementById("ranking__pyramid");
  let rankRows = Array.from(ranking_chart.children).slice(1);
  let currRank = 1;
  for (let i = 0; i < rowNums.length; i++) {
    let rankRow = rankRows[i];
    for (let j = 0; j < rowNums[i]; j++) {
      let currTrainee = ranking[currRank-1];
      rankRow.insertAdjacentHTML("beforeend", populateRankingEntry(currTrainee, currRank))

      let insertedEntry = rankRow.lastChild;
      let dragIcon = insertedEntry.children[0].children[0];
      let iconBorder = dragIcon.children[1];
      if (currTrainee.id >= 0) {
        insertedEntry.addEventListener("click", function (event) {
          rankingClicked(currTrainee);
        });
        dragIcon.setAttribute('draggable', true);
        dragIcon.classList.add("drag-cursor");
        dragIcon.addEventListener("dragstart", createDragStartListener(currRank - 1));
      }
      iconBorder.addEventListener("dragenter", createDragEnterListener());
      iconBorder.addEventListener("dragleave", createDragLeaveListener());
      iconBorder.addEventListener("dragover", createDragOverListener());
      iconBorder.addEventListener("drop", createDropListener());
      currRank++;
    }
  }
}

function populateRankingEntry(trainee, currRank) {
  let eliminated = (showEliminated && trainee.eliminated) ? "eliminated" : "";
  const rankingEntry = `
  <div class="ranking__entry ${eliminated}">
    <div class="ranking__entry-view">
      <div class="ranking__entry-icon">
        <img class="ranking__entry-img" src="assets/trainees/${trainee.image}" />
        <div class="ranking__entry-icon-border ${eliminated ? 'no-rank-border' : 'default-rank-border'}" data-rankid="${currRank-1}"></div>
      </div>
      <div class="ranking__entry-icon-badge bg-default">${currRank}</div>
    </div>
    <div class="ranking__row-text">
      <div class="name"><strong>${trainee.name_romanized}</strong></div>
      <div class="company">${trainee.company.toUpperCase()}</div>
    </div>
  </div>`;
  return rankingEntry;
}

// Event handlers
function tableClicked(trainee) {
  if (trainee.selected) {
    let success = removeRankedTrainee(trainee);
    if (success) { trainee.selected = !trainee.selected; } else { return; }
  } else {
    let success = addRankedTrainee(trainee);
    if (success) { trainee.selected = true; } else { return; }
  }
  rerenderTable();
  rerenderRanking();
}

function rankingClicked(trainee) {
  if (trainee.selected) {
    trainee.selected = !trainee.selected;
    removeRankedTrainee(trainee);
  }
  rerenderTable();
  rerenderRanking();
}

function swapTrainees(index1, index2) {
  tempTrainee = ranking[index1];
  ranking[index1] = ranking[index2];
  ranking[index2] = tempTrainee;
  rerenderRanking();
}

// Filter trainees
const alternateRomanizations = {
  'yun seoyoung': ['yoon seoyoung'],
  'yang jaeyun': ['yang jaeyoon'],
};

function filterTrainees(event) {
  let filterText = event.target.value.toLowerCase();
  filteredTrainees = trainees.filter(function (trainee) {
    let initialMatch = includesIgnCase(trainee.name_romanized, filterText) || includesIgnCase(trainee.company, filterText);
    let alternateMatch = false;
    let alternates = alternateRomanizations[trainee.name_romanized.toLowerCase()]
    if (alternates) {
      for (let i = 0; i < alternates.length; i++) {
        alternateMatch = alternateMatch || includesIgnCase(alternates[i], filterText);
      }
    }
    return initialMatch || alternateMatch;
  });
  filteredTrainees = sortedTrainees(filteredTrainees);
  rerenderTable();
}

function includesIgnCase(mainString, subString) {
  return mainString.toLowerCase().includes(subString.toLowerCase());
}

// Ranking add/remove
function addRankedTrainee(trainee) {
  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i].id === -1) {
      ranking[i] = trainee;
      return true;
    }
  }
  return false;
}

function removeRankedTrainee(trainee) {
  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i].id === trainee.id) {
      ranking[i] = newTrainee();
      return true;
    }
  }
  return false;
}

// Share link
const currentURL = "https://produce48.github.io/";
function generateShareLink() {
  let shareCode = ranking.map(function (trainee) {
    let twoCharID = ("0" + trainee.id).slice(-2);
    return twoCharID;
  }).join("");
  shareCode = btoa(shareCode);
  shareURL = currentURL + "?r=" + shareCode;
  showShareLink(shareURL);
}

function showShareLink(shareURL) {
  let shareBox = document.getElementById("getlink-textbox");
  shareBox.value = shareURL;
  document.getElementById("getlink-textbox").style.display = "block";
  document.getElementById("copylink-button").style.display = "block";
}

function copyLink() {
  let shareBox = document.getElementById("getlink-textbox");
  shareBox.select();
  document.execCommand("copy");
}

// Global vars
var trainees = [];
var filteredTrainees = [];
var ranking = newRanking();
const rowNums = [1, 2, 4, 5];

populateRanking();
readFromCSV("./trainee_info.csv");
getRanking();