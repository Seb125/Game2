class Bush {
    constructor(gameScreen, x, y) {
      this.gameScreen = gameScreen;
      this.left = 1000 + x; // obstacle should spawn outside the gaming screen
      this.top = 420 - y;
      this.width = 100;
      this.height = 100;
      this.element = document.createElement("img");
      this.element.src = "./images/bush.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
      this.gameScreen.appendChild(this.element);
    }
  
    updatePosition() {
      // Update the obstacle's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      // Move the obstacle left
      this.left -= 1.999;
      // Update the obstacle's position on the screen
      this.updatePosition();
    }
    
  }