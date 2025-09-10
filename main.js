const trainees = [
  {name_romanized:"Yunon", name_hangul:"유논", nationality:"JAPAN", birthyear:200?, image:"Yunon.png"},
  {name_romanized:"Urara", name_hangul:"우라라", nationality:"JAPAN", birthyear:200?, image:"Urara.png"},
  {name_romanized:"Shiho", name_hangul:"시호", nationality:"JAPAN", birthyear:2009, image:"Shiho.png"},
  {name_romanized:"Sena", name_hangul:"세나", nationality:"JAPAN", birthyear:2009, image:"Sena.png"},
  {name_romanized:"Sea", name_hangul:"세아", nationality:"JAPAN", birthyear:200?, image:"Sea.png"},
  {name_romanized:"Sasa", name_hangul:"사사", nationality:"JAPAN", birthyear:200?, image:"Sasa.png"},
  {name_romanized:"Saaya", name_hangul:"사아야", nationality:"JAPAN", birthyear:200?, image:"Saaya.png"},
  {name_romanized:"Rino", name_hangul:"리노", nationality:"JAPAN", birthyear:2007, image:"Rino.png"},
  {name_romanized:"Niko", name_hangul:"니코", nationality:"JAPAN", birthyear:200?, image:"Niko.png"},
  {name_romanized:"Natsuho", name_hangul:"나츠호", nationality:"JAPAN", birthyear:200?, image:"Natsuho.png"},
  {name_romanized:"Nana", name_hangul:"나나", nationality:"JAPAN", birthyear:200?, image:"Nana.png"},
  {name_romanized:"Miyabi", name_hangul:"미야비", nationality:"JAPAN", birthyear:200?, image:"Miyabi.png"},
  {name_romanized:"Mirika", name_hangul:"미리카", nationality:"JAPAN", birthyear:200?, image:"Mirika.png"},
  {name_romanized:"Mia", name_hangul:"미아", nationality:"JAPAN", birthyear:200?, image:"Mia.png"},
  {name_romanized:"Mayu", name_hangul:"마유", nationality:"JAPAN", birthyear:2011, image:"Mayu.png"},
  {name_romanized:"Koko", name_hangul:"코코", nationality:"JAPAN", birthyear:200?, image:"Koko.png"},
  {name_romanized:"Karin", name_hangul:"카린", nationality:"JAPAN", birthyear:2011, image:"Karin.png"},
  {name_romanized:"Hina", name_hangul:"히나", nationality:"JAPAN", birthyear:200?, image:"Hina.png"},
  {name_romanized:"Hanabi", name_hangul:"하나비", nationality:"JAPAN", birthyear:200?, image:"Hanabi.png"},
  {name_romanized:"Kokoro", name_hangul:"코코로", nationality:"JAPAN", birthyear:200?, image:"Kokoro.png"},
  {name_romanized:"Yun Seoyoung", name_hangul:"윤서영", nationality:"KOREA", birthyear:2007, image:"YunSeoyoung.png"},
  {name_romanized:"Yoon Sooin", name_hangul:"윤수인", nationality:"KOREA", birthyear:2005, image:"YoonSooin.png"},
  {name_romanized:"Yoon Chaeeun", name_hangul:"윤채은", nationality:"KOREA", birthyear:2005, image:"YoonChaeeun.png"},
  {name_romanized:"Yang Jaeyun", name_hangul:"양재윤", nationality:"KOREA", birthyear:200?, image:"YangJaeyun.png"},
  {name_romanized:"Shin Yookyung", name_hangul:"신유경", nationality:"KOREA", birthyear:200?, image:"ShinYookyung.png"},
  {name_romanized:"Ryu Hajin", name_hangul:"류하진", nationality:"KOREA", birthyear:200?, image:"RyuHajin.png"},
  {name_romanized:"Nam Yuju", name_hangul:"남유주", nationality:"KOREA", birthyear:2007, image:"NamYuju.png"},
  {name_romanized:"Min Jiho", name_hangul:"민지호", nationality:"KOREA", birthyear:2009, image:"MinJiho.png"},
  {name_romanized:"Lee Seohyun", name_hangul:"이서현", nationality:"KOREA", birthyear:200?, image:"LeeSeohyun.png"},
  {name_romanized:"Lee Jooeun", name_hangul:"이주은", nationality:"KOREA", birthyear:200?, image:"LeeJooeun.png"},
  {name_romanized:"Lee Chaeyeon", name_hangul:"이채연", nationality:"KOREA", birthyear:200?, image:"LeeChaeyeon.png"},
  {name_romanized:"Lee Chaehyun", name_hangul:"이채현", nationality:"KOREA", birthyear:200?, image:"LeeChaehyun.png"},
  {name_romanized:"Kwon Dohee", name_hangul:"권도희", nationality:"KOREA", birthyear:200?, image:"KwonDohee.png"},
  {name_romanized:"Kim Yeeun", name_hangul:"김예은", nationality:"KOREA", birthyear:200?, image:"KimYeeun.png"},
  {name_romanized:"Kim Sujin", name_hangul:"김준서", nationality:"KOREA", birthyear:2009, image:"KimSujin.png"},
  {name_romanized:"Kim Doyi", name_hangul:"김도이", nationality:"KOREA", birthyear:2008, image:"KimDoyi.png"},
  {name_romanized:"Kim Chaerin", name_hangul:"김채린", nationality:"KOREA", birthyear:2010, image:"KimChaerin.png"},
  {name_romanized:"Han Heeheon", name_hangul:"한희연", nationality:"KOREA", birthyear:200?, image:"HanHeeheon.png"},
  {name_romanized:"Choi Youmin", name_hangul:"최유민", nationality:"KOREA", birthyear:200?, image:"ChoiYoumin.png"},
  {name_romanized:"Choi Gayoon", name_hangul:"최가윤", nationality:"KOREA", birthyear:200?, image:"ChoiGayoon.png"}
];

// =======================
// GLOBAL VARIABLES
// =======================
let ranking = Array(12).fill(null);
let showTop12 = true;

// =======================
// HELPER FUNCTIONS
// =======================
function renderTable() {
  const container = document.getElementById("table__entry-container");
  container.innerHTML = "";
  trainees.forEach((t, index) => {
    const entry = document.createElement("div");
    entry.className = "table__entry";
    entry.dataset.index = index;
    entry.innerHTML = `
      <img class="table__entry-img" src="assets/trainees/${t.image}" />
      <div class="table__entry-text">
        <div class="name">${t.name}</div>
        <div class="hangul">${t.hangul}</div>
        <div class="natl">${t.nationality}</div>
        <div class="year">${t.birthyear ? new Date().getFullYear() - t.birthyear : ""} yrs</div>
      </div>
    `;
    entry.addEventListener("click", () => toggleRank(t));
    container.appendChild(entry);
  });
}

function renderRanking() {
  const pyramid = document.getElementById("ranking__pyramid");
  pyramid.innerHTML = "";
  const rows = [1, 2, 4, 5]; // row sizes
  let idx = 0;

  rows.forEach(rowSize => {
    const row = document.createElement("div");
    row.className = "ranking__row";
    for (let i = 0; i < rowSize; i++) {
      const t = ranking[idx];
      const entry = document.createElement("div");
      entry.className = "ranking__entry";
      entry.innerHTML = `
        <div class="ranking__entry-view">
          <img class="ranking__entry-img" src="${t ? "assets/trainees/"+t.image : "assets/crown.PNG"}" />
          <div class="ranking__entry-icon-border"></div>
          ${t ? '<div class="ranking__entry-icon-crown"></div>' : ''}
          <div class="ranking__entry-icon-badge">${idx+1}</div>
        </div>
        <div class="ranking__row-text">
          <div class="name">${t ? t.name : "Empty"}</div>
          <div class="hangul">${t ? t.hangul : ""}</div>
        </div>
      `;
      entry.addEventListener("click", () => removeRank(idx));
      row.appendChild(entry);
      idx++;
    }
    pyramid.appendChild(row);
  });
}

function toggleRank(trainee) {
  // find first empty spot
  const emptyIdx = ranking.findIndex(r => r === null);
  if (emptyIdx !== -1 && !ranking.includes(trainee)) {
    ranking[emptyIdx] = trainee;
  } else if (ranking.includes(trainee)) {
    // already ranked, remove
    const removeIdx = ranking.indexOf(trainee);
    ranking[removeIdx] = null;
  }
  renderRanking();
}

// remove from ranking by index
function removeRank(index) {
  ranking[index] = null;
  renderRanking();
}

// =======================
// INIT
// =======================
window.addEventListener("load", () => {
  renderTable();
  renderRanking();
});