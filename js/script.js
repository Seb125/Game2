window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const lives = document.querySelector("#lives");
  

  let game;
  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }


  // Function that handles keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowRight",
      " ",
      'k'
    
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // If my palyer is Jumping I dont want to move up or down
      if (!game.player.isJumping) {
      

        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -3;
            game.movingRight = false;
            game.movingLeft = true;
            break;
          case "ArrowRight":
            
            game.player.directionX = 3;
            game.movingRight = true;
            game.movingLeft = false;
           
            break;
          case " ":
            
            game.jump();
            break;
          case "k":
            game.fall();
        
        }
    }
    }
  }

  // Function to handle keyup event
  function handleKeyup(event) {
    // Your code for keyup event handling here
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowRight"
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

    
      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = 0;
          game.movingLeft = false;
          break;
        case "ArrowRight":
          game.player.directionX = 0;
          game.movingRight = false;
          break;
      }
    
    }
  }


  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  // window.addEventListener("keydown", (event) => {
  //   console.log(event);
  // });

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
};
