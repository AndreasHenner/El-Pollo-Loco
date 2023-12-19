class World {
  character = new Character(); // hier wird das Object "Character" mit allen Eigenschaften der Variable character zugewiesen"
  level = level1;
  canvas;
  ctx; // Kontext
  keyboard;
  camera_x = 0; // Bildausschnitt, bzw Hintergrund X Koordinate
  statusBarHealth = new StatusbarHealth();
  imgStatusBarBottles = new ImgStatusbarBottles();
  imgStatusBarCoins = new ImgStatusbarCoins();
  statusBarEndboss = new StatusbarEndboss();
  imgStatusbarEndboss = new ImgStatusbarEndboss();
  coinCounter = new Counter(200, 125);
  bottleCounter = new Counter(50, 125);
  collecting_sound = new Audio("audio/collect.mp3");
  danger_sound = new Audio("audio/danger.mp3");
  throwing_sound = new Audio("audio/throw.mp3");
  landing_sound = new Audio("audio/landing.mp3");
  throwableObjects = [];
 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // es wird etwas dem canvas hinzugefügt
    this.canvas = canvas; // es wird auf die obere Variable canvas zugegriffen und ersetzt die variable im constructor
    this.keyboard = keyboard; // es wird auf die obere Variable keyboard zugegriffen und ersetzt die variable im constructor
    this.draw();
    this.setWorld();
    this.run();
    this.showCollectedBottles();
    this.showCollectedCoins();
    background_sound.play();
  }

  /**world is passed to the character so that the character can access variables from the world*/
  setWorld() {
    this.character.world = this; // world wird an den Character übergeben dass Character auf variablen von der world zugreifen kann
  }

  /**CheckCollissions and checkThrowObjects will be executed*/
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 90);
  }

  /**New generated Bottle will be thrown*/
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleCounter.counter > 0) {
      this.generateNewBottle();
      if (muteMusicIsClicked) {
        this.throwing_sound.pause();
      } else {
      this.throwing_sound.play();
      }
      
    }
  }

  /**New Bottle will be generate*/
  generateNewBottle() {
    let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150, this.character.otherDirection);
    this.throwableObjects.push(bottle);
    this.bottleCounter.counter--;
  }

    /**Bottles will be collected*/
    collectBottles(index) {
      if (muteMusicIsClicked) {
        this.collecting_sound.pause();
      } else {
      this.collecting_sound.play();
      }
      this.level.bottles.splice(index, 1); // Bild des Items wird gelöscht
      this.bottleCounter.counter++; // Collection Flaschen wird erhöht wenn eingesammelt
    }

  /**Bottlecollection will be updated and shown on screen*/
  showCollectedBottles() {
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.collectBottles(index);
        }
      });
    }, 10);
  }

  /**Coins will be collected*/
  collectCoins(index) {
    if (muteMusicIsClicked) {
      this.collecting_sound.pause();
    } else {
    this.collecting_sound.play();
    }
    this.level.coins.splice(index, 1); // Bild des Items wird gelöscht
    this.coinCounter.counter++; // Collection Flaschen wird erhöht wenn eingesammelt
  }

  /**Coinscollection will be updated and shown on screen*/
  showCollectedCoins() {
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.collectCoins(index);
        }
      });
    }, 10);
  }

  /**Collission will be checked and detected*/
  checkCollisions() {
    this.endboss = this.level.enemies[this.level.enemies.length - 1]; // Endboss ist immer das letzte Element im Array
    
    // Character mit Enemy(Chicken)
    this.level.enemies.forEach((enemy, index) => this.characterHittedChicken(enemy, index));
    // Character mit Endboss
    if (this.character.isColliding(this.endboss)) {
       this.characterWasHit();
    }
    // Endboss mit ThrowableObject(Bottle)
    this.throwableObjects.forEach((throwableObject) => this.bottleKillsEndboss(throwableObject));
    // Enemies mit ThrowableObject(Bottle)
    this.throwableObjects.forEach((throwableObject, index) => { 
        this.bottleKillsChicken(throwableObject);
        if (throwableObject.deletable) {
            this.throwableObjects.splice(index, 1);
        }
    });
}

/**Character is hurt. Energylevel is decreased*/
  characterWasHit() { 
    this.character.hitCharacter();
    this.statusBarHealth.setPercentage(this.character.energy);
  }

  /**Chicken removes from the map when it is dead */
  jumpOnChicken(index) {
    if (index < this.level.enemies.length -1) { // Endboss wird nie gelöscht beim Draufspringen
        this.level.enemies.splice(index, 1);
}
  }
  
  /**Character hit Chicken. Either on the ground(Character gets hurt) or Jumping at the chicken(Chicken dies) */
  characterHittedChicken(enemy, index) {
    let wasInTheAir = this.character.inTheAir;
    // Aktionen ausführen, wenn der Charakter mit einem Feind kollidiert und nicht in der Luft ist
    if (this.character.isColliding(enemy) && !this.character.inTheAir && !this.level.enemies[index].dead) {
      this.characterWasHit();
      // Aktionen ausführen, wenn der Charakter in der Luft war, jetzt auf dem Boden ist und mit einem Feind kollidiert
    } else if (wasInTheAir && this.character.isColliding(enemy) && !this.level.enemies[index].dead) {
      this.character.inTheAir = false;
      if (muteMusicIsClicked) {
        this.landing_sound.pause();
      } else {
      this.landing_sound.play();
      }
      this.level.enemies[index].dead = true;
      setTimeout(() => {
        this.jumpOnChicken(index);
      }, 175);
    }
  }

/** if bottle hit endboss, endboss gets hurt */
  bottleHittedEndboss(throwableObject) {
    throwableObject.hitted();
    if (muteMusicIsClicked) {
      this.danger_sound.pause();
    } else {
    this.danger_sound.play();
    }
    background_sound.pause();
    this.endboss.hitEndboss(); // Energy wird weniger
    this.statusBarEndboss.setPercentage(this.endboss.energy); // Statusbar wird aktualisiert
  }

  /** endboss dies because hitted by bottle and game is over */
  bottleKillsEndboss(throwableObject) {
    if (this.endboss.isColliding(throwableObject) && !throwableObject.splashed) {
      this.bottleHittedEndboss(throwableObject);
      // Endboss besiegt, Spiel zu Ende
      if (this.endboss.isDead()) {
        this.danger_sound.pause();
        this.showGameoverScreen();
        reloadPageButton.classList.remove("d-none");
        smartphoneButtonArea.classList.add("d-none");
        let muteMusic = document.getElementById("muteMusic");
        muteMusic.classList.add("d-none");
      }
    }
  }

  /**If Bottle will be thrown on a chicken, Chicken dies and disappears from screen*/
  bottleKillsChicken(throwableObject) {
    for (let index = 0; index < this.level.enemies.length; index++) {
      let enemy = this.level.enemies[index];
      if (enemy.isColliding(throwableObject) && !throwableObject.splashed) {
        throwableObject.hitted(); // Flasche zerplatzt
        this.level.enemies[index].dead = true; // Enemy ist tot
        setTimeout(() => {
          this.level.enemies.splice(index, 1);
        }, 200);
      }
    }
  }

  /**Elements will be drawn into the Canvas*/
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht

    this.ctx.translate(this.camera_x, 0); // Hintergrund wird nach links verschoben um die Variable camera_x

    // fixe Koordinaten
    this.addObjectsToMap(this.level.backgroundObjects); // BackgroundObjects wird zur Map hinzugefügt

    this.addObjectsToMap(this.level.enemies); // Enemies wird zur Map hinzugefügt
    this.addObjectsToMap(this.level.clouds); // Clouds wird zur Map hinzugefügt
    this.addObjectsToMap(this.level.coins); // Coins werden zur Map hinzugefügt
    this.addObjectsToMap(this.level.bottles); // Bottles werden zur Map hinzugefügt
    this.addObjectsToMap(this.throwableObjects); // ThrowableObjekt wird zur Map hinzugefügt
    this.addToMap(this.character); // der Character wird gezeichnet und im Canvas angezeigt

    this.ctx.translate(-this.camera_x, 0); // Verschieben des Hintergrundes rückgängig machen

    //Koordinaten sind nicht fix und gehen mit der Kamera mit
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.imgStatusBarBottles);
    this.addToMap(this.imgStatusBarCoins);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.imgStatusbarEndboss);
    this.ctx.fillText(this.bottleCounter.counter, this.bottleCounter.x, this.bottleCounter.y);
    this.ctx.fillText(this.coinCounter.counter, this.coinCounter.x, this.coinCounter.y);
    this.ctx.font = "40px zabars";

    // die Function draw wird immer wieder aufgerufen
    let self = this; // das Wort this wird hier nicht mehr erkannt, deshalb ist this = self
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**Objects will be added to the Map*/
  addObjectsToMap(objects) {
    objects.forEach((o) => { // für jedes Objekt(o) im Array objects wird die Funktion addToMap() aufgerufen
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

  /**Image will be mirrored*/
  flipImage(mo) {
    this.ctx.save(); // speichert aktuellen Status/Eigenschaften vom Kontext
    this.ctx.translate(mo.width, 0); // Bild wird gespiegelt
    this.ctx.scale(-1, 1); // Element wird um die Breite des Elements verschoben
    mo.x = mo.x * -1; // X-Koordinate wird gespiegelt
  }

  /**Mirroring is undone*/
  flipImageBack(mo) {
    // Spiegelung wird rückgängig gemacht
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**If Character is dead, Lostcreen will be shown*/
  showLostScreen() {
    let lostScreen = document.getElementById("lostScreen");
    if (this.character.isDead()) {
        // Der Charakter ist tot, zeige das Bild an
        lostScreen.classList.remove("d-none");
    } else {
        // Der Charakter ist nicht tot, verstecke den Lostbildschirm
        lostScreen.classList.add("d-none");
    }
}

/**If Endboss is dead, GameOverscreen will be shown*/
showGameoverScreen() {
  let gameoverScreen = document.getElementById("gameoverScreen");
  if (this.endboss.isDead()) {
    // Der Endboss ist tot, zeige den Game-Over-Bildschirm an
    gameoverScreen.classList.remove("d-none");
} else {
    // Der Endboss lebt, verstecke den Game-Over-Bildschirm
    gameoverScreen.classList.add("d-none");
}
}

}





