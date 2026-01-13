
let rand;
function setup() {
  createCanvas(800, 800);
  stroke(200);
}

function draw() {
  background(39, 150, 210); 
  //  Grid pattern
  for (let i = 0; i < 800; i += 20) {
    for (let j = 0; j < 800; j += 20) {
      rand = random(255);
      fill(rand);
      rect( i+5, j+5, 40, 40 );
      
    }
  }

  // s Body
  fill(120, 23, 23);
  rect(200, 420, 420, 650, 200);

  // Spikes
  fill(255, 0, 0);
  triangle(250, 150, 350, 400, 450, 350);
  triangle(150, 150, 350, 400, 450, 350);
  triangle(200, 380, 350, 300, 450, 350);
  triangle(150, 250, 350, 200, 450, 350);
  triangle(150, 190, 350, 400, 450, 350);
  triangle(250, 100, 370, 600, 450, 350);

  // Inner chest
  fill(212, 189, 61);
  rect(250, 420, 420, 650, 200);

  // Face
  fill(50, 55, 168);
  ellipse(465, 380, 320, 300);
  fill(242, 201, 51);
  ellipse(355, 360, 320, 300);

  // Accessories
  fill(66, 135, 245);
  rect(80, 230, 300, 150, 50);
  fill(212, 89, 61);
  rect(350, 420, 420, 650, 200);
  fill(50, 105, 168);
  rect(470, 500, 100, 100, 20);
  fill(50, 125, 168);
  rect(470, 500, 50, 50, 20);

  // Mouth
  fill(187, 255, 0);
  ellipse(240, 360, 220, 180);

  // Shoulder
  fill(127, 50, 168);
  ellipse(470, 360, 200, 200);
  fill(127, 50, 148);
  ellipse(470, 360, 100, 100);

  // Arm
  fill(168, 50, 255);
  rect(470, 360, 50, 350, 30);

  // Chest details
  fill(50, 155, 168);
  rect(187, 255, 70, 90, 20);
  fill(50, 55, 168);
  rect(167, 345, 40, 70, 40);
  rect(187, 345, 40, 70, 40);
  rect(207, 345, 40, 70, 40);

  
  push(); 
  translate(mouseX - width / 2, mouseY - height / 2);

  // Cheeks
  fill(255, 0, 0);
  ellipse(290, 390, 60, 60);
  ellipse(130, 390, 60, 60);

  // Eyes
  fill(255, 255, 0);
  ellipse(290, 390, 30, 30);
  ellipse(130, 390, 30, 30);

  fill(55, 55, 0);
  ellipse(210, 430, 30, 30);
  pop(); 
}
