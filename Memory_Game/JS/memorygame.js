const play = document.querySelector('.play');
const restart = document.querySelector('.restart');
const gameSpace = document.querySelector('.container');
const countMove = document.querySelector('.countMove');
const time = document.querySelector('.time');
const score = document.querySelector('.score');
const cards = document.querySelectorAll('.card');
const stars = document.querySelectorAll('.stars');
// initial state
let countNumberOfClicks = 0;
let countNumberOfMove = 0;
let msecs = 0;
let secs = 0;
let mins = 0;
let trueCount = 0;
let twoCardsChoosed = [];
let ordersCards = [];
let clickPlayButton = 0;
// change order of cards
for (i = 0; i < 16; i++) {
    ordersCards.push((Math.random() * 15).toFixed(0));
}
for (i = 0; i < 16; i++) {
    cards[i].style.order = `${ordersCards[i]}`;
}
// timer
function Time() {
    msecs++;
    if (msecs === 10) {
        secs++;
        msecs = 0;
    }
    if (secs === 60) {
        mins++;
        secs = 0;
    }
    time.textContent = `time : ${mins}:${secs}:${msecs}`;
}
play.addEventListener('click', function (e) {
    // prevent timer become faster when clicked play button again
    if (clickPlayButton === 0) {
        Timer = setInterval(Time, 100);
        clickPlayButton = 1;
    }
    gameSpace.addEventListener('click', game)
    restart.addEventListener('click', restartGame);
})
// when clicked the play button
function game(e) {
    // prevent any action if card when clicked on clicked card or true card
    if (e.target.classList.contains('clicked-card', 'true-card')) {

    }
    // if card didn't click or true choice
    else if (e.target.classList.contains('card')) {
        // save the first two cards clicked to compare
        twoCardsChoosed.push(e.target);
        countNumberOfClicks++;
        if (countNumberOfClicks <= 2) {
            // rotate card when clicked and appear the shap
            e.target.style.transition = "1.5s"
            e.target.style.transform = "rotate(3600deg)";
            e.target.classList.add('clicked-card')
            e.target.firstElementChild.style.display = "inline-block";
            // when clicked the two cards
            if (countNumberOfClicks === 2 && twoCardsChoosed.length === 2) {
                // change number of movement by one
                countNumberOfMove++;
                countMove.textContent = `Moves: ${countNumberOfMove}`
                // change rate stars 
                if (countNumberOfMove > 10 && countNumberOfMove < 21) {
                    stars[0].children[2].style.display = 'none'
                } else if (countNumberOfMove > 20) {
                    stars[0].children[1].style.display = 'none'
                }
                // if the two cards true
                if (twoCardsChoosed[0].firstElementChild.classList[1] === twoCardsChoosed[1].firstElementChild.classList[1]) {
                    for (i = 0; i < 2; i++) {
                        twoCardsChoosed[i].classList.add('true-card')
                    }
                    // return to the default state
                    twoCardsChoosed = [];
                    countNumberOfClicks = 0;
                    // increase score by one
                    trueCount++;
                    score.textContent = `Score: ${trueCount}`
                    // finish the game
                    if (trueCount === 8) {
                        // stop timer
                        clearInterval(Timer);
                        // return to the default state
                        clickPlayButton = 0;
                        // make congratulations body
                        setTimeout(finish, 2000)
                    }

                }
                // if the two cards choosed wrong 
                else {

                    timer = setTimeout(wrong, 2000)
                }
            }
        }
    }
}
// when the two cards are wrong
function wrong() {
    for (i = 0; i < 2; i++) {
        // return card to unclicked state
        if (twoCardsChoosed[i].classList.contains('clicked-card')) {
            twoCardsChoosed[i].classList.remove('clicked-card')
        }
        // disapear the shape
        twoCardsChoosed[i].firstElementChild.style.display = "none";
        // rotate to zero
        twoCardsChoosed[i].style.transform = "rotate(0deg)";

    }
    // return to default state
    twoCardsChoosed = [];
    countNumberOfClicks = 0;
}
// when clicked restart button
function restartGame() {
    // return to the default state
    countNumberOfClicks = 0;
    countNumberOfMove = 0;
    msecs = 0;
    secs = 0;
    mins = 0;
    trueCount = 0;
    twoCardsChoosed = [];
    ordersCards = [];
    // return the three stars for rate
    for (i = 0; i < 3; i++) {
        stars[0].children[i].style.display = "inline-block";
    }
    // return time,moves,score to zero
    time.textContent = `time : ${mins}:${secs}:${msecs}`;

    countMove.textContent = `Moves: ${countNumberOfMove}`

    score.textContent = `Score: ${trueCount}`
    // return cards to default state aand changed the order of cards
    for (i = 0; i < 16; i++) {
        if (cards[i].classList.contains('true-card')) {
            cards[i].classList.remove('true-card')
        }
        if (cards[i].classList.contains('clicked-card')) {
            cards[i].classList.remove('clicked-card')
        }
        ordersCards.push((Math.random() * 15).toFixed(0));
        cards[i].style.order = `${ordersCards[i]}`;
        cards[i].firstElementChild.style.display = "none";


    }
}
// when finish the gamed
function finish() {
    // remove the game 
    gameSpace.remove();
    // remove Listener for play button clicked
    gameSpace.removeEventListener('click', game)
    // build congratulations body
    let mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'congratulations')
    mainDiv.innerHTML = `
                                <h1> Congratulations </h1>
                                <h2> Your time  ${mins}:${secs}:${msecs}</h2>
                                <h2> Your score : ${trueCount}</h2>
                                <h2> Number of star : <h4>${stars[0].innerHTML}</h4></h2>
                                <button class="btn btn-primary">Replay</button>`

    document.body.appendChild(mainDiv);
    const replay = document.querySelector('button');
    // to bake to game again
    replay.addEventListener('click', replayGame)
}
// when clicked replay button on congratulations pop-up
function replayGame () {
    // remove congratulations body
    const mainDiv = document.querySelector('.congratulations');
    mainDiv.remove();
    // return game body again
    document.body.appendChild(gameSpace);
    //return to default state
    countNumberOfClicks = 0;
    countNumberOfMove = 0;
    msecs = 0;
    secs = 0;
    mins = 0;
    trueCount = 0;
    twoCardsChoosed = [];
    ordersCards = [];
    time.textContent = `time : ${mins}:${secs}:${msecs}`;

    countMove.textContent = `Moves: ${countNumberOfMove}`

    score.textContent = `Score: ${trueCount}`
    for (i = 0; i < 3; i++) {
        stars[0].children[i].style.display = "inline-block";
    }

    for (i = 0; i < 16; i++) {
        if (cards[i].classList.contains('true-card')) {
            cards[i].classList.remove('true-card')
        }
        if (cards[i].classList.contains('clicked-card')) {
            cards[i].classList.remove('clicked-card')
        }
        ordersCards.push((Math.random() * 15).toFixed(0));
        cards[i].style.order = `${ordersCards[i]}`;
        cards[i].firstElementChild.style.display = "none";
        cards[i].style.transform = "rotate(0deg)";;
    }
}
