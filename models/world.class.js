class World {
  character = new Character(); // hier wird das Object "Character" mit allen Eigenschaften der Variable character zugewiesen"
  level = level1;
  canvas;
  ctx; // Kontext
  keyboard;
  camera_x = 0; // Bildausschnitt, bzw Hintergrund X Koordinate
  statusBarHealth = new StatusbarHealth();
  statusBarBottles = new StatusbarBottles();
  statusBarCoins = new StatusbarCoins();  
  collectionBottles = 0;
  collectionCoins = 0;
  collecting_sound = new Audio("audio/collect.mp3");
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // es wird etwas dem canvas hinzugefügt
    this.canvas = canvas; // es wird auf die obere Variable canvas zugegriffen und ersetzt die variable im constructor
    this.keyboard = keyboard; // es wird auf die obere Variable keyboard zugegriffen und ersetzt die variable im constructor
    this.draw();
    this.setWorld();
    this.showCollectedItems(this.collectionCoins,"counterCoins",this.level.coins);
    this.showCollectedItems(this.collectionBottles,"counterBottles",this.level.bottles);
    this.run();
  }

  setWorld() {
    this.character.world = this; // world wird an den Character übergeben dass Character auf variablen von der world zugreifen kann
  }

  run() {
    setInterval(() => {
   this.checkCollisions();
   this.checkThrowObjects();
  }, 200);
}

checkThrowObjects() {
  if (this.keyboard.D && this.throwableObjects.length > 0) {
    let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100)
    this.throwableObjects.push(bottle);
 
  }

}

 // Character mit Enemy
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy); // StatusBar Health wird aktualisiert wenn Character getroffen wird
      }
    });
  }

  // Items sammeln und anzeigen
  showCollectedItems(collectionItems, counterElement, itemArray) {
    const counter = document.getElementById(counterElement);
    let collection = collectionItems;

    const checkCollision = setInterval(() => {
      itemArray.forEach((item, index) => {
        if (this.character.isColliding(item)) {
          itemArray.splice(index, 1);
          collection++;
          let bottle = new ThrowableObject; 
          this.throwableObjects.push(bottle); // fügt gesammelte Bottle in Array throwableObjects hinzu
          counter.innerHTML = collection;
          this.collecting_sound.play();
          console.log(this.throwableObjects.length);
        }
      });
    }, 10);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht

    this.ctx.translate(this.camera_x, 0); // Hintergrund wird nach links verschoben um die Variable camera_x

    // fixe Koordinaten
    this.addObjectsToMap(this.level.backgroundObjects); // BackgroundObjects wird zur Map hinzugefügt
    this.addToMap(this.character); // der Character wird gezeichnet und im Canvas angezeigt
    this.addObjectsToMap(this.level.enemies); // Enemies wird zur Map hinzugefügt
    this.addObjectsToMap(this.level.clouds); // Clouds wird zur Map hinzugefügt
    this.addObjectsToMap(this.level.coins); // Coins werden zur Map hinzugefügt
    this.addObjectsToMap(this.level.bottles); // Bottles werden zur Map hinzugefügt
    this.addObjectsToMap(this.throwableObjects); // ThrowableObjekt wird zur Map hinzugefügt
    
    this.ctx.translate(-this.camera_x, 0); // Verschieben des Hintergrundes rückgängig machen

    //Koordinaten sind nicht fix und gehen mit der Kamera mit
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarCoins);
   
    // die Function draw wird immer wieder aufgerufen
    let self = this; // das Wort this wird hier nicht mehr erkannt, deshalb ist this = self
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      // für jedes Objekt(o) im Array objects wird die Funktion addToMap() aufgerufen
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    // mo = movableObjekt
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); // speichert aktuellen Status/Eigenschaften vom Kontext
    this.ctx.translate(mo.width, 0); // Bild wird gespiegelt
    this.ctx.scale(-1, 1); // Element wird um die Breite des Elements verschoben
    mo.x = mo.x * -1; // X-Koordinate wird gespiegelt
  }

  flipImageBack(mo) {
    // Spiegelung wird rückgängig gemacht
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
