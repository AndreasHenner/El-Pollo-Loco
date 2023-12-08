class ChickenSmall extends MovableObject { // Chicken hat alle Eigenschaften von MovableObject da es vererbt wird!

    height = 40;
    width = 40;
    y = 390;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png", 
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ];

      IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
      ];

    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // loadImg wird hier von der SuperKlasse aufgerufen
        this.x = 400 + Math.random() * 3500; // die Chicken starten immer an einem zufälligem Startpunkt
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() *0.5; // 0.15 ist Minimalspeed * 0.5 wird zufällig für jedes Element einzeln dazuaddiert 
        this.animate();
    }
    
    animate() {
      setInterval(() => this.moveLeft(), 1000 / 50);

      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.dead || this.splashed) this.playAnimation(this.IMAGES_DEAD);
      }, 100);
    }

    moveLeft() {
      super.moveLeft(); // moveLeft() von movableObject wird ausgeführt
      this.otherDirection = false;
    }
  }
   
  
