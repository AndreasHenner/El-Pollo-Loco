class ImgStatusbarEndboss extends MovableObject {
    //  hat alle Eigenschaften von MovableObject da es vererbt wird!
   
    width = 62;
    height = 62;

   
    constructor() {
      super().loadImg("img/7_statusbars/3_icons/icon_health_endboss.png"); // loadImg wird hier von der SuperKlasse aufgerufen
      this.x = 484;
      this.y = 13;
    }
  }