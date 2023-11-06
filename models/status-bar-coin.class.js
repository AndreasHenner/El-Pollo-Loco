class StatusbarCoins extends MovableObject {
  //  hat alle Eigenschaften von MovableObject da es vererbt wird!

  IMAGE_COIN = [
    "img/7_statusbars/3_icons/icon_coin.png"
  ];


  constructor() {
    super().loadImg("img/7_statusbars/3_icons/icon_coin.png");
  
    this.x = 110;
    this.y = 65;
    this.width = 80;
    this.height = 80;
  

  }

}