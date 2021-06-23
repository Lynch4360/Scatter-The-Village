document.addEventListener('DOMContentLoaded', () => {
  
  
  // card option
  const gameArray = [
    {
      name: 'chicken',
      img: 'assets/images/chicken100.png'
    },
    {
      name: 'chicken',
      img: 'assets/images/chicken100.png'
    },
    {
      name: 'cow',
      img: 'assets/images/cow100.png'
    },
    {
      name: 'cow',
      img: 'assets/images/cow100.png'
    },
    {
      name: 'duck',
      img: 'assets/images/duck100.png'
    },
    {
      name: 'duck',
      img: 'assets/images/duck100.png'
    },
    {
      name: 'goat',
      img: 'assets/images/goatzoomed100.png'
    },
    {
      name: 'goat',
      img: 'assets/images/goatzoomed100.png'
    },
    {
      name: 'rooster',
      img: 'assets/images/rooster100.png'
    },
    {
      name: 'rooster',
      img: 'assets/images/rooster100.png'
    },
    {
      name: 'turkey',
      img: 'assets/images/horse100.png'
    },
    {
      name: 'turkey',
      img: 'assets/images/horse100.png'
    },
    {
      name: 'sheep',
      img: 'assets/images/sheep100.png'
    },
    {
      name: 'sheep',
      img: 'assets/images/sheep100.png'
    },
    {
      name: 'pig',
      img: 'assets/images/pig100.png'
    },
    {
      name: 'pig',
      img: 'assets/images/pig100.png'
    }
    
  ]
  //Randomises Cards at start of game
  gameArray.sort(() => 0.5 - Math.random())

  const game = document.querySelector('.game-container')
  var pickedCards = []
  var pickedCardsId = []
  var cardsPaired = []
  const displayResult = document.querySelector('#result')

  /*
  * Making the game board
  */
  function makeBoard() {
    for (let i = 0; i < gameArray.length; i++) {
      var tile = document.createElement('img')
      tile.setAttribute('src', 'assets/images/blank100.png')
      tile.setAttribute("class", "game-card")
      tile.setAttribute('data-id', i)
      tile.addEventListener('click', flipCard)
      game.appendChild(tile)
    }
  }
  

/*
* checks for matches
*/
function checkForMatch() {
  var cards = document.querySelectorAll('img')
  const optionOneId =  pickedCardsId[0]
  const optionTwoId =  pickedCardsId[1]
  if (pickedCards[0] === pickedCards[1]) {
    alert('You found a match and returned our animals safely, Thank You!')
    cards[optionOneId].setAttribute('src', 'assets/images/empty100.png')
    cards[optionTwoId].setAttribute('src', 'assets/images/empty100.png')
    cardsPaired.push(pickedCards)
  } else {
    cards[optionOneId].setAttribute('src', 'assets/images/blank100.png')
    cards[optionTwoId].setAttribute('src', 'assets/images/blank100.png')
    alert('Sorry, try again')
  }
  pickedCards = []
  pickedCardsId = []
  displayResult.textContent = cardsPaired.length
  if (cardsPaired.length === gameArray.length/2) {
    displayResult.textContent = 'Thank You! You found all of our animals'
  }
}
/*
 * turns the cards around
*/
  function flipCard(){
    var cardName = this.getAttribute('data-id')
    pickedCards.push(gameArray[cardName].name)
    pickedCardsId.push(cardName)
    this.setAttribute('src', gameArray[cardName].img)
    if (pickedCards.length === 2) {
      setTimeout(checkForMatch, 500)
      cardsPaired.push(cardsPicked)
    }
  }

  makeBoard()






})