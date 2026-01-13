let j = [];
let imgIndex = 1;
let cx, cy;
let gridSize = 40;
let bgImage;

function preload() {
 
  bgImage = loadImage("images/background.png");
  j[1] = loadImage("images/jovanny.png");
  j[2] = loadImage("images/jovanny1.png");
  j[3] = loadImage("images/jovanny2.png");
  j[4] = loadImage("images/jovanny3.png");
  j[5] = loadImage("images/jovanny4.png");
  j[6] = loadImage("images/jovanny5.png");
  j[7] = loadImage("images/jovanny6.png");
  j[8] = loadImage("images/jovanny7.png");
  j[9] = loadImage("images/jovanny8.png");
  j[10] = loadImage("images/jovanny9.png");
  j[11] = loadImage("images/jovanny10.png");
  j[12] = loadImage("images/jovanny11.png");
  j[13] = loadImage("images/jovanny12.png");
  j[14] = loadImage("images/jovanny13.png");
  j[15] = loadImage("images/jovanny14.png");
  j[16] = loadImage("images/jovanny15.png");
  j[17] = loadImage("images/jovanny16.png");
  j[18] = loadImage("images/jovanny17.png");
  
}

function setup() {
  createCanvas(1000, 800);
 
  noStroke();
  cx = width / 2;
  cy = height / 2;
  textSize(70);
}

function draw() {
  background(bgImage);

  
  image(j[imgIndex], cx, cy, gridSize, gridSize);
}

function keyPressed() {
 
  switch (key) {
    case 'a':
      cx -= gridSize;
      break;
    case 'd':
      cx += gridSize;
      break;
    case 'w':
      cy -= gridSize;
      break;
    case 's':
      cy += gridSize;
      break;
    case 't':
      fill(255, 0, 0);
      text("AMOR", cx, cy - 50);
      break;
    case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
      imgIndex = int(key);
      break;
    case '0':
      imgIndex = 10; 
      break;
      
  }

  
  cx = constrain(cx, gridSize / 2, width - gridSize / 2);
  cy = constrain(cy, gridSize / 2, height - gridSize / 2);
}
