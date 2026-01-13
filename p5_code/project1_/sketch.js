let currentkey = '1';
let bgc;
let gkcount;
let growSize = 5;
let offset = 0;

function setup() {
  createCanvas(800, 600);
  background(255);
  smooth();
  bgc = color(255);
  gkcount = 20;
}

function draw() {
  if (keyIsPressed) {
    clear_print();
  }

  if (mouseIsPressed) {
    drawChoice();
  }
}

function drawChoice() {
  let currentkey = key;

  switch (currentkey) {
    case '1':
    //red
      drawline(color(255, 0, 0), mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '2':
      // yellow line 
      let wiggle = sin(offset * 10) * 10;
      stroke(255, 255, 0);
      strokeWeight(3);
      line(mouseX + wiggle, mouseY, pmouseX + wiggle, pmouseY);
      break;

    case '3':
      // Big low-opacity blue line
      stroke(0, 0, 255, 50);
      strokeWeight(12);
      line(mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '4':
      // Black line
      stroke(0);
      strokeWeight(random(5, 15));
      line(mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '5':
      // Growing rainbow line
      let r = random(255);
      let g = random(255);
      let b = random(255);
      stroke(r, g, b);
      strokeWeight(growSize);
      line(mouseX, mouseY, pmouseX, pmouseY);
      growSize += 1;
      if (growSize > 50) growSize = 5;
      break;

    case '6':
      //  green squares
      noStroke();
      fill(0, 255, 0);
      rect(mouseX - 10, mouseY - 10, 20, 20);
      push();
      translate(mouseX, mouseY);
      rotate(HALF_PI);
      rect(-10, -10, 20, 20);
      pop();
      break;

    case '7':
      //\low opa pink line
      stroke(255, 105, 180, 60);
      strokeWeight(20);
      line(mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '8':
      //  "AMOR"
      noStroke();
      fill(0, 100, 255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("AMOR", mouseX, mouseY);
      break;

    case '9':
  // grayscale brush
  for (let i = 0; i < 20; i++) {
    let angle = random(TWO_PI);
    let radius = random(5, 30);
    let x = mouseX + cos(angle) * radius;
    let y = mouseY + sin(angle) * radius;
    
    let grey = random(100, 255); 
    noStroke();
    fill(grey);
    ellipse(x, y, random(4, 10));
  }
  break;

    case '0':
      // Eraser
      eraser(bgc, mouseX, mouseY, 30);
      break;

    default:
      
      break;
  }
}

function drawline(k, lx, ly, px, py) {
  strokeWeight(2);
  stroke(k);
  line(lx, ly, px, py);
}

function eraser(k, lx, ly, sz) {
  noStroke();
  fill(k);
  ellipse(lx, ly, sz, sz);
}

function clear_print() {
  if (key == 'x' || key == 'X') {
    background(bgc);
  } else if (key == 'p' || key == 'P') {
    saveCanvas('my_drawing', 'png');
  }
}
