class Game {
    // code to be added
    constructor () {
        this.startScreen = document.querySelector("#game-intro");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.highScoreElement = document.querySelector('#highScore');
        this.scoreElement = document.querySelector('#score');
        this.rollingMotionElement = null;  
        this.player = new Player(
            this.gameScreen,
            200,
            0,
            80,
            80,
            "./images/bird.png"
          );
        this.height = 700;
        this.width = 1000;
        this.backgroundPosition = 0;
        
        this.bushes = [];
        this.isCollided = false;
        this.currentBush = 0;
        this.jumpHeight = 15; 
        this.gravity = 8;  
        this.jumpNumber = 0;
        this.counter = 0;
        this.frameIndex = 0;
        this.isMoving = false;
        this.playerJumps = false;
        this.jumpID = null;
        this.fallID = null;
        this.animationID = null;
        this.falling = false;
        this.score = 0;
        this.lives = 30;
        this.gameIsOver = false;
        
    }

    start () {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        
        
        this.bushes.push(new Bush(this.gameScreen, -900, 20));
        this.bushes.push(new Bush(this.gameScreen, -600, 20));

      
        this.gameLoop();
       
    }

    gameLoop () {
        if (this.gameIsOver === true) {
          //Here I save my score in the local storage
        //   
          const oldHighScore = localStorage.getItem('highScore');
          localStorage.setItem('highScore', this.score);
          if (this.score > oldHighScore) {
            localStorage.setItem('highScore', this.score);
            this.highScoreElement.innerText = this.score;
          } else {
            this.highScoreElement.innerText = oldHighScore;
         }
         
          return;
        }
        
        this.update();
        
       
        window.requestAnimationFrame(() => this.gameLoop());
        
    }

    jump() {

    this.jumpNumber += 1;

    if (this.jumpNumber === 2) this.counter = 0;
     this.playerJumps = true;
     
     this.player.top -= 5;
     
    this.isCollided = false;
     
     

     
     
  }

        

        
    
  collide(obstacle1, obstacle2) {
    const obstacle1Rect = obstacle1.element.getBoundingClientRect();
    const obstacle2Rect = obstacle2.element.getBoundingClientRect();

    if (
     obstacle1Rect.left < obstacle2Rect.right &&
      obstacle1Rect.right > obstacle2Rect.left &&
      obstacle1Rect.top < obstacle2Rect.bottom &&
      obstacle1Rect.bottom > obstacle2Rect.top 
      
    ) {
      return true;
    } else {
      return false;
    }
  }


    

    fall() {
      this.falling = true;
      
    }

    update() {
        
      this.player.move();

     let initialY = this.player.top;

     let collisons = [];
     let i = 0;
     this.bushes.forEach((bush) => {
      bush.move();
      if (this.player.didCollide(bush)) {
       
        this.isCollided = true;
        this.playerJumps = false;
        this.counter = 0;
        let newHeight = bush.top - 80;
        //console.log(bush.top);
        this.player.top = newHeight+5;
        collisons.push(this.player.didCollide(bush));
        
        this.player.left -= 1.999;

        this.jumpNumber = 0;
      } else if (bush.left + bush.width < 0) {
        // Increase the score by 1
        this.score++;
        // Remove the bush from the DOM
        bush.element.remove();
        // Remove bush object from the array; first buch in the array
        this.bushes.splice(i, 1);
        
      }
      i++;
     })

     //console.log(!collisons.some(condition => condition === true))
     //console.log(!(this.player.top >= 420));
     //console.log(!collisons.some(condition => condition === true) && !(this.player.top >= 420))
     //console.log(!collisons.some(condition => condition === true) && !this.player.top > 420)
     if (!collisons.some(condition => condition === true) && !(this.player.top >= 420)) {
      this.isCollided = false;
  }

      if (this.playerJumps && !this.isCollided) {
        this.player.top = initialY - (this.jumpHeight * Math.sin((Math.PI / 2.5) * this.counter) - 0.5 * this.gravity * this.counter ** 2);
        this.counter += 0.06;
      } else if (!this.playerJumps && !this.isCollided && !this.player.top <= 420){
       
        this.player.top += 5;
      }

      // if (this.player.didCollide( )) // I want to terminate the jump when player collides with anyting (ground obstacle....
      // )                               // player Jumps becomes false. When I jump I increas height a liitle bit to stop collision 
      
        
        
       
      if (this.player.top >= 420) {
        

        this.lives--;

      }
      

      // If the lives are 0, end the game
      if (this.lives <= 0) {
        this.endGame();
      }
  
     
     if (this.player.top > 420) {
      this.isCollided = true;
      this.counter = 0;
      this.jumpNumber = 0;
     }


        
     if (Math.random() > 0.50 && this.bushes.length < 6) {

      

      let newBush = new Bush(this.gameScreen, Math.random()*300, 20);


      
      
      if (this.bushes.length > 0) {
        let lastBush = this.bushes[this.bushes.length - 1];
     
        if (!this.collide(newBush, lastBush)) this.bushes.push(newBush);

      } else {
        this.bushes.push(newBush);
      }


      
    }


    // handles moving backgroung image
    if (this.player.left > this.gameScreen.offsetWidth - this.gameScreen.offsetWidth/2) {
        
      this.backgroundPosition -= 2;
      this.gameScreen.style.backgroundPosition = `${this.backgroundPosition}px 0`;
      this.isMoving = true;
      
    } else {
      this.isMoving = false;
    }

    this.bushes.forEach((bush) => {
      bush.isMoving = this.isMoving;
    })
      
    
    }

    

    endGame() {
        this.player.element.remove();
        
    
        this.gameIsOver = true;
        
        cancelAnimationFrame(this.animationID);

        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";
      }
}