class StatusbarBottles extends MovableObject {
  //  hat alle Eigenschaften von MovableObject da es vererbt wird!

  IMAGE_BOTTLE = [
    "img/7_statusbars/3_icons/icon_salsa_bottle.png"
  ];


  constructor() {
    super().loadImg("img/7_statusbars/3_icons/icon_salsa_bottle.png");;
    this.x = 1;
    this.y = 80;
    this.width = 80;
    this.height = 60;
  }

}
