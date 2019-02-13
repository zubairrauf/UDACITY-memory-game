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

let openList = []; //to store the open cards
let matchList = []; // to store the matched cards
let cards = document.querySelectorAll('.card');
for (let card of cards){
  card.addEventListener('click', function(){
    addToOpenList(card);
  });
}

/*addToOpenList adds the clicked cards to openList and if there
are two cards in the openList, it calls the matchCards functions*/
function addToOpenList(card){
  openList.push(card);
  if(openList.length <= 2){
    card.classList.add('open', 'show');
  }
  if (openList.length === 2){
    matchCards(openList);}
  }

/*matchCards function checks if the i elements of the opened cards have same values.
It then removes the open and show classes and adds match class and adds the cards to the matchList.
If the matchList has all the cards on the gameBoard, it declares winner. */
function matchCards(openList){
  if(openList[0].children[0].classList.value==openList[1].children[0].classList.value){
      for (card of openList){
        card.classList.add('match');
        matchList.push(card);
        card.classList.remove('open', 'show');
      }
      openList.length=0; //Empties the openList so the clicking is allowed again
      if(matchList.length==16){
        alert('You won');}
  }
  else {
    for (card of openList){
      card.classList.add('wobble');
    }
    setTimeout(function () {
      for (card of openList){
        card.classList.remove('open', 'show', 'wobble');
      }
      openList.length=0;
    }, 1000);
  }
}
