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

  let playerScore = 0;
  let flipCount = 0;
  let pickedCards = []
  let cardsPaired = 0;

  const unclickedCard = "assets/images/blank100.png";

  const game = document.querySelector(".game-container");
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
      card.setAttribute("cardImage", gameArray[i].img)
      card.setAttribute("class", "game-card");
      card.setAttribute("cardAnimal", gameArray[i].name);
      updateEventListener(card, "add")
      game.appendChild(card);
    }
  }

  // Update event listener
  function updateEventListener(card, action) {
    if (action === "add") {
      card.addEventListener("click", flipCard);
    } else {
      card.removeEventListener("click", flipCard);
    }
  }


  /*
   * checks for matches
   */
  function checkForMatch() {
    const card1 = pickedCards[0];
    const card2 = pickedCards[1];


    if (pickedCards[0] === pickedCards[1] && pickedCardsId[0] !== pickedCardsId[1]) {
      cards[optionOneId].setAttribute("src", "assets/images/empty100.png");
      cards[optionTwoId].setAttribute("src", "assets/images/empty100.png");
      cardsPaired.push(pickedCards)
    } else {
      cards[optionOneId].setAttribute("src", "assets/images/blank100.png");
      cards[optionTwoId].setAttribute("src", "assets/images/blank100.png");
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
    // pickedCards.push(gameArray[cardName].name);
    // pickedCardsId.push(cardName);
    // this.setAttribute("src", gameArray[cardName].img);
    if (pickedCards.length === 0) {
      updateEventListener(this, "remove")
      checkForMatch(pickedCards)
      cardsPaired.push(pickedCards);
    } else {

    }
  }
 function updateImage(card) {
  if (card.getAttribute("src") === card.getAttribute("cardImage")) {
    card.setAttribute("src") = unclickedCard
  } else {
    card.setAttribute("src") = card.getAttribute("cardImage")
  }
 }
  makeBoard()

})