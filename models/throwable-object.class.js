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
  
  direction;

  constructor(x, y, direction) {
    super().loadImg("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_THROWING); // lädt Bilder für das Werfen
    this.loadImages(this.IMAGES_SPLASH); // lädt Bilder für das Splashen der Flasche
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = 70;
    this.height = 70;
    this.throw();
  }

  splashed = false;
  deletable = false;

  /**let throwableObjects throw 
   * detect direction of character
   * speedY raises from 0 to 30
  */
  throw() {
    this.speedY = 30; // Höhe des Wurfes
    this.applyGravity(); // Flasche fällt
    setInterval(() => {
      if (this.direction) {
        this.x -= 10; // Wurf nach links
      } else {
        this.x += 10; // Wurf nach links
      }
    }, 25);
     // Flasche zerbricht wenn sie aufkommt
    setInterval(() => this.bottleCanSplash(),  100);
  }

  /**let bottle splash on the ground
   * detect if bottle on the ground
   * either execute splash-animation or throwing-animation
  */
  bottleCanSplash() {
    if (this.splashed || this.y > 310) {
      if (!this.splashingSoundPlayed) {
      this.playSplashAnimation();
        if (this.isAboveGround()) {
          clearInterval(this.applyGravity());
        }
      }
    } else {
      this.playAnimation(this.IMAGES_THROWING);
    }
  }

  /**plays splash-animation*/
  playSplashAnimation() {
    this.playAnimation(this.IMAGES_SPLASH); // Splash Animation wird abgespielt
    if (muteMusicIsClicked) {
      this.splashing_sound.pause();
    } else {
    this.splashing_sound.play();
    }
    this.splashingSoundPlayed = true;
  }

  /**set splash to true
   * set deletable to true
  */
  hitted() {
    this.splashed = true;
    setTimeout(() => {
      this.deletable = true;
    }, 200);
  }
}
