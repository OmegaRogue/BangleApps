const font          = "6x8";
const timeFontSize  = 4;
const dateFontSize  = 3;
const smallFontSize = 2;
const yOffset       = 23;
const xyCenter      = g.getWidth()/2;
const cornerSize    = 14;
const cornerOffset  = 3;
const borderWidth   = 1;
const yposTime      = 27+yOffset;
const yposDate      = 65+yOffset;

const mainColor      = "#26dafd";
const mainColorDark  = "#029dbb";
const mainColorLight = "#8bebfe";

const secondaryColor      = "#df9527";
const secondaryColorDark  = "#8b5c15";
const secondaryColorLight = "#ecc180";

const success        = "#00ff00";
const successDark        = "#090";
const successLight        = "#6f6";

const alert          = "#ff0000";
const alertDark          = "#900";
const alertLight          = "#f66";

const levelColor = (l) => {
  if (Bangle.isCharging()) return success; // "Green"
  if (l >= 50) return successDark; // slightly darker green
  if (l >= 15) return secondaryColor; // "Orange"
  return alert; // "Red"
};

function drawTopLeftCorner(x,y) {
  g.setColor(mainColor);
  var x1 = x-cornerOffset;
  var y1 = y-cornerOffset;
  g.fillRect(x1,y1,x1+cornerSize,y1+cornerSize);
  g.setColor("#000000");
  g.fillRect(x,y,x+cornerSize-cornerOffset,y+cornerSize-cornerOffset);
}
function drawTopRightCorner(x,y) {
  g.setColor(mainColor);
  var x1 = x+cornerOffset;
  var y1 = y-cornerOffset;
  g.fillRect(x1,y1,x1-cornerSize,y1+cornerSize);
  g.setColor("#000000");
  g.fillRect(x,y,x-cornerSize-cornerOffset,y+cornerSize-cornerOffset);
}
function drawBottomLeftCorner(x,y) {
  g.setColor(mainColor);
  var x1 = x-cornerOffset;
  var y1 = y+cornerOffset;
  g.fillRect(x1,y1,x1+cornerSize,y1-cornerSize);
  g.setColor("#000000");
  g.fillRect(x,y,x+cornerSize-cornerOffset,y-cornerSize+cornerOffset);
}
function drawBottomRightCorner(x,y) {
  g.setColor(mainColor);
  var x1 = x+cornerOffset;
  var y1 = y+cornerOffset;
  g.fillRect(x1,y1,x1-cornerSize,y1-cornerSize);
  g.setColor("#000000");
  g.fillRect(x,y,x-cornerSize+cornerOffset,y-cornerSize+cornerOffset);
}

function drawFrame(x1,y1,x2,y2) {
  drawTopLeftCorner(x1,y1);
  drawTopRightCorner(x2,y1);
  drawBottomLeftCorner(x1,y2);
  drawBottomRightCorner(x2,y2);
  g.setColor(mainColorDark);
  g.drawRect(x1,y1,x2,y2);
  g.setColor("#000000");
  g.fillRect(x1+borderWidth,y1+borderWidth,x2-borderWidth,y2-borderWidth);
}
function drawTopFrame(x1,y1,x2,y2) {

  drawBottomLeftCorner(x1,y2);
  drawBottomRightCorner(x2,y2);
  g.setColor(mainColorDark);
  g.drawRect(x1,y1,x2,y2);
  g.setColor("#000000");
  g.fillRect(x1+borderWidth,y1+borderWidth,x2-borderWidth,y2-borderWidth);
}
function drawBottomFrame(x1,y1,x2,y2) {
  drawTopLeftCorner(x1,y1);
  drawTopRightCorner(x2,y1);
  g.setColor(mainColorDark);
  g.drawRect(x1,y1,x2,y2);
  g.setColor("#000000");
  g.fillRect(x1+borderWidth,y1+borderWidth,x2-borderWidth,y2-borderWidth);
}

function getUTCTime(d) {
  return d.toUTCString().split(' ')[4].split(':').map(function(d){return Number(d);});
}





function drawTimeText() {
  g.setFontAlign(0, 0);
  var d = new Date();
  var da = d.toString().split(" ");
  var dutc = getUTCTime(d);

  var time = da[4].split(":");
  var hours = time[0],
      minutes = time[1],
      seconds = time[2];
  g.setColor(mainColor);
  g.setFont(font, timeFontSize);
  g.drawString(`${hours}:${minutes}:${seconds}`, xyCenter, yposTime, true);
  g.setFont(font, smallFontSize);
}
function drawDateText() {
  g.setFontAlign(0, 0);
  var d = new Date();
  g.setFont(font, dateFontSize);
  g.drawString(`${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`, xyCenter, yposDate, true);
}


function drawBattery(x1,y1,x2,y2) {
  const l = E.getBattery(), c = levelColor(l);
  g.setColor(mainColorLight);
  g.fillRect(x1,y1+2,x2-3,y2-2);
  g.clearRect(x1+2,y1+4,x2-5,y2-4);
  g.fillRect(x2-3,y1+10,x2,y2-10);
  g.setColor(c).fillRect(x1+4,y1+6,x1+4+l*((x2-x1)/100),y2-6);
  g.setColor(mainColorLight);
}

function drawClock() {
  // main frame
  drawFrame(3,10+yOffset,g.getWidth()-3,g.getHeight()-3);
  // time frame
  drawTopFrame(20,10+yOffset,220,46+yOffset);
  // date frame
  drawTopFrame(28,46+yOffset,212,46+yOffset+35);

  drawBottomFrame(28,g.getHeight()-38,212,g.getHeight()-3);
  drawBattery(29,g.getHeight()-37,211,g.getHeight()-2);

  // texts
  drawTimeText();
  drawDateText();
}
function updateClock() {
  drawTimeText();
  drawDateText();
}


Bangle.on('lcdPower', function(on) {
  if (on) drawClock();
});
g.clear();

Bangle.loadWidgets();
Bangle.drawWidgets();


drawClock();


setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});

// refesh every 100 milliseconds
setInterval(updateClock, 100);
