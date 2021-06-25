// loads everything inside of {} once the DOM has fully loaded
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
  ];

  gameArray = [];
  const pathToImages = "assets/images/";

  for (var animal of animals) {
      let cardInfo = {
          name: animal,
          img: pathToImages + animal + ".png"
      };
      gameArray.push(cardInfo);
      gameArray.push(cardInfo);
  }

  // Randomises Cards at start of game
  gameArray.sort(() => 0.5 - Math.random());

  // Global Variables
  let listCardDiv = [];

  let playerScore = 0;
  let flipCount = 0;
  let pickedCards = [];
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
          var card = document.createElement("img");
          card.setAttribute("src", unclickedCard);
          card.setAttribute("cardImage", gameArray[i].img);
          card.setAttribute("class", "game-card");
          card.setAttribute("cardAnimal", gameArray[i].name);
          updateEventListener(card, "add");
          game.appendChild(card);
      }
  }

  /*
   * Update the Event listeners
   */
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
      if (card1.getAttribute("cardAnimal") === card2.getAttribute("cardAnimal")) {
          updatePlayerScoreSpan(50);
          cardsPaired++;
          for (var card of pickedCards) {
              updateImage(card, "matched");
          }
          // Victory Modal for game when reaches 9 because there are 18 cards
          if (cardsPaired === 9) {
              $("#\\victoryModal").modal("show");
          }
      } else {
          updatePlayerScoreSpan(-10)
          for (card of pickedCards) {
              updateImage(card, "failedMatch");
              updateEventListener(card, "add");
          }
      }
      pickedCards = [];
  }
  /*
   * Flips the cards
   */
  function flipCard() {
      updatePlayerFlipSpan(1);
      updateEventListener(this, "remove");
      updateImage(this, "flip");
      pickedCards.push(this);
      if (pickedCards.length === 2) {
          checkForMatch();
      }
  }
  /*
   * Updates the players score as they flip carrds
   */
  function updatePlayerScoreSpan(scoreModification) {
      playerScore = playerScore + scoreModification;

      let scoreElement = document.getElementById("gameScore1");
      scoreElement.innerText = "Score: " + playerScore;

  }
  /*
   * Updates the plers flip counter as they flip carrds
   */
  function updatePlayerFlipSpan(flipModification) {
      flipCount = flipCount + flipModification;

      let flipElement = document.getElementById("gameFlips");
      flipElement.innerText = "Flips: " + flipCount;
  }

  /*
   * Resets game
   */
  reset.addEventListener("click", resetEverything);

  function resetEverything() {
      updatePlayerFlipSpan(flipCount * -1);
      updatePlayerScoreSpan(playerScore * -1);

      cardsPaired = 0;
      playerScore = 0;
      pickedCards = [];
      listCardDiv = document.querySelectorAll(".game-card");
      for (let i = 0; i < listCardDiv.length; i++) {
          console.log(listCardDiv[i]);
          updateImage(listCardDiv[i], "failedMatch");
          updateEventListener(listCardDiv[i], "add");
      }
      gameArray.sort(() => 0.5 - Math.random());

  }
  /*
   * Updates images on card
   */
  function updateImage(card, flag) {
      if (flag === "matched") {
          setTimeout(() => {
              card.setAttribute("src", matchedCard);
          }, 400);

      } else if (flag === "flip") {
          card.setAttribute("src", card.getAttribute("cardImage"));
      } else {
          setTimeout(() => {
              card.setAttribute("src", unclickedCard);
          }, 400);

      }
  }
  /*
   * calling the make board function
   */
  makeBoard();

});
