let canvas; // ist der Hintergrund des Spiels, ein Container mit Breite und Höhe!
let world; // ist die gesamte Spielwelt mit allen Charactern und Gegenständen
let keyboard = new Keyboard();
let background_sound = new Audio("audio/backgroundMusic.mp3");
let = muteMusicIsClicked = false;

function init() {
  canvas = document.getElementById("canvas"); // es wird der Variable "canvas" das HTML Element "canvas" zugewiesen!
  world = new World(canvas, keyboard); // neues Object namens World wird angelegt und die Variable canvas und keyboard werden mitgegeben
  let startImg = document.getElementById("startImg");
  let startGameButton = document.getElementById("startGameButton");
  let muteMusic = document.getElementById("muteMusic");
  muteMusic.classList.remove("d-none");
  startGameButton.classList.add("d-none");
  startImg.classList.add("d-none");
}

/**all Intervalls stops*/
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**Operation of the Smartphone-Touchstart */
window.addEventListener("touchstart", (e) => {
  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");

  if (e.target === btnLeft) {
    keyboard.LEFT = true;
  } else if (e.target === btnRight) {
    keyboard.RIGHT = true;
  } else if (e.target === btnJump) {
    keyboard.SPACE = true;
  } else if (e.target === btnThrow) {
    keyboard.D = true;
  }
});

/**Operation of the Smartphone-Touchend */
window.addEventListener("touchend", (e) => {
  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");

  if (e.target === btnLeft) {
    keyboard.LEFT = false;
  } else if (e.target === btnRight) {
    keyboard.RIGHT = false;
  } else if (e.target === btnJump) {
    keyboard.SPACE = false;
  } else if (e.target === btnThrow) {
    keyboard.D = false;
  }
});

/**Keyboard operation if keydown*/
window.addEventListener("keydown", (e) => {
  if (e.keyCode == "38") {
    keyboard.UP = true;
    // up arrow
  }
  if (e.keyCode == "40") {
    keyboard.DOWN = true;
    // down arrow
  }
  if (e.keyCode == "37") {
    keyboard.LEFT = true;
    // left arrow
  }
  if (e.keyCode == "39") {
    keyboard.RIGHT = true;
    // right arrow
  }
  if (e.keyCode == "32") {
    keyboard.SPACE = true;
    // space
  }
  if (e.keyCode == "68") {
    keyboard.D = true;
    // D (THROW)
  }
});

/**Keyboard operation if keyup*/
// wenn Taste losgelassen wird wird es wieder auf false gesetzt!
window.addEventListener("keyup", (e) => {
  if (e.keyCode == "38") {
    keyboard.UP = false;
    // up arrow
  }
  if (e.keyCode == "40") {
    keyboard.DOWN = false;
    // down arrow
  }
  if (e.keyCode == "37") {
    keyboard.LEFT = false;
    // left arrow
  }
  if (e.keyCode == "39") {
    keyboard.RIGHT = false;
    // right arrow
  }
  if (e.keyCode == "32") {
    keyboard.SPACE = false;
    // space
  }
  if (e.keyCode == "68") {
    keyboard.D = false;
    // D (THROW)
  }
});

/**open fullscsreen*/
function showFullscreen() {
  let canvas = document.getElementById("canvasDiv");
  let buttonExitFullscreen = document.getElementById("buttonExitFullscreen");
  buttonExitFullscreen.classList.remove("d-none");
  canvas.requestFullscreen();
}

/**close fullscreen */
function leaveFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  let buttonExitFullscreen = document.getElementById("buttonExitFullscreen");
  buttonExitFullscreen.classList.add("d-none");
}



/**switch backgroundmusic on and off*/
function toggleMusic() {
  muteMusicIsClicked = !muteMusicIsClicked;
  let muteMusic = document.getElementById("muteMusic");
// Schalte den Sound aus
  if (muteMusicIsClicked) {
    muteMusicIsClicked = true;
    muteMusic.src = "img/9_intro_outro_screens/mute.png";
    this.stopBackgroundSound();
    // Schalte den Sound ein
  } else  {
    startBackgroundSound();
    muteMusic.src = "img/9_intro_outro_screens/loud.png";
  }
}

function stopBackgroundSound() {
  background_sound.pause();
}

function startBackgroundSound() {
  background_sound.play();
}

/**reload page*/
function reloadPage() {
  location.reload();
}

/**track screenWidth and shows Text if Mobile is in portraitmodus*/
function portraitModus() {
  setInterval(() => {
    let screenWidth = window.innerWidth;
    let turnDevicePage = document.getElementById("turnDevicePage");
    if (screenWidth <= 430) {
     turnDevicePage.classList.remove("d-none");
     turnDevicePage.classList.add("turn-your-device");
    } if(screenWidth > 430){
      turnDevicePage.classList.add("d-none");
      turnDevicePage.classList.remove("turn-your-device");
    }
  }, 2);
}

