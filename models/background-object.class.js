class BackgroundObject extends MovableObject {
  // Background hat alle Eigenschaften von MovableObject da es vererbt wird!

  width = 720;
  height = 480;

  constructor(imagePath, x) {
    super().loadImg(imagePath); // loadImg wird hier von der SuperKlasse aufgerufen
    this.x = x;
    this.y = 480 - this.height; // CanvasHöhe - BildHöhe
  }
}
