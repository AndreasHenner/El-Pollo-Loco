class Cloud extends MovableObject {
  // Cloud hat alle Eigenschaften von MovableObject da es vererbt wird!
 
  width = 400;
  height = 300;
 
  constructor(imagePath, x, y) {
    super().loadImg(imagePath); // loadImg wird hier von der SuperKlasse aufgerufen
    this.x = x;
    this.y = y;
    this.animate(); // die Function animate wird aufgerufen
  }


  animate() {
    this.moveLeft();
  }

}
