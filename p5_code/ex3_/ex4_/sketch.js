let bevGroup = [];
let bevColors = [];

function setup() {
  createCanvas(1080, 720);
  angleMode(DEGREES);
  noStroke();

  // Define color styles
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

  // Create creatures
  for (let i = 0; i < 15; i++) {
    let style = random(bevColors);
    let x = random(200, width - 200);
    let y = random(200, height - 200);
    let vx = random(-2, 2);
    let vy = random(-2, 2);
    let rot = random(360);
    let sc = random(0.3, 0.5);
    bevGroup.push(new jlBevCreature(style, x, y, vx, vy, rot, sc));
  }
}

function draw() {
  background(220);
  for (let b of bevGroup) {
    b.move();
    b.display();
  }
}

function mousePressed() {
  for (let b of bevGroup) {
    b.changeSpeed();
    b.changeColor();
  }
}

function keyPressed() {
  if (key === ' ') {
    for (let b of bevGroup) {
      b.changeScale();
    }
  }
  if (key === 'r') {
    for (let b of bevGroup) {
      b.toggleSpin();
    }
  }
}

// 🧠 Creature Class
class jlBevCreature {
  constructor(style, x, y, vx, vy, rot, sc) {
    this.style = style;
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.rot = rot;
    this.sc = sc;
    this.spin = true;
  }

  move() {
    this.pos.add(this.vel);
    let w = 300 * this.sc;
    let h = 250 * this.sc;

    if (this.pos.x < 40 + w / 2 || this.pos.x > width - 40 - w / 2) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 40 + h / 2 || this.pos.y > height - 40 - h / 2) {
      this.vel.y *= -1;
    }

    if (this.spin) {
      this.rot = (this.rot + 1) % 360;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    scale(this.sc);
    this.drawHeadBase();
    this.drawEyes();
    this.drawMouth();
    this.drawNose();
    this.drawEyebrows();
    pop();
  }

  drawHeadBase() {
    let b = this.style;
    fill(b.base);
    rect(20, -70, 250, 200, 50);
    rect(-10, 30, 100, 100, 50);
    rect(210, 30, 100, 100, 50);

    fill(b.faceTop);
    rect(40, -60, 110, 150, 50);
    rect(148, -60, 110, 150, 50);

    fill(b.faceMid);
    rect(40, -30, 110, 120, 50);
    rect(148, -30, 110, 120, 50);

    fill(b.strap);
    rect(40, 80, 220, 50, 50);

    fill(b.beard);
    rect(50, 110, 200, 5, 50);
    rect(150, 92, 5, 20, 50);
  }

  drawEyes() {
    let b = this.style;
    fill(b.eyeWhite);
    rect(51, 0, 60, 60, 50);
    rect(190, 0, 60, 60, 50);

    fill(b.eyeLid);
    rect(57, 12, 50, 25, 50);
    rect(192, 12, 50, 25, 50);

    fill(b.eyeIris);
    rect(55, 10, 50, 25, 50);
    rect(68, 5, 25, 50, 50);
    rect(195, 10, 50, 25, 50);
    rect(208, 5, 25, 50, 50);
  }

  drawMouth() {
    let b = this.style;
    fill(b.mouthTop);
    rect(90, 110, 100, 40, 5, 5, 40, 40);
    fill(b.mouthBottom);
    rect(100, 110, 100, 40, 5, 5, 40, 40);
  }

  drawNose() {
    let b = this.style;
    fill(b.nose);
    rect(110, 60, 70, 40, 10, 10, 50, 50);
    fill(b.noseShadow);
    rect(115, 60, 70, 40, 10, 10, 50, 50);
  }

  drawEyebrows() {
    let b = this.style;
    fill(b.eyebrow);
    rect(155, 0, 200, 50, 30, 30, 10, 10);
    rect(-35, 0, 200, 50, 30, 30, 10, 10);
  }

  // 🎮 Interaction Methods
  changeScale() {
    this.sc = random(0.3, 0.6);
  }

  changeSpeed() {
    this.vel = createVector(random(-3, 3), random(-3, 3));
  }

  changeColor() {
    this.style.base = color(random(255), random(255), random(255));
    this.style.mouthTop = color(random(255), random(255), random(255));
    this.style.mouthBottom = color(random(255), random(255), random(255));
  }

  toggleSpin() {
    this.spin = !this.spin;
  }
}
