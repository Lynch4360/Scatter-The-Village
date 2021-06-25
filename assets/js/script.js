// This will run everything inside of {} once the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {

  const animals = [
      "cow",
      "pig",
      "chicken",
      "duck",
      "cat",
      "rabbit"
  ];

  gameArray = [];
  const pathToImages = "assets/images/";

  for (let animal of animals) {
      let cardInfo = {
          name: animal,
          img: pathToImages + animal + ".png"
      };
      // We are doing this twice because there will be 2 copies of each card
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

  // This removes the overlay with small amount of instructions and some flavour text when it is clicked
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));

  overlays.forEach(overlay => {
      overlay.addEventListener("click", () => {
          overlay.classList.remove("visible");

      });
  });

  /*
   * This funciton creates the game 
   */
  function makeBoard() {
      for (let i = 0; i < gameArray.length; i++) {
          let card = document.createElement("img");
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
   * This will check for matches, then give 50 score to player if correct *  * match is found and if that match is not found the player will lose 10 *  points.
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
   * Flips the cards and has an if statement that calls the checkForMatch function when the total numbe rof selected cards is equal to 2
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
   * Updates the player's score as they flip carrds
   */
  function updatePlayerScoreSpan(scoreModification) {
      playerScore = playerScore + scoreModification;

      let scoreElement = document.getElementById("gameScore1");
      scoreElement.innerText = "Score: " + playerScore;

  }
  /*
   * Updates the player's flip counter as they flip over the cards
   */
  function updatePlayerFlipSpan(flipModification) {
      flipCount = flipCount + flipModification;

      let flipElement = document.getElementById("gameFlips");
      flipElement.innerText = "Flips: " + flipCount;
  }

  /*
   * This resets the game when the reset button is clicked
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
          updateImage(listCardDiv[i], "failedMatch");
          updateEventListener(listCardDiv[i], "add");
          gameArray.sort(() => 0.5 - Math.random());
      }
      
  }
  /*
   * This updates the image on the card and has a timer set to check to see * if the first and second selected image match
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
   * This is calling the makeBoard function
   */
  makeBoard();

});