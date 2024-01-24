class Character extends MovableObject {
 

  height = 300;
  width = 120;
  y = 25;
  speed = 15;

  offset = {
    top: 150,
    left: 50,
    right: 50,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_STANDING = [
    "img/2_character_pepe/1_idle/idle/I-1.png", 
    "img/2_character_pepe/1_idle/idle/I-2.png", 
    "img/2_character_pepe/1_idle/idle/I-3.png", 
    "img/2_character_pepe/1_idle/idle/I-4.png", 
    "img/2_character_pepe/1_idle/idle/I-5.png", 
    "img/2_character_pepe/1_idle/idle/I-6.png", 
    "img/2_character_pepe/1_idle/idle/I-7.png", 
    "img/2_character_pepe/1_idle/idle/I-8.png", 
    "img/2_character_pepe/1_idle/idle/I-9.png", 
    "img/2_character_pepe/1_idle/idle/I-10.png"
];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world; //Variable aus der Klasse world
  walking_sound = new Audio("audio/characterWalk.mp3"); 
  snoring_sound = new Audio("audio/snoring.mp3");
  inTheAir_sound = new Audio("audio/inTheAir.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  sleepCounter = 0;
  inTheAir = false;

  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING); 
    this.loadImages(this.IMAGES_JUMPING); 
    this.loadImages(this.IMAGES_DEAD); 
    this.loadImages(this.IMAGES_HURT); 
    this.loadImages(this.IMAGES_SLEEP); 
    this.loadImages(this.IMAGES_STANDING); 
    this.applyGravity();
    this.animate();
    this.moveRight();
  }

  /**
   * execute moveCharacter and playCharacter
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 30);
    setInterval(() => this.playCharacter(), 75);
  }

  /**
   * execute movefunctions for character
   */
  moveCharacter() {
    if (this.canMoveRight()) 
      this.moveRight();
    if (this.canMoveLeft()) 
      this.moveLeft();
    if (this.canJump()) {
      if (muteMusicIsClicked) {
        this.inTheAir_sound.pause();
      } else {
      this.inTheAir_sound.play();
      }
      this.jump();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * if key right is pressed, character moves right
  */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * let character move right
   */
  moveRight() {
    super.moveRight(); 
    this.otherDirection = false;
    if (muteMusicIsClicked) {
      this.walking_sound.pause();
    } else {
    this.walking_sound.play();
    }
  }

  /**
   * if key left is pressed, character moves left
   * */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * let character move left
   */
  moveLeft() {
    super.moveLeft(); // moveLeft() von movableObjects wird aufgerufen
    this.otherDirection = true;
    if (muteMusicIsClicked) {
      this.walking_sound.pause();
    } else {
    this.walking_sound.play();
    }
  }

  /**
   * if key space is pressed, character jump
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * animations are played depending on the status of the character
   */
  playCharacter() {
    if (this.isDead()) this.playDeadAnimation();
    else if (this.isHurt()) this.playHurtAnimation();
    else if (this.isAboveGround()){
      this.playJumpAnimation();
      this.inTheAir = true;
    } 
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playWalkAnimation();
    else {
      this.walking_sound.pause();
      if (this.sleepCounter > 40) this.playSleepAnimation();
       else this.playStandingAnimation();
    }
  }

  /**
   * if character is dead, dead-animation is played
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    clearAllIntervals();
    reloadPageButton.classList.remove("d-none");
    smartphoneButtonArea.classList.add("game-over-screen");
    smartphoneButtonArea.classList.add("d-none");
    this.world.showLostScreen();
    this.world.danger_sound.pause();
    background_sound.pause();
    this.walking_sound.pause();
    let muteMusic = document.getElementById("muteMusic");
    muteMusic.classList.add("d-none");
  }

  /**
   * if character is hurt, hurt-animation is played
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.stopSleeping();
    if (muteMusicIsClicked) {
      this.hurt_sound.pause();
    } else {
    this.hurt_sound.play();
    }
  }

  /**
   * if character is jumping, jump-animation is played
   */
  playJumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.stopSleeping();
  }

  /**
   * if character is walking, walk-animation is played
   */
  playWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.stopSleeping();
  }

  /**
   * if character is sleeping, sleep-animation is played
   */
  playSleepAnimation() {
    this.playAnimation(this.IMAGES_SLEEP);
    if (muteMusicIsClicked) {
      this.snoring_sound.pause();
    } else {
    this.snoring_sound.play();
    }
  }

  /**
   * if character is standing, stanidng-animation is played
   */
  playStandingAnimation() {
    this.inTheAir = false;
    this.sleepCounter++;
    this.playAnimation(this.IMAGES_STANDING);
  }

  /**
   * if character is not sleeping, sleep-animation will be stopped
   */
  stopSleeping() {
    this.sleepCounter = 0;
    this.snoring_sound.pause();
  }
}
