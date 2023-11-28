class Character extends MovableObject {
  // Character hat alle Eigenschaften von MovableObject da es vererbt wird!

  height = 300;
  width = 120;
  y = 30;
  speed = 15;
  

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png"
  ];


  
  world; //Variable aus der Klasse world
  walking_sound = new Audio("audio/characterWalk.mp3"); // Laufsound wird in der Variablen gespeichert
 
  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png"); // loadImg wird hier von der SuperKlasse aufgerufen
    this.loadImages(this.IMAGES_WALKING); // lädt Bilder für das Laufen
    this.loadImages(this.IMAGES_JUMPING); // lädt Bilder für das Springen
    this.loadImages(this.IMAGES_DEAD); // lädt Bilder für das Sterben
    this.loadImages(this.IMAGES_HURT); // lädt Bilder für das Verletzen
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
    this.moveRight();
    this.jump();
  }

  // lässt den Character bewegen

  animate() {
    // Sleep
    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.playAnimation(this.IMAGES_SLEEP);
        this.walking_sound.pause();
        return;  // Verlasse die Funktion, um andere Aktionen zu verhindern
      }
     // Walk right
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false; // Bild wird wieder zurückgespiegelt
        this.walking_sound.play();
      }

      // Walk left
      if (this.world.keyboard.LEFT && this.x > 0) {
        // Character kann nicht nach links aus der Map raus laufen
        this.x -= this.speed;
        this.otherDirection = true; // Bild wird gespiegelt
        this.walking_sound.play();
      }
      
      //Jump
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      } 
      
       
    

      this.world.camera_x = -this.x + 100; // x Koordinate des Characters ist immer das Gegenteil zu X Koordinate des Hintergrundes, 100 = Pos Character auf X Achse
    }, 1000 / 30);

    setInterval(() => {
      // Dead-Animation
      
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.showLostScreen();
        // Hurt-Animation
      } else if(this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } // Jump-Animation
      else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        //Walk-Animation
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {// es wird auf die Variable Keyboard aus der world zugegriffen
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 75);
  }

  showLostScreen() {
    let lostScreen = document.getElementById('lostScreen');
    if (this.isDead()) {
        // Der Charakter ist tot, zeige das Bild an
        lostScreen.classList.remove('d-none');
    } else {
        // Der Charakter ist nicht tot, verstecke das Bild
        lostScreen.classList.add('d-none');
    }
  }
}


