let canvas; // ist der Hintergrund des Spiels, ein Container mit Breite und Höhe!
let world; // ist die gesamte Spielwelt mit allen Charactern und Gegenständen
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas"); // es wird der Variable "canvas" das HTML Element "canvas" zugewiesen!
  world = new World(canvas, keyboard); // neues Object namens World wird angelegt und die Variable canvas und keyboard werden mitgegeben
  
}

// wenn Taste geklickt wird wirft es ein JSON raus und wird auf true gesetzt
window.addEventListener('keydown', (e) => {

  if (e.keyCode == '38') {
    keyboard.UP = true;
      // up arrow
  }
  if (e.keyCode == '40') {
    keyboard.DOWN = true;
      // down arrow
  }
  if (e.keyCode == '37') {
    keyboard.LEFT = true;
     // left arrow
  }
  if (e.keyCode == '39') {
    keyboard.RIGHT = true;
     // right arrow
  }
  if (e.keyCode == '32') {
    keyboard.SPACE = true;
    // space 
  }
}); 

// wenn Taste losgelassen wird wird es wieder auf false gesetzt!
window.addEventListener('keyup', (e) => {

  if (e.keyCode == '38') {
    keyboard.UP = false;
      // up arrow
  }
  if (e.keyCode == '40') {
    keyboard.DOWN = false;
      // down arrow
  }
  if (e.keyCode == '37') {
    keyboard.LEFT = false;
     // left arrow
  }
  if (e.keyCode == '39') {
    keyboard.RIGHT = false;
     // right arrow
  }
  if (e.keyCode == '32') {
    keyboard.SPACE = false;
    // space 
  }
}); 