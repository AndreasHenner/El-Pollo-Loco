class ChickenSmall extends MovableObject { // Chicken hat alle Eigenschaften von MovableObject da es vererbt wird!

    height = 40;
    width = 40;
    y = 380;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png", 
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ];

    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // loadImg wird hier von der SuperKlasse aufgerufen
        this.x = 200 + Math.random() * 3500; // die Chicken starten immer an einem zufälligem Startpunkt
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() *0.5; // 0.15 ist Minimalspeed * 0.5 wird zufällig für jedes Element einzeln dazuaddiert 
        this.animate();
    }
    
    animate() {
      setInterval(() => {
        this.moveLeft();
        this.otherDirection = false;
      }, 1000 / 50);
      
      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 100);
    }
  }
   
  
