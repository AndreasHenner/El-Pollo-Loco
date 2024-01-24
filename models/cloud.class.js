class Cloud extends MovableObject {
 
  width = 400;
  height = 300;
  y = 75;

  constructor(imagePath, x) {
    super().loadImg(imagePath); 
    this.x = x;
    this.animate(); // die Function animate wird aufgerufen
  }

  /**
   * Clouds move left
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 80);
  }
}
