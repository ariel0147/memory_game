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
let moves = 0;
let timerInterval;
let startTime;
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function start() {

    gameImages = [...arr_imegs];
    shuffle(gameImages);
    selectedCards = [];
    canClick = true;
    moves = 0;
    updateMoves();
    resetTimer();
    startTimer();


    let body = "";
    for (let i = 0; i < gameImages.length; i++) {

        body += `
        <div class="card-container" onclick="click_card(${i})">
            <div class="card" id="card_${i}">
                <div class="card-face card-front"></div>
                <div class="card-face card-back" style="background-image: url('${gameImages[i]}');"></div>
            </div>
        </div>`;
    }
    document.getElementById('body_game').innerHTML = body;
}


function click_card(index) {
    if (!canClick) return;

    let cardElement = document.getElementById(`card_${index}`);


    if (cardElement.classList.contains("flipped")) return;


    cardElement.classList.add("flipped");
    selectedCards.push(index);

    if (selectedCards.length === 2) {

        moves++;
        updateMoves();

        canClick = false;
        setTimeout(check_card, 800);
    }
}


function check_card() {
    let [idx1, idx2] = selectedCards;
    let card1 = document.getElementById(`card_${idx1}`);
    let card2 = document.getElementById(`card_${idx2}`);

    if (gameImages[idx1] === gameImages[idx2]) {

        card1.querySelector('.card-back').classList.add('matched');
        card2.querySelector('.card-back').classList.add('matched');
        checkWin();
    } else {

        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }

    selectedCards = [];
    canClick = true;
}


function checkWin() {
    let cards = document.getElementsByClassName("card");
    let allFlipped = true;

    for (let card of cards) {
        if (!card.classList.contains("flipped")) {
            allFlipped = false;
            break;
        }
    }

    if (allFlipped) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`כל הכבוד! ניצחת במשחק!\nזמן: ${document.getElementById('timer').innerText.replace('זמן: ', '')}\nמספר מהלכים: ${moves}`);
        }, 500);
    }
}



function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let totalSeconds = Math.floor(elapsedTime / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;
        let formattedTime =
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (secs < 10 ? "0" + secs : secs);

        document.getElementById('timer').innerText = "זמן: " + formattedTime;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = "זמן: 00:00";
}

function updateMoves() {
    document.getElementById('moves').innerText = "מהלכים: " + moves;
}