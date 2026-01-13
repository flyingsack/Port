let bevColors = [];
let jlGroup = [];
let bgImage;

function preload() {
  bgImage = loadImage("images/background.png"); 
}

function setup() {
  createCanvas(1080, 720);

  bevColors = [
    {
      base: color(255, 204, 0),
      faceTop: color(250, 216, 112),
      faceMid: color(230, 167, 92),
      strap: color(110, 62, 5),
      beard: color(0),
      nose: color(51, 46, 39),
      noseShadow: color(0),
      eyeWhite: color(255),
      eyeLid: color(199),
      eyeIris: color(0),
      mouthTop: color(199),
      mouthBottom: color(255),
      eyebrow: color(0),
    },
    {
      base: color(100, 200, 255),
      faceTop: color(210, 240, 255),
      faceMid: color(180, 200, 255),
      strap: color(50, 100, 130),
      beard: color(30),
      nose: color(40, 60, 100),
      noseShadow: color(0),
      eyeWhite: color(255),
      eyeLid: color(180),
      eyeIris: color(0),
      mouthTop: color(180),
      mouthBottom: color(255),
      eyebrow: color(20),
    },
    {
      base: color(255, 100, 200),
      faceTop: color(255, 180, 230),
      faceMid: color(240, 130, 190),
      strap: color(140, 20, 90),
      beard: color(50),
      nose: color(100, 40, 80),
      noseShadow: color(0),
      eyeWhite: color(255),
      eyeLid: color(200),
      eyeIris: color(0),
      mouthTop: color(170),
      mouthBottom: color(255),
      eyebrow: color(0),
    },
  ];

  for (let i = 0; i < 15; i++) {
    let style = bevColors[int(random(bevColors.length))];
    let x = random(200, width - 200);
    let y = random(200, height - 200);
    let vx = random(-2, 2);
    let vy = random(-2, 2);
    let rot = random(360);
    let sc = random(0.3, 0.5);
    jlGroup.push({ style, x, y, vx, vy, rot, sc });
  }
}

function draw() {
  image(bgImage, 0, 0, width, height);

  for (let jl of jlGroup) {
    jl.x += jl.vx;
    jl.y += jl.vy;

    let w = 300 * jl.sc;
    let h = 250 * jl.sc;

    if (jl.x < 40 + w / 2 || jl.x > width - 40 - w / 2) {
      jl.vx *= -1;
    }
    if (jl.y < 40 + h / 2 || jl.y > height - 40 - h / 2) {
      jl.vy *= -1;
    }

    jl.rot = (jl.rot + 1) % 360;

    drawBev(jl.style, jl.x, jl.y, jl.rot, jl.sc);
  }
}

function drawBev(bevs, x, y, rot, sc) {
  push();
  translate(x, y);
  rotate(radians(rot));
  scale(sc);
  drawHeadBase(bevs);
  drawEyes(bevs);
  drawMouth(bevs);
  drawNose(bevs);
  drawEyebrows(bevs);
  pop();
}

function drawHeadBase(bevs) {
  fill(bevs.base);
  rect(20, -70, 250, 200, 50);
  rect(-10, 30, 100, 100, 50);
  rect(210, 30, 100, 100, 50);
  fill(bevs.faceTop);
  rect(40, -60, 110, 150, 50);
  rect(148, -60, 110, 150, 50);
  fill(bevs.faceMid);
  rect(40, -30, 110, 120, 50);
  rect(148, -30, 110, 120, 50);
  fill(bevs.strap);
  rect(40, 80, 220, 50, 50);
  fill(bevs.beard);
  rect(50, 110, 200, 5, 50);
  rect(150, 92, 5, 20, 50);
}

function drawEyes(bevs) {
  fill(bevs.eyeWhite);
  rect(51, 0, 60, 60, 50);
  rect(190, 0, 60, 60, 50);
  fill(bevs.eyeLid);
  rect(57, 12, 50, 25, 50);
  rect(192, 12, 50, 25, 50);
  fill(bevs.eyeIris);
  rect(55, 10, 50, 25, 50);
  rect(68, 5, 25, 50, 50);
  rect(195, 10, 50, 25, 50);
  rect(208, 5, 25, 50, 50);
}

function drawMouth(bevs) {
  fill(bevs.mouthTop);
  rect(90, 110, 100, 40, 5, 5, 40, 40);
  fill(bevs.mouthBottom);
  rect(100, 110, 100, 40, 5, 5, 40, 40);
}

function drawNose(bevs) {
  fill(bevs.nose);
  rect(110, 60, 70, 40, 10, 10, 50, 50);
  fill(bevs.noseShadow);
  rect(115, 60, 70, 40, 10, 10, 50, 50);
}

function drawEyebrows(bevs) {
  fill(bevs.eyebrow);
  rect(155, 0, 200, 50, 30, 30, 10, 10);
  rect(-35, 0, 200, 50, 30, 30, 10, 10);
}
