var arrTop = [];
var createLevel = function (object) {
arrTop = [];
var anim = pjs.tiles.newAnimation(object.topFile, 300, 230, 3);

fon = game.newImageObject({
	file: object.fonFile,
	scale: del * 2,
	onload: function () {
	cellObject.setPosition(fon.getPositionC());
	}
});

cell = game.newImageObject({
	file: object.cellFile,
	w: joyRadius, h: joyRadius
});

bullFile = object.bullFile;
succFile = object.succFile;

if (object.bullCount) {
		patron = object.bullCount;
}

OOP.forInt(object.topCount, function () {
	var obj = game.newAnimationObject({
		animation: anim,
		y: random(20, gameHeight), x: random(0, gameWidth * 2),
		w: 300 * del, h: 230 * del,
		fillColor: '#FF0000',
		userData: {
			dx: random(-8, 8, true),
			dy: 0
		}
	});

	obj.setDelay(10 - Math.abs(obj.dx));

	if (obj.dx < 0)
		obj.setFlip(1, 0);

	arrTop.push(obj);
	});

};

var createLocalLevel = function (level) {
	createLevel({
		topCount: 5,
		bullCount: 10,
		fonFile: 'levels/' + level + '/fon.jpg',
		topFile: 'levels/' + level + '/top.png',
		cellFile: 'levels/' + level + '/cell.png',
		bullFile: 'levels/' + level + '/bull.png',
		succFile: 'levels/' + level + '/succes.png'
	});
};

var drawTop = function () {
	OOP.forArr(arrTop, function (el, i, arr) {
		if (!el) return;

		if (!el.dy)
			el.drawFrames(0, 1);
		else {
			el.drawFrame(2);
			el.turn(el.dx);
		}

		if (el.x < -el.w && el.dx < 0)
			el.x = fon.w + el.w;

		if (el.x > fon.w && el.dx > 0)
			el.x = -el.w;

		el.move(point(el.dx, el.dy));

		if (el.y > fon.h && fon.loaded) {
			arr.splice(i, 1);
		}
	});
};

var fireTop = function () {
	OOP.forArr(arrTop, function (el, i, arr) {
		if (!fire) return true;
		if (cellObject.isDynamicInside(el.getDynamicBox())) {
			premia += 1;
			el.dy = 3;
			fire = false;
			fireRect.fillColor = '#FF7575';
		}
	});
};