"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const ZODIAC = ["https://upload.wikimedia.org/wikipedia/commons/f/f4/OMBRE_CHINOISE_RAT.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/OMBRE_CHINOISE_BUFFLE.jpg/330px-OMBRE_CHINOISE_BUFFLE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/OMBRE_CHINOISE_TIGRE.jpg/330px-OMBRE_CHINOISE_TIGRE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/OMBRE_CHINOISE_LIEVRE_2.jpg/330px-OMBRE_CHINOISE_LIEVRE_2.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/OMBRE_CHINOISE_DRAGON.jpg/330px-OMBRE_CHINOISE_DRAGON.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/OMBRE_CHINOISE_DRAGON.jpg/330px-OMBRE_CHINOISE_DRAGON.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/OMBRE_CHINOISE_CHEVAL.jpg/330px-OMBRE_CHINOISE_CHEVAL.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/OMBRE_CHINOISE_CHEVRE.jpg/330px-OMBRE_CHINOISE_CHEVRE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/OMBRE_CHINOISE_SINGE.jpg/330px-OMBRE_CHINOISE_SINGE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/OMBRE_CHINOISE_COQ.jpg/330px-OMBRE_CHINOISE_COQ.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/OMBRE_CHINOISE_CHIEN.jpg/330px-OMBRE_CHINOISE_CHIEN.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/OMBRE_CHINOISE_SANGLIER.jpg/330px-OMBRE_CHINOISE_SANGLIER.jpg",
"https://upload.wikimedia.org/wikipedia/commons/f/f4/OMBRE_CHINOISE_RAT.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/OMBRE_CHINOISE_BUFFLE.jpg/330px-OMBRE_CHINOISE_BUFFLE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/OMBRE_CHINOISE_TIGRE.jpg/330px-OMBRE_CHINOISE_TIGRE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/OMBRE_CHINOISE_LIEVRE_2.jpg/330px-OMBRE_CHINOISE_LIEVRE_2.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/OMBRE_CHINOISE_DRAGON.jpg/330px-OMBRE_CHINOISE_DRAGON.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/OMBRE_CHINOISE_DRAGON.jpg/330px-OMBRE_CHINOISE_DRAGON.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/OMBRE_CHINOISE_CHEVAL.jpg/330px-OMBRE_CHINOISE_CHEVAL.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/OMBRE_CHINOISE_CHEVRE.jpg/330px-OMBRE_CHINOISE_CHEVRE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/OMBRE_CHINOISE_SINGE.jpg/330px-OMBRE_CHINOISE_SINGE.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/OMBRE_CHINOISE_COQ.jpg/330px-OMBRE_CHINOISE_COQ.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/OMBRE_CHINOISE_CHIEN.jpg/330px-OMBRE_CHINOISE_CHIEN.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/OMBRE_CHINOISE_SANGLIER.jpg/330px-OMBRE_CHINOISE_SANGLIER.jpg"

]

const colors = shuffle(COLORS);

const zodiac = shuffle(ZODIAC);

//createCards2(zodiac);

createCards(colors);
let moveCount = 0;
let topScore = Infinity; //set to diff value? depends on how I handle it...
let cardQueue = [];
let statBox = document.getElementById("statusBox");


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const newCard = document.createElement('div');
    const newCardInner = document.createElement('div');
    const newCardFront = document.createElement('div');
    const newCardBack = document.createElement('div');
    const qMarkImage = document.createElement('img');
    qMarkImage.src = "https://i.pinimg.com/originals/af/12/dd/af12dd4642396c427e405dc1175468ce.png";
    qMarkImage.setAttribute("id", "questionMark");
    newCard.setAttribute("class", "fullCard");
    newCardInner.setAttribute("class", "innerCard");
    newCardFront.setAttribute("class", "cardFront");
    newCardBack.setAttribute("class", color + " " + "cardBack");
    newCard.appendChild(newCardInner);
    newCardFront.appendChild(qMarkImage);
    newCardInner.appendChild(newCardFront);
    newCardInner.appendChild(newCardBack);
    newCardBack.classList.add(color);
    newCard.addEventListener("click", handleCardClick);
    gameBoard.appendChild(newCard);
  }
}

function createCards2(zodiac) {
  const gameBoard = document.getElementById("game");
  for (let sign of zodiac) {
    const newCard = document.createElement('div');
    const newCardInner = document.createElement('div');
    const newCardFront = document.createElement('div');
    const newCardBack = document.createElement('div');
    const qMarkImage = document.createElement('img');
    qMarkImage.src = "https://i.pinimg.com/originals/af/12/dd/af12dd4642396c427e405dc1175468ce.png";
    const signImg = document.createElement('img');
    signImg.src = sign;
    signImg.setAttribute("class", "zImage");
    qMarkImage.setAttribute("id", "questionMark");
    newCard.setAttribute("class", "fullCard");
    newCardInner.setAttribute("class", "innerCard");
    newCardFront.setAttribute("class", "cardFront");
    newCardBack.setAttribute("class", "cardBack");
    newCard.appendChild(newCardInner);
    newCardFront.appendChild(qMarkImage);
    newCardInner.appendChild(newCardFront);
    newCardInner.appendChild(newCardBack);
    newCardBack.appendChild(signImg);
    newCard.addEventListener("click", handleCardClick);
    gameBoard.appendChild(newCard);
  }

}

/** Flip a card face-up. */

function flipCard(card) {
  let board = document.getElementById("game");
  let layerOne = card.firstElementChild;
  //on 1, no check, so increment moveCount, then check whether it's even or odd
  layerOne.style.transform = "rotateY(180deg)";
  moveCount++;
  document.getElementById("moveBox").innerText = "Move Count: " + moveCount;
  if (moveCount % 2 === 0) {
    let prevCard = cardQueue.pop();
    if (card.isEqualNode(prevCard) && !(card === prevCard)) {
      //In this case, we have a match.
      cardQueue.push(prevCard);
      cardQueue.push(card);
      statBox.innerText = "Found a match!"
      if (cardQueue.length === board.children.length) {
        //The game is over in this case.
        statBox.innerText = "Congratulations! You won!"
        if (topScore > moveCount) {
          topScore = moveCount;
        }
        console.log(topScore);
        localStorage.setItem("topScore", JSON.stringify(topScore));
      }
      setTimeout(unfreezeBoard, 100)
    } else {
      //In this case, we have no match.
      statBox.innerText = "Try again!";
      setTimeout(unFlipCard, 1000, card);
      setTimeout(unFlipCard, 1000, prevCard);
      setTimeout(unfreezeBoard, 1200);
    }

    } else {
    //Here, we have an odd number of cards flipped, so we wait for the next click.
    cardQueue.push(card);
    setTimeout(unfreezeBoard, 100)
  }

}

/** Flip a card face-down. */

function unFlipCard(card) {
  //This won't ever be called by a click, only by flipCard.
  let layerOne = card.firstElementChild;
  layerOne.style.transform = "rotateY(0deg)";
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  freezeBoard();
  let chosenCard = evt.target;
  flipCard(chosenCard);

}

//The following two functions prevent the player from flipping more cards
//when they should not be able to.
function freezeBoard() {
  document.getElementById("game").style.pointerEvents = "none";
}

function unfreezeBoard() {
  document.getElementById("game").style.pointerEvents = "auto";
}

//A button that starts a new game.
const starter = document.getElementById("startButton");

starter.addEventListener("click", restart);
function restart() {
  unfreezeBoard();
  statBox.innerText = "Test your recall!";
  moveCount = 0;
  while (cardQueue.length > 0) {
    cardQueue.pop();
  }
  let board = document.getElementById("game");
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  const colorsTwo = shuffle(COLORS);
  createCards(colorsTwo);
  document.getElementById("moveBox").innerText = "Move Count: 0";
  let topString = localStorage.getItem("topScore");
  document.getElementById("topBox").innerText = "Top Score: " + topString;
}

const switcher = document.getElementById("imgButton");

switcher.addEventListener("click", newStart);

function newStart() {
  unfreezeBoard();
  statBox.innerText = "Test your recall!";
  moveCount = 0;
  while (cardQueue.length > 0) {
    cardQueue.pop();
  }
  let board = document.getElementById("game");
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  const zodiacTwo = shuffle(ZODIAC);
  createCards2(zodiacTwo);
  document.getElementById("moveBox").innerText = "Move Count: 0";
  let topString = localStorage.getItem("topScore");
  document.getElementById("topBox").innerText = "Top Score: " + topString;
}


