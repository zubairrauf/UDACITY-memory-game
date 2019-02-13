/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


 // let cards = document.querySelectorAll('.card');
 // console.log(cards);

 /* Gets the click taregets and assign them to cardClicked
then calls the other functions.*/
let deck = document.querySelector('.deck')
deck.addEventListener('click', function(event){
  let cardClicked = event.target;
  if (cardClicked.classList[0] == 'card') {
    openingCards(cardClicked);
  }
});

// Function for opening cards and matching them
function openingCards(cardClicked){
    cardClicked.classList.add('open', 'show');
    let openCards =  document.querySelectorAll('.open');
    if (openCards.length == 2){
      matchingCards(openCards)
    }
}

//Function for matching the cards.
function matchingCards(openCards){
  if (openCards[0].firstElementChild.classList.value==openCards[1].firstElementChild.classList.value){
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
  }
  else {
    closingCards(openCards);
  }
}

// Function for closing the cards
function closingCards(openCards){
    setTimeout(function () {
      for (let card of openCards) {
        card.classList.remove('open', 'show');
        openCards='';
      }
    }, 1000);
}
