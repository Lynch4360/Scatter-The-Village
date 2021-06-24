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
      name: "dog1",
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
      img: "assets/images/dog3.png"
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


  const matchedCard = "assets/images/empty100.png";
  const unclickedCard = "assets/images/blank100.png";

  const game = document.querySelector(".game-container");

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
      var card = document.createElement("img")
      card.setAttribute("src", unclickedCard)
      card.setAttribute("cardImage", gameArray[i].img)
      card.setAttribute("class", "game-card")
      card.setAttribute("cardAnimal", gameArray[i].name)
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
    if (card1.getAttribute("cardAnimal") === card2.getAttribute("cardAnimal")){
      updatePlayerScoreSpan(50)
      cardsPaired++
      for (card of pickedCards) {
        updateImage(card, "matched")
      }
      if (cardsPaired === 9) {
        alert("winner winner chicken dinner")
      }
    } else {
      updatePlayerScoreSpan(-10)
      for (card of pickedCards) {
        updateImage(card, "failedMatch")
        updateEventListener(card, "add")
      }
    }
    pickedCards = []
  }
  /*
   * turns the cards around
   */
  function flipCard() {
    updatePlayerFlipSpan(1)
    updateEventListener(this, "remove")
    updateImage(this, "flip")
    pickedCards.push(this)
    if (pickedCards.length === 2) {
      checkForMatch()
    }
  }

  function updatePlayerScoreSpan(scoreModification) {
    playerScore = playerScore + scoreModification

    let scoreElement = document.getElementById("gameScore");
    scoreElement.innerText = "Score: " + playerScore;
}

function updatePlayerFlipSpan(flipModification) {
  flipCount = flipCount + flipModification

  let flipElement = document.getElementById("gameFlips");
  flipElement.innerText = "Flips: " + flipCount;
}

  function updateImage(card, flag) {
    if (flag === "matched") {
      card.setAttribute("src", matchedCard)
    } else if (flag === "flip"){
      card.setAttribute("src", card.getAttribute("cardImage"))
    } else {
      setTimeout(() => {
        card.setAttribute("src", unclickedCard)
      }, 500)
      
    }
  }
  makeBoard()

})