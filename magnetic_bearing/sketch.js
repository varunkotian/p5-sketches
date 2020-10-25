let slider;
var angle = 0;
var counter = 1;
let wave = [];
let wavet = [];
let waves = [];
let wavest = [];
let wavess = [];
let wave_h = 50;
let wave_max = 600;
let multi = 1;
let sat = 0.5;

function setup() {
  createCanvas(800, 600);
  slider = createSlider(0, PI * 2, 0, PI / 360);
  slider.position(45, 360);
  slider.style('width', '300px');


}

function draw() {
  console.log(degrees(slider.value()))
  background(220);
  textSize(16);
  noStroke();
  fill(0);
  text('0', 45, 355);
  text('360', 330, 355);
  fill(100)
  textSize(22);
  text('Hit Space to switch between manual and automatic control of slider', 45,450)
  fill(0)
  stroke(0);
  drawBear()  
  line(130,30,180,150)
  line(130,-30,180,-150)
  drawGraph()
  
  
  
  if (theta + PI / 180 > PI * 2) {
    slider.value(0)
    angle = 0
  }
  if (counter == 1){
    angle = angle + 0.5 
    slider.value(radians(angle))
  }
  else{
    angle = degrees(slider.value());
  }
  console.log(wave.length)
  
}

function outColor(n){
  let r = color(220, 0, 0)
  let w = color(255,255,255)
  let b = color(0, 0, 220)
  var m1 = r._array.map(function(item, index) {
  return item - w._array[index];
  })
  var m2 = w._array.map(function(item, index) {
  return item - b._array[index];
  })
  var mm1 = m1.map(function(item, index) {
  return (item * n + w._array[index])*255;
  })
  var mm2 = m2.map(function(item, index) {
  return (item * n + b._array[index])*255;
  })
  
  if (n > 0.5){
    fill(mm1)
  }
  else if (n < 0.5){
    fill(mm2)
  }
  else{
    fill(w)
  }
}

function angleColor(theta) {
  It = (cos(2 * theta) + 1)/2 
  Is = (cos(2*(theta+PI/4))+1)/2
  I = (Is + It)/2
  I = max(sat/2,min(1-sat/2,I));
  outColor(I)
}

function keyPressed() {
  if (keyCode === 32) {
    counter ^= 1;
  }
}




function drawGraph(){
  translate(200,-125)
  theta = slider.value();
  let yt = cos(2*(theta))
  let ys = cos(2*(theta+PI/4))
  y = ys + yt
  y = max(-sat,min(sat,y));
  wave.unshift(y);
  wavet.unshift(yt);
  waves.unshift(ys);
  wavest.unshift(max(-sat,min(sat,yt)));
  wavess.unshift(max(-sat,min(sat,ys)));
  dist = 120
  
  
  stroke(150)
  line(0,0,wave_max/2,0)
  stroke(220,0,0)
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++){    
    vertex(i/2,wave_h*wavet[i]);
  }
  endShape();  
  
  // translate(0,dist)
  stroke(0,0,220)
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++){    
    vertex(i/2,wave_h*waves[i]);
  }
  endShape();
  
  
  textSize(16);
  noStroke();
  fill(220,0,0);
  text('Torque', 320, -30);
  fill(0,0,220);
  text('Stability', 320, -10);
  
  drawColor()
  
  translate(0,dist)  
  stroke(150)
  line(0,0,wave_max/2,0)
  stroke(220,0,0)
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++){    
    vertex(i/2,wave_h*wavest[i]);
  }
  endShape();
  
  // translate(0,dist)  
  stroke(0,0,220)
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++){    
    vertex(i/2,wave_h*wavess[i]);
  }
  endShape();
  
  textSize(16);
  noStroke();
  fill(220,0,0);
  text('Torque after Sat', 280, -30);
  fill(0,0,220);
  text('Stability after Sat', 280, -10);
  
  drawColor()
  
  translate(0,dist)
  stroke(150)
  line(0,0,wave_max/2,0)
  stroke(0)
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++){    
    vertex(i/2,wave_h*wave[i]);
  }
  endShape();
  
  textSize(16);
  noStroke();
  fill(0);
  text('Total', 320, -30);
  
  drawColor()
  
  
  
  if (wave.length > wave_max){
    wave.pop();
    wavet.pop();
    waves.pop();
    wavest.pop();
    wavess.pop();
  }
}






function drawColor(){   
  x=0
  noStroke();
  for (let x = 0; x <= wave_h*2; x=x+10) {
    outColor(x/(wave_h*2))
    rect(-5,x-wave_h-5,5,10)
  }
  stroke(0);
}







function drawBear() {
  let MD = 40
  let OD = 250
  let ID = 200
  let x = 200
  let y = 200
  theta = slider.value();
  translate(x, y)
  rotate(theta)
  noFill()
  circle(0, 0, OD)
  fill(220, 0, 0, 150);
  arc(0, 0, OD, OD, 0, PI / 2);
  arc(0, 0, OD, OD, 2 * PI / 2, 3 * PI / 2);

  fill(0, 0, 220, 150);
  arc(0, 0, OD, OD, PI / 2, 2 * PI / 2);
  arc(0, 0, OD, OD, 3 * PI / 2, 4 * PI / 2);




  rotate(- theta)
  fill(220)
  circle(0, 0, ID)
  PD = (OD + ID) / 4
  t = theta 
  angleColor(t)
  circle(PD, 0, MD);

  angleColor(t + PI / 2)
  circle(0, PD, MD);

  angleColor(t + 2 * PI / 2)
  circle(-PD, 0, MD);

  angleColor(t + 3 * PI / 2)
  circle(0, -PD, MD);

  rotate(-PI / 4 )

  angleColor(t + PI / 4)
  circle(PD, 0, MD);

  angleColor(t + PI / 2 + PI / 4)
  circle(0, PD, MD);

  angleColor(t + 2 * PI / 2 + PI / 4)
  circle(-PD, 0, MD);

  angleColor(t + 3 * PI / 2 + PI / 4)
  circle(0, -PD, MD);
  
  rotate(PI / 4)
}

