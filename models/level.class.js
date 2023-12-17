class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  imgStatusbarBottle;
  imgStatusbarCoin;
  statusbarHealth;
  statusbarEndboss;
  imgStatusbarEndboss;
  counter;
  level_end_x = 4200; // Ende des Levels nach rechts
  

  constructor(enemies, clouds, backgroundObjects, coins, bottles, imgStatusbarCoin, imgStatusbarBottle, statusbarHealth, statusbarEndboss, imgStatusbarEndboss, counter) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.imgStatusbarCoin = imgStatusbarCoin;
    this.imgStatusbarBottle = imgStatusbarBottle;
    this.statusbarHealth = statusbarHealth;
    this.statusbarEndboss = statusbarEndboss;
    this.imgStatusbarEndboss = imgStatusbarEndboss;
    this.counter = counter;
  }
}
