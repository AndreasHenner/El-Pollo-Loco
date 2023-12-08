class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  statusbarBottle;
  statusbarCoin;
  statusbarHealth;
  statusbarEndboss
  level_end_x = 4200; // Ende des Levels nach rechts
  

  constructor(enemies, clouds, backgroundObjects, coins, bottles, statusbarCoin, statusbarBottle, statusbarHealth, statusbarEndboss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.statusbarCoin = statusbarCoin;
    this.statusbarBottle = statusbarBottle;
    this.statusbarHealth = statusbarHealth;
    this.statusbarEndboss = statusbarEndboss;
  }
}
