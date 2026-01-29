const arr_imegs = [
    "./imegs/תמונות פריוקט js/Capybara.jpg", "./imegs/תמונות פריוקט js/Capybara.jpg",
    "./imegs/תמונות פריוקט js/eagle.jpg", "./imegs/תמונות פריוקט js/eagle.jpg",
    "./imegs/תמונות פריוקט js/fox.jpg", "./imegs/תמונות פריוקט js/fox.jpg",
    "./imegs/תמונות פריוקט js/horse.jpg", "./imegs/תמונות פריוקט js/horse.jpg",
    "./imegs/תמונות פריוקט js/lion.jpg", "./imegs/תמונות פריוקט js/lion.jpg",
    "./imegs/תמונות פריוקט js/panda.jpg", "./imegs/תמונות פריוקט js/panda.jpg",
    "./imegs/תמונות פריוקט js/Polar bear.jpg", "./imegs/תמונות פריוקט js/Polar bear.jpg",
    "./imegs/תמונות פריוקט js/raccoon.jpg", "./imegs/תמונות פריוקט js/raccoon.jpg",
    "./imegs/תמונות פריוקט js/shark.jpg", "./imegs/תמונות פריוקט js/shark.jpg",
    "./imegs/תמונות פריוקט js/snake.jpg", "./imegs/תמונות פריוקט js/snake.jpg",
    "./imegs/תמונות פריוקט js/tiger.jpg", "./imegs/תמונות פריוקט js/tiger.jpg",
    "./imegs/תמונות פריוקט js/wolf.jpg", "./imegs/תמונות פריוקט js/wolf.jpg"
];

let gameImages = [];
let selectedCards = [];
let canClick = true;

function start() {
    gameImages = [...arr_imegs];
    gameImages.sort(() => Math.random() - 0.5);

    let body = "";
    for (let i = 0; i < gameImages.length; i++) {
        body += `<div class='card' id="div_${i}" onclick='click_card(${i})'></div>`;
    }
    document.getElementById('body_game').innerHTML = body;
    selectedCards = [];
    canClick = true;
}

function click_card(index) {
    if (!canClick) return;
    let card = document.getElementById("div_" + index);
    if (card.style.backgroundImage !== "") return;

    card.style.backgroundImage = `url('${gameImages[index]}')`;
    selectedCards.push(index);

    if (selectedCards.length === 2) {
        canClick = false;
        setTimeout(check_card, 800);
    }
}

function check_card() {
    let [idx1, idx2] = selectedCards;
    let card1 = document.getElementById("div_" + idx1);
    let card2 = document.getElementById("div_" + idx2);

    if (gameImages[idx1] === gameImages[idx2]) {
        card1.style.border = "3px solid #27ae60";
        card2.style.border = "3px solid #27ae60";
    } else {
        card1.style.backgroundImage = "";
        card2.style.backgroundImage = "";
    }
    selectedCards = [];
    canClick = true;
    checkWin();
}

function checkWin() {
    let cards = document.getElementsByClassName("card");
    let allOpen = Array.from(cards).every(c => c.style.backgroundImage !== "");
    if (allOpen) alert("כל הכבוד! ניצחת במשחק!");
}