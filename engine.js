var pjs = new PointJS('2d', 400, 400); 
pjs.system.initFullPage();

var vector = pjs.vector;
var log = pjs.system.log;
var game = pjs.game;
var point = vector.point;
var size = vector.size;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;
var random = math.random;
var fire;

//управление через тап
var touch = pjs.touchControl; 
touch.initTouchControl();

var width = game.getWH().w;
var height = game.getWH().h;
var gameWidth = width;
var gameHeight = height;