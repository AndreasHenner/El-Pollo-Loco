class Chicken extends MovableObject {
  // Chicken hat alle Eigenschaften von MovableObject da es vererbt wird!

  height = 55;
  width = 55;
  y = 375;
  
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  constructor() {
    super().loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); // loadImg wird hier von der SuperKlasse aufgerufen
    this.x = 400 + Math.random() * 3500; // die Chicken starten immer an einem zufälligem Startpunkt
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.15 + Math.random() * 0.5; // 0.15 ist Minimalspeed * 0.5 wird zufällig für jedes Element einzeln dazuaddiert
    this.animate();
  }

  animate() {
    //Move
    setInterval(() => this.moveLeft(), 1000 / 60);
    // Animation
    setInterval(() => {
      if (this.dead) this.playDeadAnimation();
       else this.playAnimation(this.IMAGES_WALKING); 
    }, 100);
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.IMAGES_DEAD.splice(1);
    }, 400);
  }
}



