class Bottles extends MovableObject {
 
  width = 60;
  height = 60;
 
  IMAGES_BOTTLE =
  [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
  ];

  constructor() {
    super().loadImg(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    this.x = 400 + Math.random() * 2800;
    this.y = 370;
  }
}
