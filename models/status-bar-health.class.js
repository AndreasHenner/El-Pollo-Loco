class StatusbarHealth extends MovableObject {
  //  hat alle Eigenschaften von MovableObject da es vererbt wird!

  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 5;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * images of the statusbar will be loaded into imachecache
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * images of the statusbar will be changed regarding the status of hurt from character
   */
    resolveImageIndex() {
    if (this.percentage == 100) {
      return 5; // Das 5. Bild im Aray IMAGES
    } else if (this.percentage > 80){
       return 4;
    } else if(this.percentage > 60){
       return 3;
    } else if(this.percentage > 40) {
      return 2;
    } else if(this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  
  }

