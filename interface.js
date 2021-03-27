var joyRadius = gameHeight / 4;
var del = gameHeight / 1500; 

var cellObject = game.newBaseObject({
	x: gameWidth / 2, y: gameHeight / 2,
});
var cellObject2 = game.newBaseObject({
	x: gameWidth / 2, y: gameHeight / 2,
});

var cell;

var joy = game.newCircleObject({ //внешний круг джойстика
 x : gameWidth / 2, y : gameHeight / 2,
 radius : 1000,
 //strokeColor : '#FFF000', 
 //strokeWidth : 3
});

var joystic = game.newCircleObject({ //внутренний круг джойстика
 x : gameWidth / 2, y : gameHeight / 2,
 radius : 800,
 //fillColor : '#FFA000',
});

var fireRect = game.newRectObject({
 x: 0, y: 0,
 w: gameWidth, h: gameHeight,
 fillColor: '#F3F5FF'
});

var exit = game.newImageObject({
 file: 'door.png',
 scale: del/2,
 alpha : 0.6
});

var fon;
var pressTime = 0;
var patron = 10;
var premia = 0;
var bullFile;
var succFile;

var drawFon = function () {
	fon.draw();
};

var drawInterface = function () {

joy.setPositionS({ //позиционирование джойстика
	x : (gameWidth/2)-1000,
	y : (gameHeight/2)-1000
});

fireRect.setPositionS(point(0, 0));

var dist = joystic.getDistanceC(joy.getPositionC());

if (touch.isDown() && touch.isInStatic(joy.getStaticBox())) {
	joystic.moveTimeC(touch.getPosition(), 5);
	if (joy.alpha < 0.7)
		joy.alpha += 0.05;
} else {
	joystic.moveTimeC(joy.getPositionC(), 10);
	if (joy.alpha > 0.2)
		joy.alpha -= 0.05;
}

var angle = vector.getAngle2Points(joy.getPositionC(), joystic.getPositionC());
cellObject.setAngle(angle);
cellObject.moveAngle(dist / 30);

joy.draw();
joystic.draw();
cell.draw();

cellObject2.moveTimeC(cellObject.getPosition(), 10);
cell.motionC(cellObject2.getPosition(), size(random(30, 31)/4, random(30, 31)/4), 1); //дыхание
	//cellObject.drawStaticBox();//жёлтый крестик
	//cellObject2.drawStaticBox();//второй жёлтый крестик

OOP.forInt(patron, function (i) { //рисуем патроны
	brush.drawImageS({
		x : 10 + (50 * del) * i, y : gameHeight - 235 * del - 10,
		w : 50 * del, h : 235 * del,
		file: bullFile
	});
});

OOP.forInt(premia, function (i) { //рисуем черепа
	brush.drawImageS({
		x : 10 + (20 + 100 * del) * i, y : 10,
		w : 100 * del, h : 125 * del,
		file: succFile
	});
});

if (touch.isPress() && touch.isInStatic(joystic.getStaticBox()))
	pressTime = game.getTime();

if (touch.isUp())
	if (game.getTime() - pressTime < 100 && patron) {
		fire = true;
		patron -= 1;
		fireRect.fillColor = 'black';
		fireRect.setAlpha(1);
		cellObject2.move(point(0, -50));
		cellObject.move(point(random(-5, 5), random(-5, 5)));
	}


if (fireRect.getAlpha() > 0)
	fireRect.setAlpha(fireRect.getAlpha() - 0.05);
	
fireRect.draw();

exit.setPositionS(point(width-exit.w-10, 10));
exit.draw();


camera.moveTime(vector.pointMinus(cell.getPositionC(), point(gameWidth / 2, gameHeight / 2)), 10);
if (cellObject.x < gameWidth / 2)
	camera.setPosition(point(0, 'none'));
if (cellObject.y < gameHeight / 2)
	camera.setPosition(point('none', 0));
if (cellObject.x > fon.w - gameWidth / 2)
	camera.setPosition(point(fon.w - gameWidth, 'none'));
if (cellObject.y > fon.h - gameHeight / 2)
	camera.setPosition(point('none', fon.h - gameHeight));
if (touch.isPeekObject(exit)) {
	game.setLoop('menu');
	premia = 0;
	return;
}

};