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
            420,
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
        this.jumpHeight = 20; 
        this.gravity = 10;  
        this.counter = 0;
        this.frameIndex = 0;
        
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
        
        
        for (let i = 0; i < 3; i++) {
          this.bushes.push(new Bush(this.gameScreen, i*100+300, i*100));
        } 
       

      
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
     this.playerJumps = true;
     
     this.player.top -= 20;
     
    this.isCollided = false;
     
     

     
     
  }

        

        
    
    


    

    fall() {
      this.falling = true;
      
    }

    update() {
        
      this.player.move();

     let initialY = this.player.top;

     let collisons = [];
     this.bushes.forEach((bush) => {
      if (this.player.didCollide(bush)) {
        this.isCollided = true;
        this.playerJumps = false;
        this.counter = 0;
        let newHeight = bush.top - 80;
        //console.log(bush.top);
        this.player.top = newHeight+5;
        collisons.push(this.player.didCollide(bush));
        console.log(this.player.top)
      }
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
       
        this.player.top += 10;
      }

      // if (this.player.didCollide( )) // I want to terminate the jump when player collides with anyting (ground obstacle....
      // )                               // player Jumps becomes false. When I jump I increas height a liitle bit to stop collision 
      
        
        
       

      // If the lives are 0, end the game
      if (this.lives <= 0) {
        this.endGame();
      }
  
     
     if (this.player.top > 420) {
      this.isCollided = true;
      this.counter = 0;
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