class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
      this.gameScreen = gameScreen;
      this.left = left;
      this.top = top;
      
      this.width = width;
      this.height = height;
      this.directionX = 0;
      this.directionY = 0;
      this.element = document.createElement("img");
      
      this.element.src = imgSrc;
      this.element.style.position = "absolute";
      // Set up the default element's property values
      this.element.style.width = `${width}px`;
      this.element.style.height = `${height}px`;
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      this.element.setAttribute("id", "ball");
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      // Update player's car position based on directionX and directionY
      this.left += this.directionX;
      this.top += this.directionY;
      
      // Ensure the player's car stays within the game screen
      // handles left hand side
      if (this.left < 10) {
        this.left = 10;
      }
      
      // handles right hand side
      if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
      }
  
      // handles bottom side
      if (this.top > 420) {
        this.top = 420;
        
      }
  
      // Update the player's car position on the screen
      this.updatePosition();
    }
  
  
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();
  
      if (
       playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top <= (obstacleRect.bottom - 120)
        
      ) {
        return true;
      } else {
        return false;
      }
    }
  
  
  }