class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false; // Bild spiegeln
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  collection = 0;
  lastHit = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  applyGravity() {
   setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) { // kommt von der Funktion isAboveGround = this.y < 130
      this.letGrafity();
      }
    }, 1000 / 25); // 25x pro Sekunde
  }

  letGrafity() {
    this.y -= this.speedY;
    this.speedY -= this.acceleration; //speedY wird von acceleration abgezogen
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { // Throwable Objekt fallen immer ganz runter
      return true;   //Tiefe des Falles der Flasche
    } else {
      return this.y < 130;
    }
  }

  // character.isColliding
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y +mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hitEndboss() {
    this.energy -= 20; //  sobald kollidiert, Energie des Endboss wird weniger
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit in Zahlenform, ms die vergangen sind seit dem 01.01.1970 - lastHit wird der Zeit gleichgesetzt
    }
  }

  hitCharacter() {
    this.energy -= 5; //  sobald kollidiert, Energie des Characters wird weniger
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit in Zahlenform, ms die vergangen sind seit dem 01.01.1970 - lastHit wird der Zeit gleichgesetzt
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1000; // Differenz in Sekunden
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
    setTimeout(() => {
      this.inTheAir = false;
    }, 1000);
    
  }
}
