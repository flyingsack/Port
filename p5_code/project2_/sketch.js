let canvas;
let recMode = false;
let actLogged = -1;
let flyGroups = [];
let columns = [];
let amor = [];
let pg;
let swap;

function setup() {
  canvas = createCanvas(710, 400);
  frameRate(30);
  colorMode(255);

  const flySpacing = width / 4;
  for (let i = 0; i < 3; i++) {
    const x = flySpacing * (i + 1);
    const group = [
      new Fly(x, height / 2, random(TWO_PI)),
      new Fly(x, height / 2, random(TWO_PI)),
      new Fly(x, height / 2, random(TWO_PI))
    ];
    flyGroups.push(group);
  }

  const colSpacing = width / 6;
  for (let i = 0; i < 5; i++) {
    const x = colSpacing * (i + 1);
    columns.push(new Column(x, i * 0.5));
  }

  const numAmor = 5;
  const amorSpacing = width / numAmor;
  for (let i = 0; i < numAmor; i++) {
    const x = amorSpacing * i + amorSpacing / 2;
    amor.push(new Amor(x, 50, 10, 100, 0.05));
  }

  pg = createGraphics(710, 400, WEBGL);
  swap = createGraphics(710, 400, WEBGL);
}

function draw() {
  pg.reset();
  pg.texture(swap);
  pg.noStroke();
  pg.plane(width, height);

  pg.push();
  pg.translate(sin(millis() / 200) * 5, cos(millis() / 200) * 5, 0);
  pg.fill(255);
  pg.sphere(40);
  pg.pop();

  swap.push();
  swap.scale(1.1, 1.1);
  swap.texture(pg);
  swap.noStroke();
  swap.plane(width, height);
  swap.pop();

  swap.fill(0, 50);
  swap.rect(-width / 2, -height / 2, width, height);

  image(swap, 0, 0);

  if (frameCount < 300) {
    if (actLogged !== 0) {
      console.log("Fly: frames 0-299");
      actLogged = 0;
    }
    for (let group of flyGroups) {
      const [f1, f2, f3] = group;
      const bounceY = height / 2 + sin(frameCount * 0.1 + f1.angle) * 50;
      f1.update(f1.x, bounceY);
      f2.update(f1.x, f1.y);
      f3.update(f2.x, f2.y);
      f1.display(color(100, 200, 255));
      f2.display(color(255));
      f3.display(color(0));
    }

  } else if (frameCount < 600) {
    if (actLogged !== 1) {
      console.log("Columns: frames 300-599");
      actLogged = 1;
    }
    for (let col of columns) {
      col.update();
      col.display();
    }

  } else {
    if (actLogged !== 2) {
      console.log("Amor: frames 600+");
      actLogged = 2;
    }
    for (let a of amor) {
      a.update();
      a.display();
    }
  }

  recordit(); // ← added this line
}

class Fly {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 30;
    this.growth = 0.1;
    this.angle = angle;
    this.stiffness = 0.2;
    this.damping = 0.7;
    this.mass = 2;
    this.gravity = 9;
  }

  update(targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;

    let forceY = (targetY - this.y) * this.stiffness + this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;

    this.radius += this.growth;
  }

  display(c) {
    noStroke();
    fill(c);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Column {
  constructor(x, phase) {
    this.x = x;
    this.phase = phase;
    this.theta = 0;
    this.height = 0;
    this.color = color(0);
  }

  update() {
    this.theta = frameCount * 0.05 + this.phase;
    this.height = map(sin(this.theta), -1, 1, 50, height - 50);
    let hue = (frameCount * 2 + this.phase * 100) % 255;
    this.color = color(hue, 255);
  }

  display() {
    noStroke();
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, height / 2, 40, this.height);
  }
}

class Amor {
  constructor(x, numBalls, spacing, amplitude, speed) {
    this.x = x;
    this.numBalls = numBalls;
    this.spacing = spacing;
    this.amplitude = amplitude;
    this.speed = speed;
    this.angle = 0;
    this.offsetShift = 0;
  }

  update() {
    this.angle += this.speed;
    this.offsetShift += 0.001 / 12;
  }

  display() {
    push();
    translate(this.x, height / 2);
    fill(255);
    noStroke();
    for (let i = 0; i < this.numBalls; i++) {
      let offset = i * this.spacing + this.offsetShift;
      let phase = this.angle + offset * 0.05;
      let y = map(i, 0, this.numBalls, -height / 4, height / 4);
      let x1 = sin(phase) * this.amplitude;
      let x2 = -x1;
      ellipse(x1, y, 12, 12);
      ellipse(x2, y, 12, 12);
    }
    pop();
  }
}

function recordit() {
  if (recMode === true) {
    let ext = nf(frameCount, 1);
    saveCanvas(canvas, 'frame-' + ext, 'png');
    console.log("rec " + ext);
  }
}

function keyPressed() {
  let k = key;
  console.log("k is " + k);

  if (k === 's' || k === 'S') {
    console.log("Stopped Recording");
    recMode = false;
    noLoop();
  }

  if (k === ' ') {
    console.log("Start Recording");
    recMode = true;
    loop();
  }
}
