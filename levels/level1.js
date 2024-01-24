const level1 = new Level(
createLevelEnemies(),
createLevelClouds(),
createLevelBackgroundObjects(),
createLevelCoins(),
createLevelBottles(),
createLevelStatusbarHealth(),
createLevelImgStatusbarBotttles(),
createLevelImgStatusbarCoins(),
createLevelThrowableObjects(),
createLevelStatusbarEndboss(),
);

function createLevelEnemies() {
  return   [
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Endboss()
   ]
}

function createLevelClouds() {
  return  [
    new Cloud("img/5_background/layers/4_clouds/1.png", 800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 2000),
    new Cloud("img/5_background/layers/4_clouds/2.png", 3000)
  ]
}

function createLevelBackgroundObjects() {
  return  [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 2),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 2),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 2),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png",719 * 3),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719 * 3),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png",719 * 3),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 4),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 4),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 4),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png",719 * 5),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719 * 5),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png",719 * 5),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 6),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 6),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 6),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 7),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png",719 * 7),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719 * 7),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png",719 * 7)
  ]
}

function createLevelCoins() {
  return  [
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins()
  ]
}

function createLevelBottles() {
  return  [
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles()
  ]
}

function createLevelStatusbarHealth() {
  return [
    new StatusbarHealth()
  ]
}

function createLevelImgStatusbarBotttles() {
  return [
    new ImgStatusbarBottles(),
  ]
}

function createLevelImgStatusbarCoins() {
  return [
    new ImgStatusbarCoins()
  ]
}

function createLevelThrowableObjects() {
  return [
    new ThrowableObject()
  ]
}

function createLevelStatusbarEndboss() {
  return  [
    new StatusbarEndboss()
  ]
}
