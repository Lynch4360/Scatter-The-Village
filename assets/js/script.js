document.addEventListener("DOMContentLoaded", () => {


  const animals = [
    "cow",
    "pig",
    "chicken",
    "dog1",
    "dog2",
    "dog3",
    "duck",
    "cat",
    "rabbit"
  ]
  const pathToImages = "assets/images/"

 
  gameArray = []

  for (animal of animals) {
    let cardInfo = {
      name: animal,
      img: pathToImages + animal + ".png"
    }
    gameArray.push(cardInfo)
    gameArray.push(cardInfo)
  }

  // Randomises Cards at start of game
  gameArray.sort(() => 0.5 - Math.random());

  let listCardDiv = []

  let playerScore = 0;
  let flipCount = 0;
  let pickedCards = []
  let cardsPaired = 0;


  const matchedCard = "assets/images/empty100.png";
  const unclickedCard = "assets/images/blank100.png";
  const reset = document.getElementById("resetBtn");
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
      game.appendChild(card)
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
         $("#\\victoryModal").modal("show")
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

    let scoreElement = document.getElementById("gameScore1");
    scoreElement.innerText = "Score: " + playerScore;
    
}

function updatePlayerFlipSpan(flipModification) {
  flipCount = flipCount + flipModification

  let flipElement = document.getElementById("gameFlips");
  flipElement.innerText = "Flips: " + flipCount;
}


reset.addEventListener("click", resetEverything);
function resetEverything() {
  updatePlayerFlipSpan(flipCount * -1)
  updatePlayerScoreSpan(playerScore * -1)

  cardsPaired = 0
  playerScore = 0
  gameFlips = 0
  pickedCards = []
  listCardDiv = game.getElementsByTagName('img')
  for (card in listCardDiv) {
    updateImage(card, "failedMatch")
    updateEventListener(card, "add")
  }
  gameArray.sort(() => 0.5 - Math.random());
  
}

  function updateImage(card, flag) {
    if (flag === "matched") {
      setTimeout(() => {
        card.setAttribute("src", matchedCard)
      }, 400)
      
    } else if (flag === "flip"){
      card.setAttribute("src", card.getAttribute("cardImage"))
    } else {
      setTimeout(() => {
        card.setAttribute("src", unclickedCard)
      }, 400)
      
    }
  }
  makeBoard()

})





