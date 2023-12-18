class DrawableObject {
  // Superklasse mit den Eigenschaften x und y (Koordinaten) und einem Bild(img)
  x = 120;
  y = 240;
  height = 200;
  width = 150;
  img;
  imageCache = {}; // JSON mit Bildern drin
  currentImage = 0;

  /**load images*/
  loadImg(path) {
    this.img = new Image(); // das Gleiche wie --> document.getElementById('image') <img id="image" src>;
    this.img.src = path;
  }

  /**images will be drawn and shown on canvas*/
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Bilder werden gezeichnet und im Canvas angezeigt
  }

  /**adds frames arround elements*/
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Bottles || this instanceof Coins || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**images will be loaded into imagecache*/
  loadImages(arr) {
    arr.forEach((path) => {// JSON mit 6 Bilderpfade wird in die Funktion gegeben
      let img = new Image(); // Variable wird angeelegt mit einem neuen Bild(der erste Pfad...)
      img.src = path; // Das Bild wird in das Imageobjekt geladen
      this.imageCache[path] = img; // Update des imageCache, das Bild ist jetzt in imageCache drin
    });
  }
}
