class Coins extends MovableObject {
   
    width = 150;
    height = 150;

   
    constructor() {
      super().loadImg("img/8_coin/coin_2.png"); 
      this.x = 800 + Math.random() * 2500;
      this.y = 0 + Math.random() * 280;
    }
  }