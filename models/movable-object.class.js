class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false; // Bild spiegeln
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  collection = 0;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        // kommt von der Funktion isAboveGround = this.y < 130
        this.y -= this.speedY;
        this.speedY -= this.acceleration; //speedY wird von acceleration abgezogen
      }
    }, 1000 / 25); // 25x pro Sekunde
  }

  isAboveGround() {
    return this.y < 130;
  }

  // character.isColliding(chicken)
  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
  }

  hit() {
    this.energy -= 5; // sobald Kollidiert, Energie des Characters wird weniger
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit in Zahlenform, ms die vergangen sind seit dem 01.01.1970 - lastHit wird der Zeit gleichgesetzt
    }
  }

  isHurt() {
     let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
     timepassed = timepassed / 1000 // Differenz in Sekunden
     return timepassed < 0.5;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    // Modulufunktion => let i = 0 % 6 = mathematischer Rest // i = 0, 1, 2, 3, 4, 5, 0 usw...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  // x Koordinate vom Objekt wird um 0.15 px alle 60 ms verringert
  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

 
  
}
