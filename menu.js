var newLocalGame = game.newTextObject({
	text : 'СНАЙПЕР ДОРОЖКИНА. Уровень 1 "Нью-Йорк после вторжения".  (tap here)',
	x : (gameWidth/2)-550, y : 300,
	color : 'black',
	size : 30
});

var drawMenu = function () {

newLocalGame.draw();
 if (touch.isPeekObject(newLocalGame)) {
	createLocalLevel('level1');
	game.setLoop('game');
	return;
	}
};