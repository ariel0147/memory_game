// // המערך המקורי של התמונות מוכפל מראש (כל תמונה פעמיים)
const arr_imegs = [
  "./imegs/תמונות פריוקט js/Capybara.jpg",
  "./imegs/תמונות פריוקט js/Capybara.jpg",
  "./imegs/תמונות פריוקט js/eagle.jpg",
  "./imegs/תמונות פריוקט js/eagle.jpg",
  "./imegs/תמונות פריוקט js/fox.jpg",
  "./imegs/תמונות פריוקט js/fox.jpg",
  "./imegs/תמונות פריוקט js/horse.jpg",
  "./imegs/תמונות פריוקט js/horse.jpg",
  "./imegs/תמונות פריוקט js/lion.jpg",
  "./imegs/תמונות פריוקט js/lion.jpg",
  "./imegs/תמונות פריוקט js/panda.jpg",
  "./imegs/תמונות פריוקט js/panda.jpg",
  "./imegs/תמונות פריוקט js/Polar bear.jpg",
  "./imegs/תמונות פריוקט js/Polar bear.jpg",
  "./imegs/תמונות פריוקט js/raccoon.jpg",
  "./imegs/תמונות פריוקט js/raccoon.jpg",
  "./imegs/תמונות פריוקט js/shark.jpg",
  "./imegs/תמונות פריוקט js/shark.jpg",
  "./imegs/תמונות פריוקט js/snake.jpg",
  "./imegs/תמונות פריוקט js/snake.jpg",
  "./imegs/תמונות פריוקט js/tiger.jpg",
  "./imegs/תמונות פריוקט js/tiger.jpg",
  "./imegs/תמונות פריוקט js/wolf.jpg",
  "./imegs/תמונות פריוקט js/wolf.jpg"
];

// מערך משני שיכיל את התמונות אחרי הערבוב
let gameImages = [];

let selectedCards = []; // מערך שישמור את האינדקסים של התמונות שנבחרו

let canClick = true;

// פונקציית רנדום
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// פונקציית ערבוב הקלפים
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRndInteger(0, i + 1);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// פונקציית התחלת משחק
function start() {
  gameImages = [];
  for (let i = 0; i < arr_imegs.length; i++) {
    gameImages.push(arr_imegs[i]);
  }

  shuffle(gameImages); // ערבוב
  console.log(gameImages);

  // איפוס הלוח
  let body = "";
  for (let indx = 0; indx < gameImages.length; indx++) {
    body += `<div class='card' id="div_${indx}" onclick='click_card(${indx})'></div>`;
  }
  document.getElementById('body_game').innerHTML = body;
  selectedCards = [];
  canClick = true;
}

// פונקציית לחיצה על קלף
function click_card(index) {
  if (!canClick) return;

  let divId = "div_" + index;
  let currentDiv = document.getElementById(divId);

  if (currentDiv.style.backgroundImage != "") return;

  let img_url = gameImages[index];
  currentDiv.style.backgroundImage = "url('" + img_url + "')";

  selectedCards.push(index); // שומר רק את האינדקס

  if (selectedCards.length == 2) {
    canClick = false;
    setTimeout(check_card, 1000);
  }
}

// פונקציית בדיקת הכרטיסים
function check_card() {
  let index1 = selectedCards[0];
  let index2 = selectedCards[1];

  let div1 = document.getElementById("div_" + index1);
  let div2 = document.getElementById("div_" + index2);

  if (gameImages[index1] == gameImages[index2]) {
    div1.style.border = "3px solid green";
    div2.style.border = "3px solid green";
  } else {
    div1.style.backgroundImage = "";
    div2.style.backgroundImage = "";
  }

  selectedCards = [];
  canClick = true;

  // בדיקת ניצחון
  let cards = document.getElementsByClassName("card");
  let all_Open = true;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].style.backgroundImage == "") {
      all_Open = false;
      break;
    }
  }

  if (all_Open) {
    alert("Congratulations you won the memory game");
  }
}
