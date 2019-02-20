/*
 * Create a list that holds all of your cards
 */

 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */
  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */

let openList = []; //to store the open cards
let matchList = []; // to store the matched cards
let moveCounter = 0; //To keep track of clicks
let theDeck = document.querySelector('.deck');

/************Starting the game*********/
let startBox = document.querySelector('.start-box');
let startBtn = document.querySelector('.start-button');
  startBtn.addEventListener('click', function(){
    theDeck.classList.remove('hide');
    createCards();
    restartGame();
    startTimer();
    startBox.classList.add('hide');

  });



/*********** Creating cards ********/
function createCards(){
  let icons =  ['fa fa-diamond', 'fa fa-diamond',
               'fa-paper-plane-o', 'fa-paper-plane-o',
               'fa fa-anchor', 'fa fa-anchor',
               'fa fa-bolt', 'fa fa-bolt',
               'fa fa-cube', 'fa fa-cube',
               'fa fa-leaf', 'fa fa-leaf',
               'fa fa-bicycle', 'fa fa-bicycle',
               'fa fa-bomb', 'fa fa-bomb'
               ];

  shuffle(icons);
  for (let i=0; i<16; i++){
    var cards = document.createElement('li');
    cards.innerHTML = `<i class='fa ${icons[i]}'></i>`;
    cards.classList.add('card');
    theDeck.appendChild(cards);
  }
  let allCards = document.querySelectorAll('.card');
  for (let card of allCards){
    card.addEventListener('click', function(){
      moveCounter ++;
      countMoves(moveCounter);
      stars();
      addToOpenList(card);
    });
  }

}

/**************Remove cards************/
function removeCards(){
  theDeck.innerHTML = '';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*********** Adding cards to openList ********/
function addToOpenList(card){
  openList.push(card);
  console.log(`Open ${openList[0]} and ${openList[1]}`);
  if(openList.length <= 2){
    card.classList.add('open', 'show');
  }
  if (openList.length === 2){
    matchCards(openList);
  }
}


/***********Matching cards******************/
function matchCards(openList){
  // If the cards match
  if(openList[0].children[0].classList.value==openList[1].children[0].classList.value){
        for (card of openList){
            matchList.push(card);
            card.classList.add('match', 'flip');
            card.classList.remove('open', 'show');
        }
        // uiFeedback(matchList); //To manipulate the gradient
      openList.length=0; //Empties the openList so the clicking is allowed again
      if(matchList.length===16){
        setTimeout(function () {
        stopTimer();
        showResult();
        }, 500);
      }
  }
  //If the cards don't match
  else {
    for (card of openList){
      card.classList.add('wobble');
    }
    setTimeout(function () {
      for (card of openList){
        card.classList.remove('open', 'show', 'wobble');
      }
      openList.length = 0;
    }, 500);
  }
}

/***********Restarting the game*****************/
function restartGame(){
  let restart = document.querySelector('.restart');
  restart.addEventListener('click', function(){
    stopTimer();
    resetGame();
  });
}

function resetGame(){
  //Remove any open cards
  if(openList.length>0){
    for (card of openList){
      card.classList.remove('open', 'show', 'wobble', 'match', 'flip');
    }
      openList = [];
  }
  //Remove any matched cards
  if(matchList.length>0){
    for (card of matchList){
      card.classList.remove('match', 'flip');
    }
    matchList = [];
  }
  //Reset and display 0 moves.
  moveCounter = 0;
  countMoves(moveCounter);

  removeCards(); //We need cards to be reshuffled.
  createCards(); //Create reshuffled cards.
  stars(); //Reset stars
  startTimer();
}


/************ Give star rating ****************/
function stars(){
  let stars = document.querySelectorAll('.fa-star');
  for (star of stars){
    star.classList.remove('hide-star') //Resets the hidden stars.
  }
  if (moveCounter > 26 & moveCounter < 36){
    stars[2].classList.add('hide-star');
  }
  else if (moveCounter >= 37){
    stars[1].classList.add('hide-star');
  }
}

/***********Display number of moves**********/
function countMoves(moveCounter){
  let moves = document.querySelector('.moves');
  moves.innerHTML = moveCounter;
}

/**********Show results in a modal box************/
function showResult(){
  let modalBox = document.querySelector('.result-modal');
  let modalContent = document.querySelector('.result-modal-content');
  let winMessage = document.querySelector('.win-message');
  let starsRemoved = document.querySelectorAll('.hide-star');
  let starsLeft = 3 - starsRemoved.length;
  winMessage.innerHTML =    `<span class=\"win-heading\">You made it!</span><br />
                            <span class=\"win-message\">It took you ${min} minutes
                            and ${sec} seconds to finish the game. You made
                            ${moveCounter} moves and got ${starsLeft} stars. </span><br />
                            <button class=\"play-again\">Play again</button>`;
  modalBox.classList.remove('hide');
  modalContent.classList.add('animate-modal-content');
  let restartBtn = document.querySelector('.play-again');
  restartBtn.addEventListener('click', function(){
    modalBox.classList.add('hide');
    resetGame();
  });
}

/*****************All about timer**************/
var interval;
let time = 0;
let min = 0;
let sec = 0;
function startTimer(){
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds')
  interval = setInterval(function(){
    time++;
    min = Math.floor(time/60);
    sec = time - (min*60) ;
    minutes.innerHTML = pad(min);
    seconds.innerHTML= pad(sec);
  }, 1000)
}

function stopTimer(){
  clearInterval(interval);
  time = 0;
}

function pad(n){
  return ('00' + n).substr(-2); //return the last two characters
}

/*************Background test** *****/
// let background = 0;
// let percentage = 0;
// function uiFeedback(matchList){
//   for (cards of matchList){
//     background++;
//     percentage = 100 - (background * 6.25);
//     console.log(background);
//     theDeck.style.background = `linear-gradient(lightgrey 0%, white 5%, skyblue 50%, orange ${percentage}%, lightgrey 100%)`;
//   }
// }
