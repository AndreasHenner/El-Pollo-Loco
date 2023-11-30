class ThrowableObject extends MovableObject {
  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  splashing_sound = new Audio("audio/splash.mp3");
  throwing_sound = new Audio("audio/throw.mp3");

  constructor(x, y) {
    super().loadImg("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_THROWING); // lädt Bilder für das Werfen
    this.loadImages(this.IMAGES_SPLASH); // lädt Bilder für das Splashen der Flasche
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.throw(); 
  }

  splashed = false;
  deletable = false;

  throw() {
    this.speedY = 15; // Weite des Wurfes
    this.applyGravity(); // Flasche fällt
    this.throwing_sound.play();
  
    setInterval(() => {
      this.x += 10; //Schnelligkeit der Flasche beim werfen
    }, 25);

    setInterval(() => {
       // Flasche zerbricht wenn sie aufkommt
      if (this.splashed || this.y > 310) {
        if (!this.splashingSoundPlayed) {
          this.playAnimation(this.IMAGES_SPLASH); // Splash Animation wird abgespielt
          this.splashing_sound.play();
          this.splashingSoundPlayed = true;
        }
      } else {
        this.playAnimation(this.IMAGES_THROWING);
      }
    }, 100);
  }
 
  hitted() {
    this.splashed = true;
    setTimeout(() => {
      this.deletable = true;
    }, 200);
  }
}
