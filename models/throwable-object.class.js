class ThrowableObject extends MovableObject {
   
 constructor(x, y) {
    super().loadImg("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
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
}
}