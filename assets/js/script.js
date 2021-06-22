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
      img: 'assets/images/goat100.png'
    },
    {
      name: 'goat',
      img: 'assets/images/goat100.png'
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
      img: 'assets/images/turkey100.png'
    },
    {
      name: 'turkey',
      img: 'assets/images/turkey100.png'
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
    },
    {
      name: 'rabbit',
      img: 'assets/images/rabbit100.png'
    },
    {
      name: 'rabbit',
      img: 'assets/images/rabbit100.png'
    }
  ]

  const grid = document.querySelector('.grid')
  var pickedCards = []
  var pickedCardsId = []


  /*
  * Making the game board
  */
  function makeBoard() {
    for (let i = 0; i < gameArray.length; i++) {
      var tile = document.createElement('img')
      tile.setAttribute('src', 'assets/images/blank100.png')
      tile.setAttribute('data-id', i)
      tile.addEventListener('click', flipcard)
      grid.appendChild(tile)
    }
  }

/*
* checks for pairs
*/
function checkForMatch() {
  var cards = document.querySelectorAll('img')
  const optionOneId =  pickedCardsId[0]
  const optionTwoId =  pickedCardsId[1]
  if (pickedCards[0] === pickedChosen[1]) {
    alert('You found a match')
    cards[optionOneId].setAttribute('src', 'assets/images/blank100.png')
    cards[chosenTwoId].setAttribute('src', 'assets/images/blank100.png')
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
      setTimeout(checkForPair, 500)
    }

  }

  makeBoard()






})