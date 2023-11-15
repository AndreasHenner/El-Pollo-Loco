class ThrowableObject extends MovableObject {
   
  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
  ];


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

throw() {
  this.speedY = 30;
  this.applyGravity(); // Flasche fällt
  setInterval(() => {
    this.x += 10;
  }, 25);
  setInterval(() => {
    this.playAnimation(this.IMAGES_THROWING);
  }, 100);
 
}

splashBottle() {
    this.playAnimation(this.IMAGES_SPLASH);
}
}