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

  const game = document.querySelector(".game-container")
  let pickedCards = []
  let pickedCardsId = []
  let cardsPaired = []
  const displayResult = document.querySelector("#result")

  // removing overlay on click
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));

  overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");

    });
  });
// logic for timer - accrediting goes to WebSimplified link in readME
  class ScatterTheVillage {
    constructor(totalTime) {
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById("time-remaining");
      this.ticker = document.getElementById("flips");
    }
    startGame() {
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
    }
  }
  
  /*
   * Making the game board
   */
  function makeBoard() {
    for (let i = 0; i < gameArray.length; i++) {
      var tile = document.createElement("img");
      tile.setAttribute("src", "assets/images/blank100.png");
      tile.setAttribute("class", "game-card");
      tile.setAttribute("data-id", i);
      tile.addEventListener("click", flipCard);
      game.appendChild(tile);
    }
  }


  /*
   * checks for matches
   */
  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = pickedCardsId[0]
    const optionTwoId = pickedCardsId[1]
    if (pickedCards[0] === pickedCards[1]) {
      alert("You found a match and returned our animals safely, Thank You!");
      cards[optionOneId].setAttribute("src", "assets/images/empty100.png");
      cards[optionTwoId].setAttribute("src", "assets/images/empty100.png");
      cardsPaired.push(pickedCards)
    } else {
      cards[optionOneId].setAttribute("src", "assets/images/blank100.png");
      cards[optionTwoId].setAttribute("src", "assets/images/blank100.png");
      alert("Sorry, try again");
    }
    pickedCards = []
    pickedCardsId = []
    displayResult.textContent = cardsPaired.length
    if (cardsPaired.length === gameArray.length / 2) {
      displayResult.textContent = "Thank You! You found all of our animals"
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
      setTimeout(checkForMatch, 350);
      cardsPaired.push(cardsPicked);
    }
  }

  makeBoard()

})