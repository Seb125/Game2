class Game {
    // code to be added
    constructor () {
        this.startScreen = document.querySelector("#game-intro");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.highScoreElement = document.querySelector('#highScore');
        this.scoreElement = document.querySelector('#score');
        this.livesElement = document.querySelector('#lives');
       
        this.rollingMotionElement = null;  
        this.player = new Player(
            this.gameScreen,
            200,
            420,
            80,
            80,
            "./images/player1.png"
          );
        this.playerElement = document.querySelector('#ball');
        this.height = 700;
        this.width = 1000;
        this.backgroundPosition = 0;
        
        this.bushes = [];
        this.isCollided = false;
        this.currentBush = 0;
        this.jumpHeight = 5; 
        this.gravity = 4;  
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
        this.lives = 10;
        this.gameIsOver = false;
        this.frameIndex = 0;
        this.numberOfFrames = 10;
        this.spriteWidth = 64;
        this.spriteCounter = 0;
        this.movingRight = false;
        this.movingLeft = false

        
    }

    start () {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        
        
        // for (let i = 0; i < 3; i++) {
        //   this.bushes.push(new Bush(this.gameScreen, i*100+300, i*100));
        // } 
       

      
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

    if (this.jumpNumber === 2){

      this.counter = 0;
      this.playerJumps = true;
      
      
      this.isCollided = false;
    } else {
      this.player.top -= 3;
      this.playerJumps = true;
      
      
      this.isCollided = false;
    }
     
    
     

     
     
  }

  animateSprite(movingRight) {

    if (movingRight) {
    this.frameIndex = ((this.frameIndex + 1) % this.numberOfFrames);
    
   
    this.playerElement.src = `./images/player${this.frameIndex}.png`;
    this.playerElement.style.transform = 'scaleX(1)';
    this.playerElement.style.width = "80px";
    this.playerElement.style.height = "80px";
     // Use the clip property to show only the specified width for the frame
    } else if (!movingRight) {

      this.frameIndex = ((this.frameIndex + 1) % this.numberOfFrames);
    
   
      this.playerElement.src = `./images/player${this.frameIndex}.png`;
      this.playerElement.style.transform = 'scaleX(-1)';
      this.playerElement.style.width = "80px";
      this.playerElement.style.height = "80px";


    }

    
}

        

        
  didCollide(obstacle1, obstacle2) {
    const playerRect = obstacle1.element.getBoundingClientRect();
    const obstacleRect = obstacle2.element.getBoundingClientRect();

    if (
     playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
      
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
        this.player.top = newHeight+2;
        collisons.push(this.player.didCollide(bush));
        
        this.player.left -= 1.999;
        this.jumpNumber = 0;
      } else if (bush.left < 0) {
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
     if (!collisons.some(condition => condition === true)) {
      this.isCollided = false;
  }

      if (this.playerJumps && !this.isCollided) {
        this.player.top = initialY - (this.jumpHeight * Math.sin((Math.PI / 2.5) * this.counter) - 0.5 * this.gravity * this.counter ** 2);
        this.counter += 0.02;
      } else if (!this.playerJumps && !this.isCollided){
       
        this.player.top += 10;
      }

      // if (this.player.didCollide( )) // I want to terminate the jump when player collides with anyting (ground obstacle....
      // )                               // player Jumps becomes false. When I jump I increas height a liitle bit to stop collision 
      
        
        
       
      // handles bottom side
      if (this.player.top > 800) {
        this.player.top = -90;
        this.lives--;
        this.livesElement.innerHTML = this.lives;
      }

      // If the lives are 0, end the game
      if (this.lives <= 0) {
        this.endGame();
      }
  
     
     


        
     if (Math.random() > 0.80 && this.bushes.length < 6) {
      
      let overlap = false;
      const newBush = new Bush(this.gameScreen, Math.random()*1000, Math.random()*300);
      this.bushes.forEach((bush) => {

        if (this.didCollide(bush, newBush)) overlap = true;

      })
    
      if (this.bushes.length === 0) {
        this.bushes.push(newBush)
      } else if (!overlap) {
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
      

    if (this.movingRight || this.movingLeft) {

    this.spriteCounter++;


    if(this.spriteCounter%10 === 0) this.animateSprite(this.movingRight);

    console.log(this.movingRight)
    } else {
      this.frameIndex = 0;
      this.playerElement.src = `./images/player${this.frameIndex}.png`;
    }
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