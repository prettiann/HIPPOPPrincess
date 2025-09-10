// =======================
// TRAINEES DATA
// =======================
const trainees = [
  {name:"Yunon", hangul:"유논", nationality:"JAPAN", birthyear:"200?", image:"Yunon.png"},
  {name:"Urara", hangul:"우라라", nationality:"JAPAN", birthyear:"200?", image:"Urara.png"},
  {name:"Shiho", hangul:"시호", nationality:"JAPAN", birthyear:"2009/2010", image:"Shiho.png"},
  {name:"Sena", hangul:"세나", nationality:"JAPAN", birthyear:"2009", image:"Sena.png"},
  {name:"Sea", hangul:"세아", nationality:"JAPAN", birthyear:"200?", image:"Sea.png"},
  {name:"Sasa", hangul:"사사", nationality:"JAPAN", birthyear:"200?", image:"Sasa.png"},
  {name:"Saaya", hangul:"사아야", nationality:"JAPAN", birthyear:"200?", image:"Saaya.png"},
  {name:"Rino", hangul:"리노", nationality:"JAPAN", birthyear:"2007", image:"Rino.png"},
  {name:"Niko", hangul:"니코", nationality:"JAPAN", birthyear:"200?", image:"Niko.png"},
  {name:"Natsuho", hangul:"나츠호", nationality:"JAPAN", birthyear:"200?", image:"Natsuho.png"},
  {name:"Nana", hangul:"나나", nationality:"JAPAN", birthyear:"200?", image:"Nana.png"},
  {name:"Miyabi", hangul:"미야비", nationality:"JAPAN", birthyear:"200?", image:"Miyabi.png"},
  {name:"Mirika", hangul:"미리카", nationality:"JAPAN", birthyear:"200?", image:"Mirika.png"},
  {name:"Mia", hangul:"미아", nationality:"JAPAN", birthyear:"200?", image:"Mia.png"},
  {name:"Mayu", hangul:"마유", nationality:"JAPAN", birthyear:"2011", image:"Mayu.png"},
  {name:"Koko", hangul:"코코", nationality:"JAPAN", birthyear:"200?", image:"Koko.png"},
  {name:"Karin", hangul:"카린", nationality:"JAPAN", birthyear:"2011", image:"Karin.png"},
  {name:"Hina", hangul:"히나", nationality:"JAPAN", birthyear:"200?", image:"Hina.png"},
  {name:"Hanabi", hangul:"하나비", nationality:"JAPAN", birthyear:"200?", image:"Hanabi.png"},
  {name:"Kokoro", hangul:"코코로", nationality:"JAPAN", birthyear:"200?", image:"Kokoro.png"},
  {name:"Yun Seoyoung", hangul:"윤서영", nationality:"KOREA", birthyear:"2007", image:"YunSeoyoung.png"},
  {name:"Yoon Sooin", hangul:"윤수인", nationality:"KOREA", birthyear:"2005", image:"YoonSooin.png"},
  {name:"Yoon Chaeeun", hangul:"윤채은", nationality:"KOREA", birthyear:"2005", image:"YoonChaeeun.png"},
  {name:"Yang Jaeyun", hangul:"양재윤", nationality:"KOREA", birthyear:"200?", image:"YangJaeyun.png"},
  {name:"Shin Yookyung", hangul:"신유경", nationality:"KOREA", birthyear:"200?", image:"ShinYookyung.png"},
  {name:"Ryu Hajin", hangul:"류하진", nationality:"KOREA", birthyear:"200?", image:"RyuHajin.png"},
  {name:"Nam Yuju", hangul:"남유주", nationality:"KOREA", birthyear:"2007", image:"NamYuju.png"},
  {name:"Min Jiho", hangul:"민지호", nationality:"KOREA", birthyear:"2009", image:"MinJiho.png"},
  {name:"Lee Seohyun", hangul:"이서현", nationality:"KOREA", birthyear:"200?", image:"LeeSeohyun.png"},
  {name:"Lee Jooeun", hangul:"이주은", nationality:"KOREA", birthyear:"200?", image:"LeeJooeun.png"},
  {name:"Lee Chaeyeon", hangul:"이채연", nationality:"KOREA", birthyear:"200?", image:"LeeChaeyeon.png"},
  {name:"Lee Chaehyun", hangul:"이채현", nationality:"KOREA", birthyear:"200?", image:"LeeChaehyun.png"},
  {name:"Kwon Dohee", hangul:"권도희", nationality:"KOREA", birthyear:"200?", image:"KwonDohee.png"},
  {name:"Kim Yeeun", hangul:"김예은", nationality:"KOREA", birthyear:"200?", image:"KimYeeun.png"},
  {name:"Kim Sujin", hangul:"김준서", nationality:"KOREA", birthyear:"2009", image:"KimSujin.png"},
  {name:"Kim Doyi", hangul:"김도이", nationality:"KOREA", birthyear:"2008", image:"KimDoyi.png"},
  {name:"Kim Chaerin", hangul:"김채린", nationality:"KOREA", birthyear:"2010", image:"KimChaerin.png"},
  {name:"Han Heeheon", hangul:"한희연", nationality:"KOREA", birthyear:"200?", image:"HanHeeheon.png"},
  {name:"Choi Youmin", hangul:"최유민", nationality:"KOREA", birthyear:"200?", image:"ChoiYoumin.png"},
  {name:"Choi Gayoon", hangul:"최가윤", nationality:"KOREA", birthyear:"200?", image:"ChoiGayoon.png"},
];

// =======================
// VARIABLES
// =======================
let selectedTop12 = []; // array of trainee names
const tableContainer = document.getElementById("table__entry-container");
const pyramidContainer = document.getElementById("ranking__pyramid");

// =======================
// POPULATE TABLE
// =======================
function populateTable() {
  tableContainer.innerHTML = "";
  trainees.forEach(t => {
    const entry = document.createElement("div");
    entry.className = "table__entry";
    entry.onclick = () => toggleSelection(t.name);
    entry.innerHTML = `
      <div class="table__entry-icon">
        <img class="table__entry-img" src="assets/${t.image}" alt="${t.name}" />
        <div class="table__entry-icon-border"></div>
        ${selectedTop12.includes(t.name) ? `<div class="table__entry-icon-crown"></div>` : ""}
      </div>
      <div class="table__entry-text">
        <div class="name">${t.name}</div>
        <div class="hangul">${t.hangul}</div>
        <div class="year">${t.birthyear}</div>
        <div class="natl">${t.nationality}</div>
      </div>
    `;
    tableContainer.appendChild(entry);
  });
}

// =======================
// TOGGLE SELECTION
// =======================
function toggleSelection(name) {
  if(selectedTop12.includes(name)) {
    selectedTop12 = selectedTop12.filter(n => n !== name);
  } else {
    if(selectedTop12.length >= 12) {
      alert("Top 12 is full!");
      return;
    }
    selectedTop12.push(name);
  }
  updateRanking();
  populateTable();
}

// =======================
// UPDATE PYRAMID
// =======================
function updateRanking() {
  pyramidContainer.innerHTML = `<h2 id="ranking__title">My Pyramid</h2>`;
  const rows = [1, 2, 3, 6]; // pyramid distribution
  let index = 0;
  rows.forEach(num => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "ranking__row";
    for(let i = 0; i < num; i++) {
      const traineeName = selectedTop12[index];
      const trainee = trainees.find(t => t.name === traineeName);
      const entryDiv = document.createElement("div");
      entryDiv.className = "ranking__entry-view";
      if(trainee){
        entryDiv.innerHTML = `
          <img class="ranking__entry-img" src="assets/${trainee.image}" alt="${trainee.name}" />
          <div class="ranking__entry-icon-border"></div>
          <div class="ranking__entry-icon-crown"></div>
          <div class="ranking__row-text">${trainee.name}</div>
        `;
      }
      pyramidContainer.appendChild(entryDiv);
      index++;
    }
  });
}

// =======================
// FILTER TABLE
// =======================
function filterTrainees(e){
  const term = e.target.value.toLowerCase();
  Array.from(tableContainer.children).forEach(entry => {
    const name = entry.querySelector(".name").textContent.toLowerCase();
    const hangul = entry.querySelector(".hangul").textContent;
    entry.style.display = name.includes(term) || hangul.includes(term) ? "flex" : "none";
  });
}

// =======================
// INIT
// =======================
populateTable();
updateRanking();

// =======================
// SHARE LINK
// =======================
function generateShareLink() {
  const link = `${window.location.href.split("?")[0]}?top12=${selectedTop12.join(",")}`;
  document.getElementById("getlink-textbox").value = link;
}

function copyLink() {
  const textbox = document.getElementById("getlink-textbox");
  textbox.select();
  navigator.clipboard.writeText(textbox.value);
  alert("Link copied!");
}
