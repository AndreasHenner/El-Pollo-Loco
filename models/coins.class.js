class Coins extends MovableObject {
    //  hat alle Eigenschaften von MovableObject da es vererbt wird!
   
    width = 150;
    height = 150;

   
    constructor() {
      super().loadImg("img/8_coin/coin_2.png"); // loadImg wird hier von der SuperKlasse aufgerufen
      this.x = 800 + Math.random() * 2500;
      this.y = 20 + Math.random() * 280;
    }
  
  }