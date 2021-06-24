document.addEventListener("DOMContentLoaded", () => {


  // card option
  const gameArray = [{
      name: "cow",
      img: "assets/images/cow.png"
    },
    {
      name: "cow",
      img: "assets/images/cow.png"
    },
    {
      name: "pig",
      img: "assets/images/pig.png"
    },
    {
      name: "pig",
      img: "assets/images/pig.png"
    },
    {
      name: "chicken",
      img: "assets/images/chicken.png"
    },
    {
      name: "chicken",
      img: "assets/images/chicken.png"
    },
    {
      name: "dog1",
      img: "assets/images/dog1.png"
    },
    {
      name: "dog1.png",
      img: "assets/images/dog1.png"
    },
    {
      name: "dog2",
      img: "assets/images/dog2.png"
    },
    {
      name: "dog2",
      img: "assets/images/dog2.png"
    },
    {
      name: "dog3",
      img: "assets/images/dog1.png"
    },
    {
      name: "dog3",
      img: "assets/images/dog3.png"
    },
    {
      name: "duck",
      img: "assets/images/duck.png"
    },
    {
      name: "duck",
      img: "assets/images/duck.png"
    },
    {
      name: "cat",
      img: "assets/images/cat.png"
    },
    {
      name: "cat",
      img: "assets/images/cat.png"
    },
    {
      name: "rabbit",
      img: "assets/images/rabbit.png"
    },
    {
      name: "rabbit",
      img: "assets/images/rabbit.png"
    }

  ]
  //Randomises Cards at start of game
  gameArray.sort(() => 0.5 - Math.random());

  const game = document.querySelector(".game-container");

  let playerScore = 0;
  let flipCount = 0;

  const unclickedCard = "assets/images/blank100.png";

  let pickedCards = []
  let pickedCardsId = []
  let cardsPaired = []
  const displayResult = document.querySelector("#result");

  // removing overlay on click
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));

  overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");

    });
  });

  /*
   * Making the game board
   */
  function makeBoard() {
    for (let i = 0; i < gameArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", unclickedCard);
      card.setAttribute("class", "game-card");
      card.setAttribute("cardAnimal", gameArray[i].name);
      updateEventListener(card, "add")
      game.appendChild(card);
    }
  }

  // Update event listener
  function updateEventListener(card, action) {
    if (action === "add") {
      card.addEventListener('click', flipCard);
    } else {
      card.removeEventListener('click', flipCard);
    }
  }


  /*
   * checks for matches
   */
  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = pickedCardsId[0];
    const optionTwoId = pickedCardsId[1];


    if (pickedCards[0] === pickedCards[1] && pickedCardsId[0] !== pickedCardsId[1]) {
      cards[optionOneId].setAttribute("src", "assets/images/empty100.png");
      cards[optionTwoId].setAttribute("src", "assets/images/empty100.png");
      cardsPaired.push(pickedCards)
      flipsCounter();
    } else {
      cards[optionOneId].setAttribute("src", "assets/images/blank100.png");
      cards[optionTwoId].setAttribute("src", "assets/images/blank100.png");
      flipCounter();
    }


    pickedCards = []
    pickedCardsId = []
    displayResult.textContent = cardsPaired.length
    if (cardsPaired.length === gameArray.length / 2) {

    }
  }

  /*
   * turns the cards around
   */
  function flipCard() {
    var cardName = this.getAttribute("data-id");
    pickedCards.push(gameArray[cardName].name);
    pickedCardsId.push(cardName);
    this.setAttribute("src", gameArray[cardName].img);
    if (pickedCards.length === 2) {
      setTimeout(checkForMatch, 200);
      cardsPaired.push(pickedCards);
    }
  }

  makeBoard()

})