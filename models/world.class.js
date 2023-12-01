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
  statusBarEndboss = new StatusbarEndboss();
  collectionBottles = 0;
  collectionCoins = 0;
  collecting_sound = new Audio("audio/collect.mp3");
  throwableObjects = [];
  endboss = new Endboss();


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // es wird etwas dem canvas hinzugefügt
    this.canvas = canvas; // es wird auf die obere Variable canvas zugegriffen und ersetzt die variable im constructor
    this.keyboard = keyboard; // es wird auf die obere Variable keyboard zugegriffen und ersetzt die variable im constructor
    this.draw();
    this.setWorld();
    this.run();
    this.showCollectedBottles();
    this.showCollectedCoins();
 
  }

  setWorld() {
    this.character.world = this; // world wird an den Character übergeben dass Character auf variablen von der world zugreifen kann
    this.endboss.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    const counter = document.getElementById("counterBottles");
    if (this.keyboard.D && this.collectionBottles > 0) {
      let bottle = new ThrowableObject( // erzeugt eine neue Flasche
        this.character.x + 60,
        this.character.y + 100
      ); 
      this.throwableObjects.push(bottle);
      this.collectionBottles--;
      counter.innerHTML = this.collectionBottles; // zeigt die gesammelten Flaschen an nach dem wegwerfen
    }
  }

  // Flaschen sammeln und anzeigen
  showCollectedBottles() {
    const counter = document.getElementById("counterBottles");
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.level.bottles.splice(index, 1); // Bild des Items wird gelöscht
          this.collectionBottles++; // Collection Flaschen wird erhöht wenn eingesammelt
          counter.innerHTML = this.collectionBottles; // Der Counter Flaschen zeigt die Collection an
          this.collecting_sound.play();
        }
      });
    }, 10);
  }

  // Coins sammeln und anzeigen
  showCollectedCoins() {
    const counter = document.getElementById("counterCoins");
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.level.coins.splice(index, 1); // Bild des Items wird gelöscht
          this.collectionCoins++; // Collection Flaschen wird erhöht wenn eingesammelt
          counter.innerHTML = this.collectionCoins; // Der Counter Flaschen zeigt die Collection an
          this.collecting_sound.play();
        }
      });
    }, 10);
  }

  checkCollisions() {
    // Character mit Enemy
    let wasInTheAir = this.character.inTheAir;
    let dead = false;
    this.level.enemies.forEach((enemy, index) => {
        if (this.character.isColliding(enemy) && !this.character.inTheAir) {
            // Aktionen ausführen, wenn der Charakter mit einem Feind kollidiert und nicht in der Luft ist
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
            wasInTheAir = false; // Charakter ist nicht mehr in der Luft
        } else if (wasInTheAir && this.character.isColliding(enemy)) {
            // Aktionen ausführen, wenn der Charakter in der Luft war, jetzt auf dem Boden ist und mit einem Feind kollidiert 
            this.level.enemies[index].dead = true; // Enemy ist tot
            setTimeout(() => {
              this.level.enemies.splice(index, 1);
            }, 400);
            wasInTheAir = false; // Reset für den nächsten Durchlauf
        }
    });

    // Endboss mit ThrowableObject(Bottle)
    this.throwableObjects.forEach((throwableObject) => {
      if (this.endboss.isColliding(throwableObject) && !throwableObject.splashed) {
        throwableObject.hitted();
        this.endboss.hit(); // Energy wird weniger
        this.statusBarEndboss.setPercentage(this.endboss.energy); // Statusbar wird aktualisiert
      }
    });

    // Enemies mit ThrowableObject(Bottle)
    this.throwableObjects.forEach((throwableObject, index) => {
      for (let index = 0; index < this.level.enemies.length; index++) {
        const enemy = this.level.enemies[index];
        if (enemy.isColliding(throwableObject) && !throwableObject.splashed) {
          throwableObject.hitted(); // Flasche zerplatzt
          this.level.enemies.splice(index, 1);
        }
      }
      if (throwableObject.deletable) {
        this.throwableObjects.splice(index, 1);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht

    this.ctx.translate(this.camera_x, 0); // Hintergrund wird nach links verschoben um die Variable camera_x

    // fixe Koordinaten
    this.addObjectsToMap(this.level.backgroundObjects); // BackgroundObjects wird zur Map hinzugefügt
    this.addToMap(this.character); // der Character wird gezeichnet und im Canvas angezeigt
    this.addToMap(this.endboss);
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
    this.addToMap(this.statusBarEndboss);

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
    /*mo.drawFrame(this.ctx);*/
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
