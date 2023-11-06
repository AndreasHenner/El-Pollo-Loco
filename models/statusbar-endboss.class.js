class StatusbarEndboss extends MovableObject {
    //  hat alle Eigenschaften von MovableObject da es vererbt wird!
   
    width = 200;
    height = 50;

   
    constructor() {
      super().loadImg("img/7_statusbars/2_statusbar_endboss/orange.png"); // loadImg wird hier von der SuperKlasse aufgerufen
      this.x = 500;
      this.y = 5;
    }
  
  }