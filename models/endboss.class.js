class Endboss extends MovableObject {

    height = 450;
    width = 300;
    y = 5;
    damage = 20;
 
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png"
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];


  constructor() {
    super().loadImg(this.IMAGES_ATTACK[0]); 
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK); 
    this.loadImages(this.IMAGES_DEAD); 
    this.x = 4300;
    this.speed = 0.4;
    this.animate();
  }

  /**
   * let endboss move and execute animationfunctions
   */
  animate() {
    setInterval(() => this.moveLeft(), 1000 / 30);
    setInterval(() => {
      if (this.isHurt()) this.playHurtAnimation();
      else if(this.isDead()) this.playDeadAnimation();
      else {
       this.playWalkAnimation();
      } 
    }, 325);
  }

  /**
   * plays hurt-animation
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.speed = 4;
  }

  /**
   * plays dead-animation
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    clearAllIntervals();
  }

  /**
   * plays walk-animation
   */
  playWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
  }
}

  

  
