class Cloud extends MovableObject {
  // Cloud hat alle Eigenschaften von MovableObject da es vererbt wird!
 
  width = 400;
  height = 300;
  y = 75;

  constructor(imagePath, x) {
    super().loadImg(imagePath); // loadImg wird hier von der SuperKlasse aufgerufen
    this.x = x;
    this.animate(); // die Function animate wird aufgerufen
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 80);
  }
}
