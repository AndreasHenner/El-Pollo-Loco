class ThrowableObject extends MovableObject {
   
  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
  ];


 constructor(x, y) {
    super().loadImg("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_THROWING); // lädt Bilder für das Werfen
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
}