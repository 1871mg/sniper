function PointJS(D, w, h, s) { // 2D/TDS/3D, width, height, styleObject
	'use strict';

		var device = window;
		var _PointJS = this;

		var noFunction = function () {
			console.log('function is not supported in this object');
		};

		// settings ///////////////////////////////////////

		var isShowError = true,
		isZBuffer = false,
		isStopForError = true,
		isAutoClear = false,
		isRun = false;

		var width = w,
		height = h,
		origWidth = w,
		origHeight = h,
		width2 = width / 2,
		height2 = height / 2,


		offset = { x : 0, y : 0 },
		angle = 0,
		centerCamera = { x : 0, y : 0 },


		contextSettings = {
			fillStyle : 'black',
			strokeStyle : 'black',
			globalAlpha : 1,
			font : 'sans-serif',
			textBaseline : 'top',
		};

		var log = function (obj) {
			console.log('[PointJS] : ', obj);
		};

		var errorLog = function (e) {
			var stack = decodeURI(e.stack.toString().replace(/(@|[\(\)]|[\w]+:\/\/)/g, ''));
       stack = stack.split(/\n/);
       stack = (stack[2] == '' ? stack[0] : stack[1]).split('/');
       stack = stack[stack.length-1].split(':');
			console.log('ERROR "'+e.toString()+'" \n in      '+stack[0]+' \n line:   '+stack[1]+' \n symbol: '+stack[2]);
		};

		var DEPRECATED = function (f1, f2) {
			log('function "'+f1+'" is DEPRECATED, use a "'+f2+'"');
		};


		// reserved ///////////////////////////////////////////

		this.game = {};
		this.camera = {};
		this.keyControl = {};
		this.mouseControl = {};
		this.touchControl = {};
		this.system = {};
		this.vector = {};
		this.math = {};
		this.colors = {};
		this.brush = {};
		this.audio = {};
		this.wAudio = {};
		this.dialogs = {};
		this.resources = {};
		this.tiles = {};
		this.OOP = {};
		this.GUI = {};

		// end reserved ///////////////////////////////////////




		this.system.log = log;

		this.system.setSettings = function (settings) {
			isShowError = isDef(settings.isShowError) ? settings.isShowError : true;
			isStopForError = isDef(settings.isStopForError) ? settings.isStopForError : true;
			isAutoClear = isDef(settings.isAutoClear) ? settings.isAutoClear : false;
			isZBuffer = isDef(settings.isZBuffer) ? settings.isZBuffer : false;
		};

		this.system.setDefaultSettings = function (obj) {
			for (var i in obj) {
				contextSettings[i] = obj[i];
			}
		};

		// end settings ///////////////////////////////////















// vector ///////////////////////////////////////////

var point = function (x, y) {
	return {
		x : x,
		y : y
	};
};

var size = function (w, h) {
	return {
		w : w,
		h : h
	};
};

var pointPlus = function (p1, p2) {
	return {
		x : p1.x + p2.x,
		y : p1.y + p2.y
	};
};

var pointMinus = function (p1, p2) {
	return {
		x : p1.x - p2.x,
		y : p1.y - p2.y
	};
};

var pointInc = function (p1, p2) {
	return {
		x : p1.x * p2.x,
		y : p1.y * p2.y
	};
};

var pointDiv = function (p1, p2) {
	return {
		x : p1.x / (p2.x != 0 ? p2.x : 1),
		y : p1.y / (p2.y != 0 ? p2.y : 1)
	};
};

var pointAbs = function (p) {
	return {
		x : Math.abs(p.x),
		y : Math.abs(p.y)
	};
};

var getPointAngle = function (p, c, a) {
	if (a != 0) {
		var r = a2r(a);
		var dx = p.x - c.x;
		var dy = p.y - c.y;
		var cos = Math.cos(r);
		var sin = Math.sin(r);
		return point(dx * cos - dy * sin + c.x, dx * sin + dy * cos + c.y);
	} else {
		return point(p.x, p.y);
	}
};

var getAngle2Points = function (p1, p2) {
	return Math.atan2(p2.y-p1.y, p2.x-p1.x) * (180 / Math.PI);
};

var isPointIn = function (point, points) {
	if (points.length < 3) { return false; }
	var intersections_num = 0;
	var prev = points.length - 1;
	var prev_under = points[prev].y < point.y;
	for (var i = 0; i < points.length; ++i)
	{
		var cur_under = points[i].y < point.y;
		var a = pointMinus(points[prev], point);
		var b = pointMinus(points[i], point);
		var t = (a.x*(b.y - a.y) - a.y*(b.x - a.x));
		if (cur_under && !prev_under) {
			if (t > 0) { intersections_num += 1; }
		}
		if (!cur_under && prev_under) {
			if (t < 0) { intersections_num += 1; }
		}
		prev = i;
		prev_under = cur_under;
	}

	return (intersections_num & 1) != 0;
};

var getMidPoint = function (p1, p2) {
	if (!isDef(p2)) return 0;
	return (point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2));
};

var getDistance = function (p1, p2) {
	return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

var isSame = function (p1, p2) {
	if (!isDef(p2)) return false;
	return (p1.x == p2.x && p1.y == p2.y);
};


this.vector.point = point;
this.vector.v2d = point;
this.vector.size = size;
this.vector.w2h = size;
this.vector.getPointAngle = getPointAngle;
this.vector.isPointIn = isPointIn;
this.vector.pointMinus = pointMinus;
this.vector.pointPlus = pointPlus;
this.vector.pointInc = pointInc;
this.vector.pointDiv = pointDiv;
this.vector.pointAbs = pointAbs;
this.vector.getMidPoint = getMidPoint;
this.vector.getDistance = getDistance;
this.vector.isSame = isSame;
this.vector.getAngle2Points = getAngle2Points;


// end vector ///////////////////////////////////////






























		// math /////////////////////////////////////////////

		var toInt = function (n) { // number
			return n >> 0;
		};

		var a2r = function (a) {
			return a * (Math.PI / 180);
		};

		var random = function (min, max, z) {
			var rnd = Math.floor(Math.random() * (max - min + 1) + min);
			return (z && rnd == 0) ? random(min, max, z) : rnd;
		};

		var limit = function (n, m) {
			var signN = n > 0 ? 1 : -1,
			signM = m > 0 ? 1 : -1;
			n = Math.abs(n);
			m = Math.abs(m);
			return n < m ? (n*signN) : (m*signM);
		};

		this.math.limit = limit;
		this.math.a2r = a2r;
		this.math.random = random;
		this.math.toInt = toInt;

		// end math /////////////////////////////////////////



































		// DOM /////////////////////////////////////////////

		var eventCount = 0;

		var dom = {
			loaded : false,

			events : {
				'onload' : {},         // загрузка DOM
				'preLoop' : {},								// перед Engine
				'postLoop' : {},							// после Engine
				'gameBlur' : {},							// при покидании окна игры, расфокусировке
				'gameFocus' : {},						// при фокусировке
				'gameResize' : {}						// при изменении размеров окна
			},

			addEvent : function (evt, key, func) {
				if (evt == 'onload' && dom.loaded) {
					func();
				} else {
					dom.events[evt][key] = func;
				}
			},

			delEvent : function (evt, key) {
				delete dom.events[evt][key];
			},

			runEvent : function (evt) {
				for (var i in dom.events[evt]) {
					if (typeof dom.events[evt][i] == 'function') {
						dom.events[evt][i]();
					}
				}
			},

			attach : function (element) {
				var attach = function () {
					device.document.body.appendChild(element);
				};
				if (dom.loaded) {
					attach();
				} else {
					dom.addEvent('onload', 'attachElement_PointJS'+(eventCount++), attach);
				}
			},

			getWH : function () {
				return {
					w : (parseInt(device.document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(device.document.documentElement.clientWidth):parseInt(screen.width),
					h : (parseInt(device.document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(device.document.documentElement.clientHeight) : parseInt(screen.height)
				};
			}

		};

		this.system.delEvent = function (evt, key) {
			dom.delEvent(evt, key);
		};

		this.system.addEvent = function (evt, key, func) {
			dom.addEvent(evt, key, func);
		};

		this.system.attachDOM = function (element) {
			dom.attach(element);
		};

		this.system.newDOM = function (tag) {
			var element = device.document.createElement(tag);
			element.style.position = 'fixed';
			element.style.left = 0;
			element.style.top = 0;
			element.style.zIndex = canvas.style.zIndex + 1;
			element.style.border = 'none';
			dom.attach(element);
			return element;
		};

		// create canvas

		var canvas = device.document.createElement('canvas');
		canvas.width = parseInt(w);
		canvas.height = parseInt(h);
		canvas.style.position = 'fixed';
		canvas.style.left = 0;
		canvas.style.top = 0;
		canvas.style.zIndex = 1000;
		canvas.id = 'PointJS-canvas_0';

		if (typeof s == 'object') {
			for (var i in s) {
				if (!i.match(/margin|padding|position/))
				canvas.style[i] = s[i];
			}
		}

		dom.attach(canvas);

		dom.addEvent('onload', 'Window_Hide_Scroll', function () {
			device.document.body.style.overflow = 'hidden';
			canvasOffset = {
				x : parseInt(canvas.style.left),
				y : parseInt(canvas.style.top)
			};
		});

		var canvasOffset;

		var context = canvas.getContext('2d');

		this.system.setStyle = function (s) {
			if (typeof s == 'object') {
				for (var i in s) {
					canvas.style[i] = s[i];
				}
			}
		};

		this.system.getContext = function () {
			return context;
		};

		this.system.resize = function (w, h) {
			width = w || origWidth;
			height = h || origHeight;
			width2 = width / 2;
			height2 = height / 2;
			canvas.width = width;
			canvas.height = height;
		};

		this.system.initFullPage = function () {
			dom.addEvent('gameResize', 'PointJS_resizeGame', function () {
				width = dom.getWH().w;
				height = dom.getWH().h;
				width2 = width / 2;
				height2 = height / 2;
				canvas.width = width;
				canvas.height = height;
			});
			dom.runEvent('gameResize', 'PointJS_resizeGame');
		};




		var fullScreen = false;
		var launchFullScreen = function () {
			if (fullScreen) return;
			if(this.requestFullscreen) {
				this.requestFullscreen();
				fullScreen = true;
			} else if(this.mozRequestFullScreen) {
				this.mozRequestFullScreen();
				fullScreen = true;
			} else if(this.webkitRequestFullscreen) {
				this.webkitRequestFullscreen();
				fullScreen = true;
			}
				width = dom.getWH().w;
				height = dom.getWH().h;
				width2 = width / 2;
				height2 = height / 2;
				canvas.width = width;
				canvas.height = height;
		};

		var cancelFullscreen = function () {
			if(device.document.exitFullscreen) {
				device.document.exitFullscreen();
				fullScreen = false;
			} else if(device.document.mozCancelFullScreen) {
				device.document.mozCancelFullScreen();
				fullScreen = false;
			} else if(device.document.webkitExitFullscreen) {
				device.document.webkitExitFullscreen();
				fullScreen = false;
			}
				width = dom.getWH().w;
				height = dom.getWH().h;
				width2 = width / 2;
				height2 = height / 2;
				canvas.width = width;
				canvas.height = height;
		};

		var onfullscreenchange = function(e){
			var isFull = device.document.fullscreenElement || 
			device.document.mozFullScreenElement || device.document.webkitFullscreenElement;
			fullScreen = isSet(isFull);
		}

		// Событие об изменениии режима
		device.document.addEventListener("webkitfullscreenchange", onfullscreenchange);
		device.document.addEventListener("mozfullscreenchange",    onfullscreenchange);
		device.document.addEventListener("fullscreenchange",       onfullscreenchange);

		this.system.initFullScreen = function () {
			device.document.documentElement.onclick = launchFullScreen;
			dom.addEvent('gameResize', 'PointJS_resizeGame', function () {
				width = dom.getWH().w;
				height = dom.getWH().h;
				width2 = width / 2;
				height2 = height / 2;
				canvas.width = width;
				canvas.height = height;
			});
			dom.runEvent('gameResize', 'PointJS_resizeGame');
		};

		this.system.exitFullScreen = function () {
			cancelFullscreen();
			width = origWidth;
			height = origHeight;
			width2 = width / 2;
			height2 = height / 2;
			canvas.width = width;
			canvas.height = height;
		};

		this.system.isFullScreen = function () {
			return fullScreen;
		};

		this.system.exitFullPage = function () {
			width = origWidth;
			height = origHeight;
			width2 = width / 2;
			height2 = height / 2;
			canvas.width = width;
			canvas.height = height;
		};

		this.system.initFullScale = function () {
			canvas.style.width = '100%';
			canvas.style.height = '100%';
		};

		this.system.exitFullScale = function () {
			canvas.style.width = origWidth + 'px';
			canvas.style.height = origHeight + 'px';
		};

		this.system.getWH = function () {
			return dom.getWH();
		};

		// end DOM //////////////////////////////////////////






































		// GUI //////////////////////////////////////////////
		var guiList = [];
		var guiCount = 0;

		var GUIBase = function (tag, obj) { // tag, object
			var dEl = device.document.createElement(tag);
			dEl.style.position = 'fixed';
			dEl.style.zIndex = canvas.style.zIndex+1;
			dEl.style.outline = 'none';
			dEl.style.left = obj.x ? obj.x+'px' : 0;
			dEl.style.top = obj.y ? obj.y+'px' : 0;
			if (obj.w) dEl.style.width = obj.w+'px';
			if (obj.h) dEl.style.height = obj.h+'px';

			dEl.style.backgroundColor = obj.fillColor ? obj.fillColor : '';
			dEl.style.color = obj.color ? obj.color : 'black';
			dEl.style.border = (obj.strokeWidth || 0)+'px solid '+(obj.strokeColor || '');

			dEl.onmousedown = dEl.onmouseup = dEl.onmousemove = dEl.onclick =
			dEl.onkeydown = dEl.onkeypress = dEl.onkeyup = 
			function (e) {
				e.stopPropagation();
			};

			dEl.oncontextmenu = dEl.onselectstart = dEl.ondragstart = function (e) {
				e.stopPropagation();
				return false;
			};

			this.w = obj.w || 0;
			this.h = obj.h || 0;
			this.el = dEl;
			this.id = guiCount++;
			this.visible = true;

			if (obj.events) {
				this.onEvents(obj.events);
			}

			if (obj.style) {
				this.setStyle(obj.style);
			}

			guiList.push(this);
		};

		GUIBase.prototype = {
			// click, mousePress, mouseUp, mouseOver, mouseOut
			onEvents : function (obj) { // function

				if (typeof obj.keyPress == 'function') {
					this.el.onkeypress = function (e) {
						e.stopPropagation();
						var char = false;
						if (e.which != 0 && e.charCode != 0)
							if (e.which >= 32) { char = String.fromCharCode(e.which); }
						return obj.keyPress(char);
					};
				}

				if (typeof obj.change == 'function') {
					this.el.oninput = function (e) {
						e.stopPropagation();
						obj.change();
					};
				}

				if (typeof obj.mouseOver == 'function') {
					this.el.onmouseover = function (e) {
						e.stopPropagation();
						obj.mouseOver();
					};
				}

				if (typeof obj.mouseOut == 'function') {
					this.el.onmouseleave = function (e) {
						e.stopPropagation();
						obj.mouseOut();
					};
				}

				if (typeof obj.click == 'function') {
					this.el.onclick = function (e) {
						e.stopPropagation();
						obj.click();
					};
				}
				
				if (typeof obj.mousePress == 'function') {
					this.el.onmousedown = function (e) {
						e.stopPropagation();
						obj.mousePress();
					};
				}

				if (typeof obj.mouseUp == 'function') {
					this.el.onmouseup = function (e) {
						e.stopPropagation();
						obj.mouseUp();
					};
				}



			},

			getID : function () {
				return this.id;
			},

			move : function (p) {
				this.el.style.left = parseInt(this.el.style.left)+p.x+'px';
				this.el.style.top = parseInt(this.el.style.top)+p.y+'px';
			},

			setPosition : function (p) {
				this.el.style.left = p.x+'px';
				this.el.style.top = p.y+'px';
			},

			setPositionC : function (p) {
				this.el.style.left = p.x-this.w/2+'px';
				this.el.style.top = p.y-this.h/2+'px';
			},

			getPosition : function () {
				return point(parseInt(this.el.style.left), parseInt(this.el.style.top));
			},

			getPositionC : function () {
				return point(parseInt(this.el.style.left)+this.w/2, parseInt(this.el.style.top)+this.h/2);
			},

			setSize : function (s) {
				this.w = s.w;
				this.h = s.h;
				this.el.style.width = s.w+'px';
				this.el.style.height = s.h+'px';				
			},

			getSize : function () {
				return size(this.w, this.h);
			},

			setStyle : function (obj) {
				var i;
				for (i in obj) {
					this.el.style[i] = obj[i];
				}
			},

			setVisible : function (bool) {
				this.visible = bool;
				if (bool) return this.el.style.display = 'block';
				this.el.style.display = 'none';
			},

			isVisible : function () {
				return this.visible;
			},

			setEnabled : function (bool) {
				this.enabled = bool;
				this.el.disabled = !bool;
			},

			setText : function (text) {
				if (this.el.innerHTML) {
					this.el.innerHTML = text;
					this.w = parseInt(this.el.offsetWidth);
					this.h = parseInt(this.el.offsetHeight);
				}

				if (this.el.value)
					this.el.value = text;
			}

		};


		this.GUI.newButton = function (obj) {
			var object = new GUIBase('input', obj);
			object.el.type = 'button';
			object.el.value = obj.text ? obj.text : 'Button '+object.id;

			dom.attach(object.el);

			return object;
		};

		this.GUI.newInput = function (obj) {
			var object = new GUIBase('input', obj);
			object.el.type = 'text';
			object.el.value = obj.text ? obj.text : 'Button '+object.id;
			object.el.oncontextmenu = object.el.onselectstart = object.el.ondragstart = function (e) {  };
			dom.attach(object.el);
			return object;
		};

		this.GUI.newPanel = function (obj) {
			var object = new GUIBase('div', obj);
			object.el.innerHTML = obj.text ? obj.text : 'Panel '+object.id;
			dom.attach(object.el);
			return object;
		};

		this.GUI.newImage = function (obj) {
			var object = new GUIBase('img', obj);
			if (!obj.file) return log('error in GUI.newImage: Where image file?');
			object.el.src = obj.file;
			dom.attach(object.el);
			object.el.onload = function () {
				if (!object.w) object.w = parseInt(this.width);
				if (!object.h) object.h = parseInt(this.height);				
			};
			return object;
		};

		this.GUI.newHTML = function (obj) {
			var object = new GUIBase('div', obj);
			object.el.innerHTML = obj.text ? obj.text.toString() : 'Your HTML Text';

			dom.attach(object.el);
			dom.addEvent('onload', 'getWH_HTMLPanel'+object.id, function () {
				if (!object.w) object.w = parseInt(object.el.offsetWidth);
				if (!object.h) object.h = parseInt(object.el.offsetHeight);
			});
			return object;
		};



		// end GUI //////////////////////////////////////////
























































		// keyControl /////////////////////////////////////

		var keyList = {
			'LEFT'      : 37,
			'RIGHT'     : 39,
			'UP'        : 38,
			'DOWN'      : 40,
			'SPACE'     : 32,
			'CTRL'      : 17,
			'SHIFT'     : 16,
			'ALT'       : 18,
			'ESC'       : 27,
			'ENTER'     : 13,
			'MINUS'     : 189,
			'PLUS'      : 187,
			'CAPS_LOCK' : 20,
			'BACKSPACE' : 8,
			'TAB'       : 9,
			'Q'         : 81,
			'W'         : 87,
			'E'         : 69,
			'R'         : 82,
			'T'         : 84,
			'Y'         : 89,
			'U'         : 85,
			'I'         : 73,
			'O'         : 79,
			'P'         : 80,
			'A'         : 65,
			'S'         : 83,
			'D'         : 68,
			'F'         : 70,
			'G'         : 71,
			'H'         : 72,
			'J'         : 74,
			'K'         : 75,
			'L'         : 76,
			'Z'         : 90,
			'X'         : 88,
			'V'         : 86,
			'B'         : 66,
			'N'         : 78,
			'M'         : 77,
			'0'         : 48,
			'1'         : 49,
			'2'         : 50,
			'3'         : 51,
			'4'         : 52,
			'5'         : 53,
			'6'         : 54,
			'7'         : 55,
			'8'         : 56,
			'C'         : 67,
			'9'         : 57,
/*			'NUM_0'     : 45,
			'NUM_1'     : 35,
			'NUM_2'     : 40,
			'NUM_3'     : 34,
			'NUM_4'     : 37,
			'NUM_5'     : 12,
			'NUM_6'     : 39,
			'NUM_7'     : 36,
			'NUM_8'     : 38,
			'NUM_9'     : 33,
			'NUM_MINUS' : 109,
			'NUM_PLUS'  : 107,
			'NUM_LOCK'  : 144,*/
			'F1'        : 112,
			'F2'        : 113,
			'F3'        : 114,
			'F4'        : 115,
			'F5'        : 116,
			'F6'        : 117,
			'F7'        : 118,
			'F8'        : 119,
			'F9'        : 120,
			'F10'       : 121,
			'F11'       : 122,
			'F12'       : 123
		};

		var codeList = {
			'37'  : 'LEFT',
			'39'  : 'RIGHT',
			'38'  : 'UP',
			'40'  : 'DOWN',
			'32'  : 'SPACE',
			'17'  : 'CTRL',
			'16'  : 'SHIFT',
			'18'  : 'ALT',
			'27'  : 'ESC',
			'13'  : 'ENTER',
			'189' : 'MINUS',
			'187' : 'PLUS',
			'20'  : 'CAPS_LOCK',
			'8'   : 'BACKSPACE',
			'9'   : 'TAB',
			'81'  : 'Q',
			'87'  : 'W',
			'69'  : 'E',
			'82'  : 'R',
			'84'  : 'T',
			'89'  : 'Y',
			'85'  : 'U',
			'73'  : 'I',
			'79'  : 'O',
			'80'  : 'P',
			'65'  : 'A',
			'83'  : 'S',
			'68'  : 'D',
			'70'  : 'F',
			'71'  : 'G',
			'72'  : 'H',
			'74'  : 'J',
			'75'  : 'K',
			'76'  : 'L',
			'90'  : 'Z',
			'88'  : 'X',
			'86'  : 'V',
			'66'  : 'B',
			'78'  : 'N',
			'77'  : 'M',
			'48'  : '0',
			'49'  : '1',
			'50'  : '2',
			'51'  : '3',
			'52'  : '4',
			'53'  : '5',
			'54'  : '6',
			'55'  : '7',
			'56'  : '8',
			'67'  : 'C',
			'57'  : '9',
/*			'45'  : 'NUM_0',
			'35'  : 'NUM_1',
			'40'  : 'NUM_2',
			'34'  : 'NUM_3',
			'37' :   'NUM_4',
			'12'  : 'NUM_5',
			'39'  : 'NUM_6',
			'36'  : 'NUM_7',
			'38'  : 'NUM_8',
			'33'  : 'NUM_9',
			'109' : 'NUM_MINUS',
			'107' : 'NUM_PLUS',
			'144' : 'NUM_LOCK',*/
			'112' : 'F1',
			'113' : 'F2',
			'114' : 'F3',
			'115' : 'F4',
			'116' : 'F5',
			'117' : 'F6',
			'118' : 'F7',
			'119' : 'F8',
			'120' : 'F9',
			'121' : 'F10',
			'122' : 'F11',
			'123' : 'F12'
		};

		var stopInputKeys = {
			'8'   : true,
			'9'   : true,
			'13'  : true,
			'18'  : true,
			'16'  : true,
			'17'  : true,
			'27'  : true,
			'112' : true,
			'113' : true,
			'114' : true,
			'115' : true,
			'116' : true,
			'117' : true,
			'118' : true,
			'119' : true,
			'120' : true,
			'121' : true,
			'122' : true,
			'123' : true
		};

		this.keyControl.getKeyList = function () {
			var i, t = [];
			for (i in keyList) {
				t.push(i);
			}
			return t;
		};

		var arrKeyDown = {},
		arrKeyUp = {},
		arrKeyPress = {},
		inputPressChar = false,
		inputPressKey = false,
		inputMode = false;

		var setKeyDown = function (keyCode) {
			arrKeyDown[keyCode] = true;
		};

		var stopKeyPress = function (keyCode) {
			forEach(arrKeyPress, function (el, i, arr) {
				if (el == 1) arr[i] = 2;
			});
		};

		var clearKeyDown = function (keyCode) {
			arrKeyDown[keyCode] = false;
		};

		var clearAllKey = function () {
			arrKeyUp = {};
		};

		var clearAllKeys = function () {
			arrKeyDown = {};
			arrKeyUp = {};
			arrKeyPress = {};
			inputPressChar = false;
			inputPressKey = false;
		};

		this.keyControl.isDown = function (keyName) {
			return arrKeyDown[keyList[keyName]] == true;
		};

		this.keyControl.isUp = function (keyName) {
			return arrKeyUp[keyList[keyName]] == true;
		};

		this.keyControl.isPress = function (keyName) {
			return arrKeyPress[keyList[keyName]] == 1;
		};

		this.keyControl.getInputChar = function () {
			return inputPressChar;
		};

		this.keyControl.getInputKey = function () {
			return codeList[inputPressKey];
		};

		this.keyControl.setInputMode = function (bool) {
			inputMode = bool;
		};

		this.keyControl.isInputMode = function () {
			return inputMode;
		};

		this.keyControl.exitKeyControl = function () {
			device.onkeydown = function () {  }
			device.onkeypress = function () {  };
			device.onkeyup = function () {  };

			dom.delEvent('postLoop', 'PointJS_clearAllKeyUp');
			arrKeyDown = {};
			arrKeyUp = {};
			arrKeyPress = {};
			inputPressChar = false;
			inputPressKey = false;
			inputMode = false;
		};

		this.keyControl.initKeyControl = function () {

			device.onkeydown = function (e) {
				if (inputMode) {
					inputPressKey = e.keyCode;
					if (stopInputKeys[e.keyCode]) {
						e.preventDefault();
						return false;
					}
					return true;
				}
				e.preventDefault();
				if (arrKeyPress[e.keyCode] != 2) arrKeyPress[e.keyCode] = 1;
				setKeyDown(e.keyCode);
				return false;
			};

			device.onkeypress = function (e) {
				var char = false;
				if (e.which != 0 && e.charCode != 0)
					if (e.which >= 32) { char = String.fromCharCode(e.which); }
				inputPressChar = char;
			};

			device.onkeyup = function (e) {
				e.preventDefault();
				if (arrKeyDown[e.keyCode] == true) { arrKeyUp[e.keyCode] = true; }
				clearKeyDown(e.keyCode);
				delete arrKeyPress[e.keyCode];
				return false;
			};

			dom.addEvent('postLoop', 'PointJS_clearAllKeyUp', function () {
				clearAllKey();
				stopKeyPress();
				inputPressChar = false;
				inputPressKey = false;
			});

			return this;

		};

		// end keyControl /////////////////////////////////

































		// mouseControl ///////////////////////////////////

		var mouse = {
			pos : point(0, 0),
			oldPos : point(0, 0),
			visible : true,
			image : '',
			locked : false,
			speed : point(0, 0),
			moving : false
		};

		var mouseList = {
			'LEFT' : 1,
			'RIGHT' : 3,
			'MIDDLE' : 2
		};

		var mouseDown = {},
		mouseUp = {},
		mousePress = {},
		mouseWheel = 0;

		var clearMouseAction = function () {
			mouseDown = {};
			mouseUp = {};
			mousePress = {};
			mouseWheel = 0;
			mouse.moving = false;
		};

		var stopMousePress = function () {
			forEach(mousePress, function (el, i, arr) {
				if (el == 1)
					arr[i] = 2;
			});
		};

		var getMousePosition = function (abs) {
			var dx = 0,
			dy = 0;
			if (abs) {
				dx = offset.x;
				dy = offset.y;
			}
			return point(dx + mouse.pos.x, dy + mouse.pos.y);
		};

		this.mouseControl.getPosition = function () {
			return getMousePosition(1);
		};

		this.mouseControl.getPositionS = function () {
			return getMousePosition();
		};

		var setMouseImage = function (img) {
			mouse.image = 'url("' + img + '"), auto';
			device.document.body.style.cursor = mouse.image;
		};
		this.mouseControl.setCursorImage = setMouseImage;

		this.mouseControl.setVisible = function (bool) {
			if ((!mouse.visible && !bool) || mouse.visible && bool) return;
			mouse.visible = bool == true;
			device.document.body.style.cursor = mouse.visible ? mouse.image : 'none';
		};

		this.mouseControl.isVisible = function () {
			return mouse.visible;
		};

		this.mouseControl.isDown = function (key) {
			return mouseDown[mouseList[key]];
		};

		this.mouseControl.isUp = function (key) {
			return mouseUp[mouseList[key]];
		};

		this.mouseControl.isPress = function (key) {
			return mousePress[mouseList[key]] == 1;
		};

		this.mouseControl.isMove = function () {
			return mouse.moving;
		};

		this.mouseControl.isInStatic = function (box) {
			var pos = getMousePosition(1);
			return (pos.x >= box.x && pos.x <= box.x + box.w && pos.y >= box.y && pos.y <= box.y + box.h);
		};

		this.mouseControl.isInDynamic = function (box) {
			return isPointIn(getMousePosition(1), box);
		};

		this.mouseControl.isInObject = function (obj) {
			if (!obj.visible) return false;
			if (!obj.angle) {
				return this.isInStatic(obj.getStaticBox());
			} else {
				return this.isInDynamic(obj.getDynamicBox());
			}
		};

		this.mouseControl.isWheel = function (key) {
			return (key == 'UP' && mouseWheel > 0)  || (key == 'DOWN' && mouseWheel < 0)
		};

		var onMouseWheel = function (e) {
			e.preventDefault();
			mouseWheel = ((e.wheelDelta) ? e.wheelDelta : -e.detail);
			return false;
		};

		var clearAllMouseUp = function () {
			mouseUp = {};
		};

		var requestMouseLock = false;

		var onMouseLock = function () {
			if (!requestMouseLock) return;
			if(isDef(device.document.pointerLockElement) || isDef(device.document.mozPointerLockElement))
				{ mouse.locked = true; } else { mouse.locked = false; }
		};

		this.mouseControl.initMouseLock = function () {
			dom.addEvent('onload', 'initPointerLock', function () {
				requestMouseLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || false;
				device.document.exitPointerLock = device.document.exitPointerLock || device.document.mozExitPointerLock || false;

				if ('onpointerlockchange' in device.document) {
					device.document.addEventListener('pointerlockchange', onMouseLock, false);
				} else if ('onmozpointerlockchange' in device.document) {
					device.document.addEventListener('mozpointerlockchange', onMouseLock, false);
				}

				if (!requestMouseLock) return log('error in initMouseLock: not supported');
				if (mouse.locked) return;
				canvas.onclick = requestMouseLock;

			});  
		};

		this.mouseControl.exitMouseLock = function () {
			device.document.exitPointerLock();
			canvas.onclick = function () {  };
			mouse.speed = point(0, 0);
		};

		this.mouseControl.unlockMouse = function () {
			mouse.speed = point(0, 0);
			device.document.exitPointerLock();
		};

		this.mouseControl.isMouseLock = function () {
			return mouse.locked;
		};

		this.mouseControl.getSpeed = function () {
			if (!mouse.speed.x && !mouse.speed.x) {
				mouse.speed.x = mouse.pos.x;
				mouse.speed.y = mouse.pos.y;
				return point();
			}
			var x = mouse.pos.x - mouse.speed.x;
			var y = mouse.pos.y - mouse.speed.y;
			mouse.speed.x = mouse.pos.x;
			mouse.speed.y = mouse.pos.y;
			return point(x, y);
		};

		this.mouseControl.isPeekStatic = function (key, box) {
			if (!this.isPress(key)) return false;
			return (this.isInStatic(box));
		};

		this.mouseControl.isPeekDynamic = function (key, box) {
			if (!this.isPress(key)) return false;
			return (this.isInDynamic(box));
		};

		this.mouseControl.isPeekObject = function (key, obj) {
			if (!this.isPress(key) || !obj.visible) return false;
			return this.isInDynamic(obj.getDynamicBox());
		};

		this.mouseControl.initMouseControl = function () {

			device.onmousemove = function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (mouse.locked) {
					var movementX = e.movementX || e.mozMovementX || 0;
					var movementY = e.movementY || e.mozMovementY || 0;
					mouse.pos.x += movementX;
					mouse.pos.y += movementY;
					return false;
				} else {
					mouse.pos.x = e.pageX-canvasOffset.x;
					mouse.pos.y = e.pageY-canvasOffset.y;
				}

				mouse.moving = true;
				return false;
			};

			device.onmousedown = function (e) {
				e.preventDefault();
				e.stopPropagation();

				if (!e.which && e.button) {
					if (e.button & 1) e.which = 1;
					else if (e.button & 4) e.which = 2;
					else if (e.button & 2) e.which = 3;
				}

				mouseDown[e.which] = true;
				mousePress[e.which] = 1;
			};

			device.onmouseup = function (e) {
				e.preventDefault();
				e.stopPropagation();

				if (!e.which && e.button) {
					if (e.button & 1) e.which = 1;
					else if (e.button & 4) e.which = 2;
					else if (e.button & 2) e.which = 3;
				}

				mouseDown[e.which] = false;
				mouseUp[e.which] = true;
				delete mousePress[e.which];

			};

			device.oncontextmenu = device.onselectstart = device.ondragstart = function () {
				return false;
			};

			device.onmousewheel = onMouseWheel;
			device.addEventListener("DOMMouseScroll", onMouseWheel, false);

			dom.addEvent('postLoop', 'PointJS_clearAllMouseUp', function () {
				clearAllMouseUp();
				stopMousePress();
				mouseWheel = 0;
				mouse.moving = false;
			});

			return this;

		};

		this.mouseControl.exitMouseControl = function () {
			device.onmousemove   = 
			device.onmousedown   =
			device.onmouseup     =
			device.oncontextmenu =
			device.onselectstart =
			device.ondragstart   =
			device.onmousewheel  = function () {  };
			dom.delEvent('postLoop', 'PointJS_clearAllMouseUp');
			clearMouseAction();
		};

		// end mouseControl ///////////////////////////////
































		// touchControl ///////////////////////////////////

		var touch = {
			down : false,
			press : 0,
			up : 0,
			x : 0,
			y : 0,
			fix : point(0, 0),
			contacts : []
		};

		var touchStopPress = function () {
			touch.press = 0;
			touch.up = 0;
		};

		var clearTouchAction = function () {
			touch.down = false;
			touch.press = 0;
			touch.up = 0;
			touch.fix = point(0, 0);
			touch.contacts = [];
			touch.x = 0;
			touch.y = 0;
		};

		this.touchControl.getFixPositionS = function () {
			if (!touch.fix.x && !touch.fix.y) return false;
			return point(touch.fix.x, touch.fix.y);
		};

		this.touchControl.getFixPosition = function () {
			if (!touch.fix.x && !touch.fix.y) return false;
			return point(touch.fix.x + offset.x, touch.fix.y + offset.y);
		};

		this.touchControl.getRun = function () {
			var x = 0, y = 0;
			if (touch.fix.x && touch.fix.x != touch.x) {
				x = touch.x - touch.fix.x;
			}
			if (touch.fix.y && touch.fix.y != touch.y) {
				y = touch.y - touch.fix.y;
			}

			return point(x, y);
		};

		this.touchControl.getVector = function () {
			var x = 0, y = 0;
			if (touch.fix.x && touch.fix.x != touch.x) {
				x = touch.x > touch.fix.x ? 1 : -1;
			}
			if (touch.fix.y && touch.fix.y != touch.y) {
				y = touch.y > touch.fix.y ? 1 : -1;
			}

			return point(x, y);
		};

		this.touchControl.isDown = function () {
			return touch.down;
		};

		this.touchControl.isPress = function () {
			return touch.press == 1;
		};

		this.touchControl.isUp = function () {
			return touch.up == 1;
		};

		this.touchControl.getPosition = function () {
			return point(touch.x + offset.x, touch.y + offset.y);
		};

		this.touchControl.getPositionS = function () {
			return point(touch.x, touch.y);
		};

		this.touchControl.isPeekStatic = function (box) { // staticBox
			if (!this.isPress()) return false;
			return (this.isInStatic(box));
		};

		this.touchControl.isPeekDynamic = function (box) { // dynamicBox
			if (!this.isPress()) return false;
			return (this.isInDynamic(box));
		};

		this.touchControl.isPeekObject = function (obj) {
			if (!this.isPress() || !obj.visible) return false;
			return this.isInDynamic(obj.getDynamicBox());
		};

		this.touchControl.isInStatic = function (box) {
			var pos = this.getPosition();
			return (pos.x >= box.x && pos.x <= box.x + box.w && pos.y >= box.y && pos.y <= box.y + box.h);
		};

		this.touchControl.isInDynamic = function (box) {
			return isPointIn(this.getPosition(), box);
		};

		this.touchControl.isInObject = function (obj) {
			if (!obj.visible) return false;
			if (!obj.angle) {
				return this.isInStatic(obj.getStaticBox());
			} else {
				return this.isInDynamic(obj.getDynamicBox());
			}
		};		

		this.touchControl.isTouchesInDynamic = function (box) {
			if (touch.contacts.length < 1) return false;
			var i;
			for (i = 0; i < touch.contacts.length; i++) {
				if (isPointIn(point(touch.contacts[i].pageX + offset.x, touch.contacts[i].pageY + offset.y), box)) { 
					return true; 
				}
			}

			return false;
		};

		this.touchControl.isTouchesInStatic = function (box) {
			if (touch.contacts.length < 1) return false;
			var i;
			for (i = 0; i < touch.contacts.length; i++) {
				var pos = point(touch.contacts[i].pageX + offset.x, touch.contacts[i].pageY + offset.y);
				if (pos.x >= box.x && pos.x <= box.x + box.w && pos.y >= box.y && pos.y <= box.y + box.h) {
					return true;
				}
			}

			return false;
		};		

		this.touchControl.getTouches = function () {
			if (touch.contacts.length < 1) return false;
			var list = [], i;
			for (i = 0; i < touch.contacts.length; i++) {
				list.push({
					screenX : touch.contacts[i].pageX,
					screenY : touch.contacts[i].pageY,
					x : touch.contacts[i].pageX + offset.x,
					y : touch.contacts[i].pageY + offset.y,
				});
			}

			return list;
		};


		this.touchControl.initTouchControl = function () {

			device.addEventListener('touchstart', function (e) {
				e.preventDefault();
				touch.x = e.targetTouches[0].pageX;
				touch.y = e.targetTouches[0].pageY;
				touch.fix.x = touch.x;
				touch.fix.y = touch.y;
				touch.contacts = e.targetTouches;
				touch.down = true;
				touch.press = 1;
				return false;
			}, true);

			device.addEventListener('touchmove', function (e) {
				e.preventDefault();
				touch.x = e.targetTouches[0].pageX;
				touch.y = e.targetTouches[0].pageY;
				touch.contacts = e.targetTouches;
				return false;
			}, true);

			device.addEventListener('touchend', function (e) {
				e.preventDefault();
				touch.contacts = e.targetTouches;
				touch.fix.x = 0;
				touch.fix.y = 0;
				touch.down = false;
				touch.up = 1;
				return false;
			}, true);



			_PointJS.touchControl.vibrate = function (t) { // t - time mls
				if (device.navigator.vibrate)  						return device.navigator.vibrate(t);
				if (device.navigator.oVibrate) 					 return device.navigator.oVibrate(t);
				if (device.navigator.mozVibrate) 			 return device.navigator.mozVibrate(t);
				if (device.navigator.webkitVibrate)  return device.navigator.webkitVibrate(t);
			};


			dom.addEvent('postLoop', 'PointJS_touchStopPress', function () {
				touchStopPress();
			});


			return this;

		};


		this.touchControl.exitTouchControl = function () {
			device.ontouchstart =
			device.ontouchmove =
			device.ontouchend = function (e) {  };
			dom.delEvent('postLoop', 'PointJS_touchStopPress');
			clearTouchAction();
		};

		// end touchControl ///////////////////////////////


































		// info ///////////////////////////////////////////

		var info = {
			'name' : 'PointJS',
			'desc' : '2D game engine for JavaScript',
			'author' : 'Skaner -> skaner0@yandex.ru'
		};

		this.system.getInfo = function () {
			return info;
		};

		// end info /////////////////////////////////////////




































		// colors ///////////////////////////////////////////

		var color = function (r, g, b, a) {
			return 'rgba('+r+', '+g+', '+b+', '+(a ? a : 1)+')';
		};

		var hex2rgb = function (hex, a) {
			hex = hex[0] == '#' ? hex.substr(1,6) : hex;
			var r = parseInt(hex.substr(0, 2), 16);
			var g = parseInt(hex.substr(2, 2), 16);
			var b = parseInt(hex.substr(4, 2), 16);
			return color(r, g, b, a);
		};

		this.colors.linearGradient = function (type, size, colors) {
			var gr; 

			var cnv = device.document.createElement('canvas');
			cnv.width = size;
			cnv.height = size;
			var ctx = cnv.getContext('2d');

			if (type == 'horizontal')
				gr = ctx.createLinearGradient(0, 0, 0, size);
			else
				gr = ctx.createLinearGradient(0, 0, size, 0);
			
			var step = 1 / (colors.length-1);

			var i, j = 0;
			for (i = 0; i <= 1; i+= step) {
				gr.addColorStop(i, isSet(colors[j]) ? colors[j] : 'rgba(255, 255, 255, 0)');
				j++;
			}

			ctx.fillStyle = gr;
			ctx.fillRect(0, 0, size, size);

			return ctx.createPattern(cnv, 'repeat');
		};


		this.colors.rgb = function (r, g, b) { return color(r, g, b, 1); };
		this.colors.rgba = function (r, g, b, a) { return color(r, g, b, a); };
		this.colors.hex2rgb = function (hex) { return hex2rgb(hex, 1); };
		this.colors.hex2rgba = function (hex, a) { return hex2rgb(hex, a); };
		this.colors.randomColor = function (min, max, a) { return color(random(min, max), random(min, max), random(min, max), a || 1); };



		// end colors ///////////////////////////////////////



































		// OOP ///////////////////////////////////////////////

		var isDef = function (val) {
			if (typeof val == 'undefined' || val == null) return false;
			return true;
		};

		var isSet = function (val) {
			if (!isDef(val) || val === '' || val === 0) return false;
			return true;
		};

		var toString = function (obj, flag) {
			var i, j = 0, val, str = '[';
			for (i in obj) {
				val = obj[i];
				if (typeof val == 'number' && flag) { val = parseInt(val); }
				str += (j > 0 ? ', ' : '') + i + ' : ' + val;
				j++;
			}
			return str + ']';
		};

		var forEach = function (arr, func) {
			var i;
			for (i in arr) { func(arr[i], i, arr); }
		};

		var forArr = function (arr, func) { // only Array!
			if (arr.length == 0) return;
			var i, len;
			for (i = 0, len = arr.length; i < len; i++) { func(arr[i], i, arr); }
		};

		var forInt = function (i, func) {
			var _i;
			for (_i = 0; _i < i; _i++) { func(_i); }
		};

		var forXY = function (i, j, func) {
			var _i, _j;
			for (_j = 0; _j < j; _j++)
				for (_i = 0; _i < i; _i++) { func(_i, _j); }
		};

		var randArrElement = function (arr) {
			return arr[random(0, arr.length)];
		};

		var readJSONSync = function (f) { // file
			var JSONObject = {};
			var getter = new XMLHttpRequest();

			getter.open('GET', f, false);
			getter.send();

			JSONObject = getter.responseText;
			JSONObject = JSON.parse(JSONObject);

			return JSONObject;
		};

		var readJSON = function (f, func) { // file, callback
			var JSONObject = {};
			var getter = new XMLHttpRequest();
			getter.open('GET', f, true);
			resources.add();

			getter.onreadystatechange = function () {
				if (getter.readyState == 4) {
					JSONObject = getter.responseText;
					JSONObject = JSON.parse(JSONObject);
					resources.load();
					func(JSONObject);					
				}
			};
			
			getter.send();
		};

		this.OOP.insertArrElement = function (arr, i) {
			var el = arr[i];
			arr.splice(i, 1);
			return el;
		};

		this.OOP.insertRandArrElement = function (arr) {
			var i = random(0, arr.length-1);
			var el = arr[i];
			arr.splice(i, 1);
			return el;
		};

		this.OOP.drawArr = function (arr) {
			var i, len;
			for (i=0, len=arr.length; i<len; i++) {
				if (!arr[i].isInCamera || !arr[i].draw) continue;
				if (arr[i].isInCamera())
					arr[i].draw();
			}
		};


		this.OOP.readJSON = readJSON;
		this.OOP.toString = toString;
		this.OOP.isDef    = isDef;
		this.OOP.isSet    = isSet;
		this.OOP.forEach  = forEach;
		this.OOP.forInt   = forInt;
		this.OOP.forXY    = forXY;
		this.OOP.forArr   = forArr;

		this.OOP.randArrElement   = randArrElement;
		this.OOP.readJSONSync     = readJSONSync;



		// end OOP ///////////////////////////////////////////



































		// game engine //////////////////////////////////////

		var fps = 60,
		time = 0,
		dt = 0,
		startTime = -1,
		endTime = 0,
		loops = {};

		var setFPS = function (newFps) {
			fps = newFps;
		};

		this.game.setFPS = function (newFps) {
			setFPS(newFps > 0 ? newFps : 60);
		};

		this.game.getFPS = function () {
			return fps;
		};

		this.game.getDT = function (delta) {
			if (!delta) delta = 1000;
			return dt / delta;
		};

		this.game.getTime = function () {
			return time;
		};

		var getRequestAnimationFrame = function () {
			return device.requestAnimationFrame ||
			device.webkitRequestAnimationFrame  ||
			device.mozRequestAnimationFrame     ||
			device.oRequestAnimationFrame       ||
			device.msRequestAnimationFrame      ||
			function (callback) { device.setTimeout(callback, 1000 / fps); };
		};

		var next = getRequestAnimationFrame();

		var preEngine = function () {
			time = Date.now();
			if (isAutoClear) { clearContext(point(0, 0), point(width, height)); }
			dom.runEvent('preLoop');
		};

		var postEngine = function () {
			dom.runEvent('postLoop');
			if (startTime != -1) {
				dt = time - startTime;
			}
			startTime = time;
		};

		var engine = {
			func : function () {
				console.log('please, use a "setLoop" function.');
				next = function () {/* stop engine */ };
			},
			start : false,
			end   : false,
			audio : false,
			fps : false
		};

		var stopLoopAudio = function () {
			if (!engine.audio) return;
			var i;
			for (i in engine.audio) {
				engine.audio[i].stop();
			}
		};

		var playLoopAudio = function () {
			if (!engine.audio) return;
			engine.audio[0].play();
		};

		this.game.newLoop = function (key, func) {
			if (typeof func == 'function') {
				loops[key] = {
					func  : func,
					start : false,
					end   : false,
					audio : false,
					fps : false
				};
			} else {
				stop('error im newLoop: '+func+' is not a function');
			}
		};

		this.game.setLoopSound = function (key, arrAudio) { // key, array audios
			var i;
			if (!loops[key].audio) { loops[key].audio = []; }
			for (i = 0; i < arrAudio.length; i++) {
				arrAudio[i].setNextPlay(arrAudio[i+1 == arrAudio.length ? 0 : i+1]);
				loops[key].audio.push(arrAudio[i]);
			}
		};

		this.game.setLoop = function (key) {
			if (!loops[key]) return stop('setLoop: '+key+' is no a Loop');
			stopLoopAudio();
			clearMouseAction();
			clearAllKeys();
			clearTouchAction();
			setOffset(point(0, 0));
			engine = loops[key];
			playLoopAudio();
		};

		var loop = function () {
			try {
				preEngine();
				engine.func();
				postEngine();
			} catch (e) {
				if (isShowError) errorLog(e);
				if (isStopForError) { 
					if (!isShowError) errorLog(e);
					stop();
				}
			}
			setTimeout(function () {
				next(loop)
			}, 1000 / fps);
		};

		var start = function (fps) {
			if (isRun) return;
			isRun = true;
			setFPS(fps || 60);
			next(loop);
		};

		var stop = function (msg) {
			if (!isRun) return log(isDef(msg) ? msg :'game is stop');
			isRun = false;
			stopLoopAudio();
			next = function () {
				log(isDef(msg) ? msg : 'game is stop');
			};
		};

		var resume = function (msg) {
			if (isRun) return;
			playLoopAudio();
			log(msg || 'game is run');
			next = getRequestAnimationFrame();
			startTime = -1;
			start(fps);
			return;
		};

		this.game.getWH = function () {
			return {
				w : width,
				h : height,
				w2 : width2,
				h2 : height2
			};
		};

		this.game.startLoop = function (l, f) { // loop, fps
			this.setLoop(l);
			this.start(f);
		};

		this.game.start  = start;
		this.game.stop   = stop;
		this.game.resume = resume;

		// end game engine ///////////////////////////////////


































		// object manager ////////////////////////////////////

		var objectList = [];
		var objectCount = 0;

		var drawAllObjects = function () {
			for (var i in objectList) {
				if (typeof objectList[i].draw == 'function') { objectList[i].draw(); }
			}
		};

		var inherit = function (Parent, Child) {
			Child.prototype = Object.create(Parent.prototype);
			Child.prototype.constructor = Child;
		};

		// BaseObject
		var BaseObject = function (obj) {
			this.type = 'BaseObject';
			this.id = objectCount++;
			this.x = obj.x || 0;
			this.y = obj.y || 0;
			this.w = obj.w || 1;
			this.h = obj.h || 1;
			this.fillColor = obj.fillColor || false;
			this.strokeColor = obj.strokeColor || contextSettings.strokeStyle;
			this.strokeWidth = obj.strokeWidth || 0;
			this.angle = obj.angle || 0;
			this.alpha = isDef(obj.alpha) ? obj.alpha : 1;
			this.center = point(0, 0);
			this.box = {
				x : 0, y : 0,
				w : 0, h : 0
			};
			this.visible = isDef(obj.visible) ? obj.visible : true;
			this.flip = point(0, 0);

			this.setShadow(obj);

			if (obj.userData) {
				this.setUserData(obj.userData);
			}

			if (obj.center) {
				this.setCenter(obj.center);
			}

			if (obj.box) {
				this.setBox(obj.box);
			}

			if (obj.position) {
				this.setPositionC(obj.position);
			}

			if (obj.positionC) {
				this.setPositionC(obj.positionC);
			}

			objectList.push(this);
		};

		BaseObject.prototype = {

			getID : function () {
				return this.id;
			},

			getType : function () {
				return this.type;
			},

			setBox : function (obj) {
				if (obj.offset) {
					this.box.x = obj.offset.x || 0;
					this.box.y = obj.offset.y || 0;
				}
				if (obj.size) {
					this.box.w = obj.size.w || 0;
					this.box.h = obj.size.h || 0;
				}
			},

			isArrIntersect : function (arr) { // array of Objects
				var i;
				for (i = 0; i < arr.length; i++) {
					if (arr[i].id != this.id)
					if (this.isIntersect(arr[i])) { return arr[i]; }
				}
				return false;
			},

			isArrInside : function (arr) { // array of Objects
				var i;
				for (i = 0; i < arr.length; i++) {
					if (this.isDynamicInside(arr[i].getDynamicBox())) { return arr[i]; }
				}
				return false;
			},

			getNearest : function (arr) { // array of Objects
				var i = 0,
								id = 0,
								min = false;
				for (i = 0; i < arr.length; i++) {
					if (this.id != arr[i].id) {
						if (min === false) {
							min = this.getDistanceC(arr[i].getPositionC());
							id = i;
						}
						var tmp = this.getDistanceC(arr[i].getPositionC());
						if (tmp < min) {
							min = tmp;
							id = i;
						}
					}
				}
				return arr[id];
			},

			setFlip :function (x, y) {
				this.flip.x = x || 0;
				this.flip.y = y || 0;
			},

			setUserData : function (obj) {
				var i;
				for (i in obj) {
					if (isDef(this[i])) continue;
					this[i] = obj[i];
				}
			},

			setShadow : function (obj) {
				this.shadowColor = obj.shadowColor || false;
				this.shadowBlur = isDef(obj.shadowBlur) ? obj.shadowBlur : 3;
				this.shadowX = obj.shadowX || 0;
				this.shadowY = obj.shadowY || 0;
			},

			getDynamicBox : function () {
				var center = this.getPosition(1);
				if (this.angle == 0) {
					return [
						point(this.x+this.box.x, this.y+this.box.y),
						point(this.x+this.box.x+this.w+this.box.w, this.y+this.box.y),
						point(this.x+this.box.x+this.w+this.box.w, this.y+this.box.y+this.h+this.box.h),
						point(this.x+this.box.x, this.y+this.box.y+this.h+this.box.h),
					];
				}
				return [
					getPointAngle(point(this.x+this.box.x, this.y+this.box.y), center, this.getAngle()),
					getPointAngle(point(this.x+this.box.x+this.w+this.box.w, this.y+this.box.y), center, this.getAngle()),
					getPointAngle(point(this.x+this.box.x+this.w+this.box.w, this.y+this.box.y+this.h+this.box.h), center, this.getAngle()),
					getPointAngle(point(this.x+this.box.x, this.y+this.box.y+this.h+this.box.h), center, this.getAngle())
				];
			},

			isDynamicIntersect : function (box2) {
				if (box2.length < 3) return false;
				var box1 = this.getDynamicBox();
				var i;
				for (i = 0; i < box1.length; i++) { if (isPointIn(box1[i], box2)) { return true; } }
					for (i = 0; i < box2.length; i++) { if (isPointIn(box2[i], box1)) { return true; } }
						return false;
				},

				isIntersect : function (obj) {
					if (!obj.visible) return false;
					return (!this.angle && !obj.angle) ? this.isStaticIntersect(obj.getStaticBox()) : this.isDynamicIntersect(obj.getDynamicBox());
				},

				isDynamicInside : function (box2) {
					if (box2.length < 3) return false;
					var box1 = this.getDynamicBox();
					var i, count = 0;
					for (i = 0; i < box1.length; i++) { if (isPointIn(box1[i], box2)) { count++; } }
						if (count == box1.length) { return true; }
					return false;
				},

				drawDynamicBox : function (c) {
					editContext(this, 1);
					context.shadowColor = 'transparent';
					drawRect(point(this.x+this.box.x, this.y+this.box.y), point(this.w+this.box.w, this.h+this.box.h), false, c || 'yellow', 2);
					drawCenter(point(this.x+this.w/2+this.center.x, this.y+this.h/2+this.center.y), 10, c || 'yellow');
					restoreContext();
				},

				drawStaticBox : function (c) {
					context.shadowColor = 'transparent';
					drawRect(point(this.x+this.box.x, this.y+this.box.y), point(this.w+this.box.w, this.h+this.box.h), false, c || 'yellow', 2);
					drawCenter(point(this.x+this.w/2+this.center.x, this.y+this.h/2+this.center.y), 10, c || 'yellow');
				},

				isStaticIntersect : function (box) {
					return ((this.y+this.box.y+this.h+this.box.h >= box.y) && (this.x+this.box.x+this.w+this.box.w >= box.x)) && ((this.x+this.box.x < box.x+box.w) && (this.y+this.box.y < box.y+box.h));
				},

				getStaticBox : function () {
					return {
						x : this.x+this.box.x,
						y : this.y+this.box.y,
						w : this.w+this.box.w,
						h : this.h+this.box.h
					};
				},

				setAlpha : function (a) {
					if (this.alpha != a)
						this.alpha = a >= 0 ? (a <= 1 ? a : 1) : 0;
				},

				transparent : function (step) {
					this.setAlpha(this.alpha + step);
				},

				getAlpha : function () {
					return this.alpha;
				},

				rotate : function (p) {
					this.setAngle(Math.atan2(p.y-this.getPosition(1).y, p.x-this.getPosition(1).x) * (180 / Math.PI));
				},

				setCenter : function (p) {
					this.center = point(p.x, p.y);
				},

				nullCenter : function (p) {
					if (!p) p = point(0, 0);
					this.center = point(-this.w/2+p.x, -this.h/2+p.y);
				},

				getCenter : function () {
					return point(this.center.x, this.center.y);
				},

				getBox : function () {
					return this.box;
				},

				move : function (p) {
					this.prevPosition = this.getPosition();
					if (p.x != 'none') this.x += p.x;
					if (p.y != 'none') this.y += p.y;
				},

				circling : function (p, r, s) { // point, radius, speed
					if (!isDef(this.circlingAnglePointJS)) { this.circlingAnglePointJS = 0; }
					this.x = p.x + r * Math.cos(a2r(this.circlingAnglePointJS));
					this.y = p.y + r * Math.sin(a2r(this.circlingAnglePointJS));
					this.circlingAnglePointJS = this.circlingAnglePointJS > 360 ? 0 : this.circlingAnglePointJS + s;
				},

				circlingC : function (p, r, s) { // point, radius, speed
					if (!isDef(this.circlingAnglePointJS)) { this.circlingAnglePointJS = 0; }
					this.setPositionC(point(p.x + r * Math.cos(a2r(this.circlingAnglePointJS)), p.y + r * Math.sin(a2r(this.circlingAnglePointJS))));
					this.circlingAnglePointJS = this.circlingAnglePointJS > 360 ? 0 : this.circlingAnglePointJS + s;
				},

				motion : function (p, s, sp) { // point, size, speed
					if (!isDef(this.motionPercentPointJS)) { this.motionPercentPointJS = 0; }
					this.x = p.x + s.w * Math.cos(a2r(this.motionPercentPointJS));
					this.y = p.y + s.h * Math.sin(a2r(this.motionPercentPointJS));
					this.motionPercentPointJS = this.motionPercentPointJS > 360 ? 0 : this.motionPercentPointJS + sp;
				},

				motionC : function (p, s, sp) { // point, size, speed
					if (!isDef(this.motionPercentPointJS)) { this.motionPercentPointJS = 0; }
					this.setPositionC(point(p.x + s.w * Math.cos(a2r(this.motionPercentPointJS)), p.y + s.h * Math.sin(a2r(this.motionPercentPointJS))));
					this.motionPercentPointJS = this.motionPercentPointJS > 360 ? 0 : this.motionPercentPointJS + sp;
				},

				scale : function (s) {
					if (s.w != 'none') this.w += s.w;
					if (s.h != 'none') this.h += s.h;
				},

				scaleC : function (s) {
					this.scale(s);
					this.move(point(-(s.w / 2), -(s.h / 2)));
				},

				getPosition : function (fmt) {
					if (fmt == 1) {
						return point(this.x + (this.w / 2 + this.center.x), this.y + (this.h / 2 + this.center.y));
					} else if (fmt == 2) {
						var p = point(this.x + (this.w / 2), this.y + (this.h / 2));
						if (this.angle) { p = getPointAngle(p, this.getPosition(1), this.angle); }
						return point(p.x, p.y);
					} else { // fmt empty or 0
						return point(this.x, this.y);
					}
				},

				getPositionC : function () {
					return point(this.x + (this.w / 2 + this.center.x), this.y + (this.h / 2 + this.center.y));
				},

				getPositionS : function () {
					return point(this.x + offset.x, this.y + offset.x);
				},

				getPositionCS : function () {
					return point(this.x + (this.w / 2 + this.center.x) + offset.x, this.y + (this.h / 2 + this.center.y) + offset.y);
				},

				setPosition : function (p) {
					if (p.x != 'none') this.x = p.x;
					if (p.y != 'none') this.y = p.y;
				},

				setPositionS : function (p) {
					if (p.x != 'none') this.x = p.x + offset.x;
					if (p.y != 'none') this.y = p.y + offset.y;
				},

				setPositionC : function (p) {
					if (p.x != 'none') this.x = (-(this.w / 2 + this.center.x) + p.x);
					if (p.y != 'none') this.y = (-(this.h / 2 + this.center.y) + p.y);
				},

				setPositionCS : function (p) {
					if (p.x != 'none') this.x = (-(this.w / 2 + this.center.x) + p.x) + offset.x;
					if (p.y != 'none') this.y = (-(this.h / 2 + this.center.y) + p.y) + offset.y;
				},

				getSize : function () {
					return size(this.w, this.h);
				},

				setSize : function (s) {
					if (s.w != 'none') this.w = s.w;
					if (s.h != 'none') this.h = s.h;
				},

				setSizeC : function (s) {
					if (s.w != 'none') {
						this.w = s.w;
						this.move(point(-(s.w / 2), 'none'));					
					}
					if (s.h != 'none') {
						this.h = s.h;
						this.move(point('none', -(s.h / 2)));
					}					
				},

				turn : function(a) {
					this.angle = (this.angle % 360);
					this.angle += a;
				},

				rotateForAngle : function(a, s) { // angle, speed
					var aa = Math.abs(this.angle);
					var aa2 = Math.abs(a);
					if (aa < 90) {
						if (this.angle < a) this.turn(s);
						else this.turn(-s);
					} else {
						if (180 - aa2 <= s*2) this.setAngle(a); 
						if (this.angle < a) this.turn(s);
						else this.turn(-s);
					}

					//if (Math.abs(this.angle - a) < s*2) this.setAngle(a); 
				},

				moveAngle : function (s) {
					this.prevPosition = this.getPosition();
					this.x += s*(Math.cos(a2r(this.angle)));
					this.y += s*(Math.sin(a2r(this.angle)));
				},

				moveTime : function (p, t) {
					t = t || 1;
					var pos = this.getPosition();
					this.move(point((p.x - pos.x) / t,(p.y - pos.y) / t));
				},


				moveTimeC : function (p, t) {
					t = t || 1;
					var pos = this.getPosition(1);
					this.move(point((p.x - pos.x) / t, (p.y - pos.y) / t));
				},

					getAngle : function () {
						return this.angle;
					},

					setAngle : function (a) {
						if (this.angle != a)
							this.angle = a % 360;
					},

					getDistance : function (p) {
						return Math.sqrt( Math.pow(p.x - this.getPosition(2).x, 2) + Math.pow(p.y - this.getPosition(2).y, 2));
					},

					getDistanceC : function (p) {
						return Math.sqrt( Math.pow(p.x - this.getPosition(1).x, 2) + Math.pow(p.y - this.getPosition(1).y, 2));
					},

					setVisible : function (bool) {
						this.visible = bool == true;
					},

					isVisible : function () {
						return this.visible;
					},

					isInCamera : function () {
						return this.angle ? this.isInCameraDynamic() : this.isInCameraStatic();
					},

					isInCameraStatic : function () {
						if (this.x + this.w < offset.x || this.x > offset.x + width) return false;
						if (this.y + this.h < offset.y || this.y > offset.y + height) return false;
						return true;
					},

					isInCameraDynamic : function () {
						var box = this.getDynamicBox();
						var camera = [point(offset.x, offset.y), point(offset.x+width, offset.y),
																				point(offset.x+width, offset.y+height), point(offset.x, offset.y+height)
																			];
						var i, count = 0;
						for (i = 0; i < box.length; i++) { if (isPointIn(box[i], camera)) { count++; } }
						return count  > 0;
					},

					onCollision : function (obj) {
						if (this.isIntersect(obj)) {
							if (!this.prevPosition)
								this.prevPosition = this.getPosition();
							var speedX = Math.abs(this.x - this.prevPosition.x);
							var speedY = Math.abs(this.y - this.prevPosition.y);
							var m = this.getPosition(2);
							var o = obj.getPosition(2);
							if (m.x < o.x)
							 this.move(point(-speedX, false));
							else
								this.move(point(speedX, false));
						}

						if (this.isIntersect(obj)) {
							if (m.y < o.y)
							 this.move(point(false, -speedY));
							else
								this.move(point(false, speedY));
						}
					},

					onArrCollision : function (arr) {
						var i;
						for (i=0; i<arr.length; i++) {
							if (this.id == arr[i].id) continue;
							this.onCollision(arr[i]);
						}
					},

					draw : function () {
						// 0-function
					}


				};

				this.game.newBaseObject = function (obj) {
					return new BaseObject(obj);
				};









		// RectObject
		var RectObject = function (obj) {
			BaseObject.call(this, obj);
			this.type = 'RectObject';
		};
		inherit(BaseObject, RectObject);

		RectObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1) {
				editContext(this);
				ctx = true;
			}
			drawRect(point(this.x, this.y), point(this.w, this.h), this.fillColor, this.strokeColor, this.strokeWidth);
			if (ctx) { restoreContext(); }
		};

		this.game.newRectObject = function (obj) {
			return new RectObject(obj);
		};











		// CircleObject
		var CircleObject = function (obj) {
			BaseObject.call(this, obj);
			this.radius = obj.radius || 5;
			this.w = this.radius * 2;
			this.h = this.radius * 2;
			this.type = 'CircleObject';

			if (obj.positionC) {
				this.setPositionC(obj.positionC);
			}

		};
		inherit(BaseObject, CircleObject);

		CircleObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1) {
				editContext(this);
				ctx = true;
			}
			drawCircle(point(this.x, this.y), this.radius, this.fillColor, this.strokeColor, this.strokeWidth);
			if (ctx) { restoreContext(); }
		};

		CircleObject.prototype.scale = function (s) {
			this.w += s || 0;
			this.h += s || 0;
			this.radius += s ? s / 2 : 0;
		};

		CircleObject.prototype.scaleC = function (s) {
			this.w += s || 0;
			this.h += s || 0;
			this.radius += s ? s / 2 : 0;
			this.move(point(-(s / 2), -(s / 2)));
		};

		CircleObject.prototype.getRadius = function () {
			return this.radius;
		};

		CircleObject.prototype.setRadius = function (r) {
			if (!r || this.radius == r) return;
			this.radius = r;
			this.w = r * 2;
			this.h = r * 2;
		};

		this.game.newCircleObject = function (obj) {
			return new CircleObject(obj);
		};













		// BackgroundObject
		var backgroundList = {};
		var BackgroundObject = function (obj) {
			this.file = obj.file;
			this.w = obj.w;
			this.h = obj.h;
			this.countX = obj.countX;
			this.countY = obj.countY;
			this.fullW = this.countX * this.w;
			this.fullH = this.countY * this.h;
			this.cnv = device.document.createElement('canvas');
			this.cnv.width = this.w;
			this.cnv.height = this.h;
			this.ctx = this.cnv.getContext('2d');
			this.loaded = false;
			this.x = toInt(obj.x);
			this.y = toInt(obj.y);

			var img = device.document.createElement('img');
			var that = this;
			img.onload = function () {
				that.ctx.drawImage(this, 0, 0, that.w, that.h);
				that.loaded = true;
				resources.load();
			};
			img.src = this.file;
			resources.add();
		};

		BackgroundObject.prototype.draw = function () {
			if (!this.loaded) return;
			var dx = -offset.x+this.x;
			var dy = -offset.y+this.y;
			var x, y;
			for (y = 0; y < this.countY; y++) {
				if (y*this.h+this.h < offset.y || y*this.h > offset.y+height) continue;
				for (x = 0; x < this.countX; x++) {
					if (x*this.w+this.w < offset.x || x*this.w > offset.x+width) continue;
					context.drawImage(this.cnv, dx+x*this.w, dy+y*this.h, this.w, this.h);
				}
			}
		};

		BackgroundObject.prototype.getSize = function () {
			if (!this.loaded) return size();
			return size(this.fullW, this.fullH);
		};

		this.game.newBackgroundObject = function (obj) {
			return new BackgroundObject(obj);
		};














		// EllipsObject
		var EllipsObject = function (obj) {
			BaseObject.call(this, obj);
			this.type = 'EllipsObject';
		};
		inherit(BaseObject, EllipsObject);

		EllipsObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			editContext(this);
			drawCircle(point(this.x, this.y), this.h / 2, this.fillColor, this.strokeColor, this.strokeWidth);
			restoreContext();
		};

		this.game.newEllipsObject = function (obj) {
			return new EllipsObject(obj);
		};

















		// TextObject
		var TextObject = function (obj) {
			BaseObject.call(this, obj);
			this.type = 'TextObject';
			this.text  = obj.text  || 'TextObject';
			this.color = obj.color || '';
			this.size  = obj.size  || 10;
			this.font  = obj.font  || 'sans-serif';
			this.style = obj.style || '';
			this.align = 'left';
			this.padding = obj.padding || 2;
			this.w = getTextWidth(this.text, this.style, this.size, this.font) + this.padding*2;
			this.h = this.size + this.padding*2;
			this.strokeColorText = obj.strokeColorText || false;
			this.strokeWidthText = obj.strokeWidthText || false;
			this.textDY = -this.size/7;

			if (obj.positionC) {
				this.setPositionC(obj.positionC);
			}

		};
		inherit(BaseObject, TextObject);

		TextObject.prototype.reStyle = function (obj) {
			this.text  = obj.text  || this.text;
			this.color = obj.color || this.color;
			this.size  = obj.size  || this.size;
			this.font  = obj.font  || this.font;
			this.style = obj.style || this.style;
			this.padding = obj.padding || this.padding;
			this.w = getTextWidth(this.text, this.style, this.size, this.font) + this.padding*2;
			this.h = this.size + this.padding*2;
			this.strokeColorText = obj.strokeColorText || this.strokeColorText;
			this.strokeWidthText = obj.strokeWidthText || this.strokeWidthText;
			this.strokeColor = obj.strokeColor || this.strokeColor;
			this.strokeWidth = obj.strokeWidth || this.strokeWidth;
			this.fillColor = obj.fillColor || this.fillColor;
			this.textDY = -this.size/7;
		};

		TextObject.prototype.setText = function (t) { // text
			if (this.text == t) return;
			this.reStyle({
				text : t
			});
		};

		TextObject.prototype.getText = function () {
			return this.text;
		};

		TextObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1) {
				editContext(this);
				ctx = true;
			}

			if (this.fillColor || this.strokeColor)
				drawRect(point(this.x, this.y), point(this.w, this.h), this.fillColor, this.strokeColor, this.strokeWidth);


			drawText(point(this.x + this.padding, this.textDY + this.y + this.padding),
												this.text,
												this.color,
												this.size,
												this.font,
												this.style,
												this.align,
												this.strokeColorText,
												this.strokeWidthText);

			if (ctx) { restoreContext(); }
		};

		TextObject.prototype.scale = function (s) { // dSize number
			this.reStyle({
				size : this.size + s
			});
		};

		TextObject.prototype.scaleC = function (s) { // dSize number
			this.reStyle({
				size : this.size + s
			});
			this.move(point(-s/2, -s/2));
		};

		TextObject.prototype.setSize = function (s) { // size number
			if (this.size == s) return;
			this.reStyle({
				size : s
			});
		};


		TextObject.prototype.setSizeC = function (s) { // size number
			if (this.size == s) return;
			this.reStyle({
				size : s
			});
			this.move(point(-s/2, -s/2));
		};


		var getTextWidth = function (text, style, size, font) { // text
			var ctx = device.document.createElement('canvas').getContext('2d');
			ctx.font = style  + size + 'px ' + font;
			return ctx.measureText(text).width;
		};

		this.OOP.getTextWidth = function (obj) {
			return getTextWidth(obj.text, obj.style || '', obj.size || 10, obj.font || 'sans-serif');
		};


		this.game.newTextObject = function (obj) {
			return new TextObject(obj);
		};



















		// PolygonObject
		var PolygonObject = function (obj) {
			BaseObject.call(this, obj);
			this.type = 'PolygonObject';
			this.points = [];
			this.dY = 0;
			this.dX = 0;
			var i;
			if (obj.points) {
				for (i in obj.points) {
					this.addPoint(obj.points[i]);
				}
			}

			this.pointColor = obj.pointColor || false;
		};
		inherit(BaseObject, PolygonObject);

		PolygonObject.prototype.addPoint = function (p) {
			this.dX = 0;
			this.dY = 0;
			var i;
			if (this.y + p.y < this.y)  {
				this.dY = Math.abs(this.y + p.y - this.y);
				for (i in this.points) {
					this.points[i].y += this.dY;
				}
			}

			if (this.x + p.x < this.x)  {
				this.dX = Math.abs(this.x + p.x - this.x);
				for (i in this.points) {
					this.points[i].x += this.dX;
				}
			}

			this.points.push( point(p.x + this.dX, p.y + this.dY) );

			this.w = 0;
			this.h = 0;
			for (i in this.points) {
				this.h += this.y + this.points[i].y > this.y + this.h ? this.points[i].y - this.h : 0;
				this.w += this.x + this.points[i].x > this.x + this.w ? this.points[i].x - this.w : 0;
			}
		};

		PolygonObject.prototype.delPoint = function (N) {
			var i, p = this.getPoints();
			this.clearPoints();
			for (i= 0; i < p.length; i++) {
				if (i != N) { this.addPoint(p[i]); }
			}
		};

		PolygonObject.prototype.clearPoints = function () {
			this.points = [];
			this.count = 0;
		};

		PolygonObject.prototype.getPoints = function () {
			return this.points;
		};

		PolygonObject.prototype.getCount = function () {
			return this.points.length;
		};

		PolygonObject.prototype.getPoint = function (N) {
			return this.points[N];
		};

		PolygonObject.prototype.scale = function (s) {
			return;
		};

		PolygonObject.prototype.drawDynamicBox = function (c) {
			var ctx = false;
			if (this.angle || this.alpha != 1) {
				editContext(this);
				ctx = true;
			}
			drawPolygonXY(this.x, this.y, this.points, this.fillColor, c || 'yellow', 2, 'red');
			if (ctx) { restoreContext(); }
		};

		PolygonObject.prototype.getDynamicBox = function () {
			var points = [], i;
			if (!this.angle) {
				for (i in this.points) {
					points.push(pointPlus(this.points[i], point(this.x, this.y)));
				}
			} else {
				var center = this.getPosition(1);
				for (i in this.points) {
					points.push(
																	getPointAngle(pointPlus(this.points[i], point(this.x, this.y)), center, this.getAngle())
																	);
				}
			}
			return points;
		},

		PolygonObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1) {
				editContext(this);
				ctx = true;
			}
			drawPolygonXY(this.x, this.y, this.points, this.fillColor, this.strokeColor, this.strokeWidth, this.pointColor);
			if (ctx) { restoreContext(); }
		};

		this.game.newPolygonObject = function (obj) {
			return new PolygonObject(obj);
		};


















		// ImageObject
		var ImageObject = function (obj) {
			BaseObject.call(this, obj);
			this.type = 'ImageObject';
			if (obj.w) { this.w = obj.w } else { this.w = 0; }
			if (obj.h) { this.h = obj.h } else { this.h = 0; }
			this.loaded = false;
			this.file = '';
			this.forOnLoad = obj.onload || false;
			addImage(obj.file, this, obj.scale || 1);
		};
		inherit(BaseObject, ImageObject);

		ImageObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			if (!this.loaded) return;
			
			var ctx = false;
			if (this.angle || this.alpha != 1 || this.shadowColor) {
				editContext(this);
				ctx = true;
			}

			drawImage(point(this.x, this.y), size(this.w, this.h), this.file);

			if (ctx) { restoreContext(); }
		};

		ImageObject.prototype.simpleDraw = function (p) {
			if (!this.loaded) return;
			var ctx = false;
			if (this.angle || this.alpha != 1) {
				editContext(this);
				ctx = true;
			}
			drawImage(point(p.x, p.y), size(this.w, this.h), this.file);
			if (ctx) { restoreContext(); }
		};

		ImageObject.prototype.setImage = function (f, s) { // file, size
			if (this.file == f) return;
			if (!isDef(imageList[f])) {
				this.loaded = false;
				this.origWidth = 0;
				this.origHeight = 0;
				addImage(f, this);
			} else {
				this.file = f;
			}
		};

		ImageObject.prototype.getImage = function() {
			return this.file;
		};

		this.game.newImageObject = function (obj) {
			return new ImageObject(obj);
		};

















		// AnimationObject
		var AnimationObject = function (obj) {
			BaseObject.call(this, obj);
			this.type = 'AnimationObject';
			this.frame = 0;
			this.anim = obj.animation;
			this.step = obj.delay || 10;
			this.difStep = 0;
			this.toFrameStep = 0;
		};
		inherit(BaseObject, AnimationObject);

		AnimationObject.prototype.draw = function () {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1 || this.flip.x || this.flip.y) {
				editContext(this);
				ctx = true;
			}

			drawAnimation(this.anim, point(this.x, this.y), size(this.w, this.h), this.frame);
			
			if (this.difStep > this.step) {
				this.frame = this.frame < this.anim.r ? this.frame + 1 : 0;
				this.difStep = 0;
			}
			else { this.difStep++; }
			if (ctx) { restoreContext(); }
		};


		AnimationObject.prototype.drawFrames = function (min, max, obj) {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1 || this.flip.x || this.flip.y) {
				editContext(this);
				ctx = true;
			}

			drawAnimation(this.anim, point(this.x, this.y), size(this.w, this.h), this.frame);
			if (this.difStep > this.step) {
				this.frame = this.frame < max ? this.frame + 1 : min;
				this.difStep = 0;
			}
			else { this.difStep++; }
			if (ctx) { restoreContext(); }
		};

		AnimationObject.prototype.drawFrame = function (f) {
			if (!this.visible) return;
			if (!this.alpha) return;
			var ctx = false;
			if (this.angle || this.alpha != 1 || this.flip.x || this.flip.y) {
				editContext(this);
				ctx = true;
			}

			drawAnimation(this.anim, point(this.x, this.y), size(this.w, this.h), f);
			if (ctx) { restoreContext(); }
		};

		AnimationObject.prototype.drawToFrame = function (f) { // to frame
			if (!this.visible) return;
			if (!this.alpha) return;

			if (this.frame < f)
				this.toFrameStep = 1;
			else if (this.frame > f)
				this.toFrameStep = -1;
			else {
				this.drawFrame(f);
				return;
			}

			this.drawFrame(this.frame);

			if (this.difStep > this.step) {
				this.frame = this.frame < this.anim.r ? this.frame + this.toFrameStep : 0;
				this.difStep = 0;
			}
			else { this.difStep++; }
		};

		AnimationObject.prototype.drawReverFrames = function (min, max) { // to frame
			if (!this.visible) return;
			if (!this.alpha) return;

			this.drawFrame(this.frame);

			if (this.difStep > this.step) {

				if (this.frame <= min)
					this.toFrameStep = 1;
				else if (this.frame >= max)
					this.toFrameStep = -1;

				this.frame = this.frame <= this.anim.r ? this.frame + this.toFrameStep : 0;
				this.difStep = 0;
			}
			else { this.difStep++; }



		};

		AnimationObject.prototype.setAnimation = function (t) { // tile 
			this.anim = t;
		};

		AnimationObject.prototype.getAnimation = function() {
			return this.anim;
		};

		AnimationObject.prototype.setDelay = function(d) {
			this.step = d > 0 ? d : this.step;
		};

		AnimationObject.prototype.getDelay = function() {
			return this.step;
		};

		this.game.newAnimationObject = function (obj) {
			return new AnimationObject(obj);
		};





		// end object manager ////////////////////////////////


































		// tiles ///////////////////////////////////////////

		var Image = function (f) { // file
			this.file = f;
			this.loaded = false;
			this.w = 0;
			this.h = 0;
			this.toLoad = [];
			var img = device.document.createElement('img');
			var that = this;
			img.onload = function () {
				that.loaded = true;
				that.w = this.width;
				that.h = this.height;
				that.img = device.document.createElement('canvas');
				that.img.width = this.width;
				that.img.height = this.height;
				that.context = that.img.getContext('2d');
				that.context.drawImage(this, 0, 0);
				if (that.toLoad.length)
					forArr(that.toLoad, function (i) {
						i.func(that.context, i.w, i.h, i.r);
					});
				resources.load();
			};
			img.src = f;
			resources.add();
		};

		Image.prototype.onContext = function(func) {
			if (this.loaded) {
				func(this.context, this.w, this.h, 1);
			} else {
				this.toLoad.push({
					w : this.w,
					h : this.h,
					r : 1,
					func : func
				});
			}
		};



		Image.prototype.getAnimation = function (x, y, w, h, r) { // r - repeat

			var Animation = function (that, x, y, w, h, r) {
				this.image = that;
				this.x = x;
				this.y = y;
				this.w = w;
				this.h = h;
				this.r = r ? r-1 : 0;
			};

			Animation.prototype = {
				onContext : function (func) { // frame, function
					if (this.image.loaded)
						func(this.image.context, this.w, this.h, this.r);
					else
						this.image.toLoad.push({
							w : this.w,
							h : this.h,
							r : this.r,
							func : func
						});
				},

				getImage : function () {
					return this.image;
				},

				getCount : function () {
					return this.r;
				}
			};

			return new Animation(this, x, y, w, h, r);
		};

		var DrawImage = function (w, h) { // file
			this.loaded = true;
			this.w = w;
			this.h = h;
			this.img = device.document.createElement('canvas');
			this.img.width = w;
			this.img.height = h;
			this.context = this.img.getContext('2d');
		};

		DrawImage.prototype.onContext = Image.prototype.onContext;
		DrawImage.prototype.getAnimation = Image.prototype.getAnimation;

		this.tiles.newDrawImage = function (w, h) {
			return new DrawImage(w, h);
		};

		this.tiles.newImage = function (f) {
			return new Image(f);
		};

		this.tiles.newAnimation = function (f, w, h, r) {	// file, width-frame, height-frame, repeats (frames)
			return new Image(f).getAnimation(0, 0, w, h, r);
		};

		var drawAnimation = function (tile, p, s, f) { // tile, pos, size, frame
			if (!tile.image.loaded) return;
			var dx = -offset.x;
			var dy = -offset.y;
			context.drawImage(tile.image.img, tile.x+(tile.w * f), tile.y, tile.w, tile.h, p.x + dx, p.y + dy, s.w, s.h);
		};


		// end tiles ///////////////////////////////////////

































		// image ///////////////////////////////


		var imageList = {};

		var addImage = function (file, obj, scale) {
			if (isDef(imageList[file])) {
				obj.loaded = true;
				obj.file = file;
				if (!obj.w) { obj.w = imageList[file].w * (scale ? scale : 1); }
				if (!obj.h) { obj.h = imageList[file].h * (scale ? scale : 1); }
				return;
			}
			var img = device.document.createElement('img');
			img.onload = function () {
				imageList[file] = {};
				imageList[file].img = this;
				imageList[file].w = this.width;
				imageList[file].h = this.height;

				if (isDef(obj)) {
					obj.loaded = true;
					if (!obj.w) { obj.w = this.width * (scale ? scale : 1); }
					if (!obj.h) { obj.h = this.height * (scale ? scale : 1); }
					obj.file = file;
					if (obj.forOnLoad) {
						obj.forOnLoad();
					}
				}
				resources.load();
			}
			img.src = file;
			resources.add();
		};

		var getImageList = function () {
			return imageList;
		};



		// this.images = {
		// 	getImageList : getImageList
		// };


		var drawImage = function (p, s, img) { // pos, size, img, imgPos, imgSize
			if (!img) return;
			var dx = -offset.x;
			var dy = -offset.y;
			context.drawImage(imageList[img].img, 0, 0, imageList[img].w, imageList[img].h, p.x + dx, p.y + dy, s.w, s.h);
		};



		// end image ///////////////////////////






































		// mesh system ///////////////////////////////////////



		var Mesh = function (obj) {
			this.type = 'Mesh';
			this.objs = [];
			this.x = obj.x || 0;
			this.y = obj.y || 0;
			this.angle = obj.angle || 0;
			this.count = 0;

			if (obj.add) {
				var i;
				for (i in obj.add) {
					this.add(obj.add[i]);
				}
			}

			if (this.angle) { this.setAngle(this.angle); }

		};

		Mesh.prototype = {

			getCount : function () {
				return this.count;
			},

			add : function (obj) {
				this.count++;
				this.objs.push(obj);
				obj.offsetMesh = obj.getPosition(1);
				obj.turn(this.angle);
				obj.setPositionC(point(this.x + obj.offsetMesh.x, this.y + obj.offsetMesh.y));
			},

			del : function (obj) {
				var i;
				for (i in this.objs) {
					if (this.objs[i] == obj) {
						this.objs.splice(i, 1);
						this.count--;
					}
				}
			},

			draw : function (p) {
				var i;
				for (i in this.objs) {
					this.objs[i].draw();
				}
			},

			move : function (p) {
				this.x += p.x || 0;
				this.y += p.y || 0;
				var i, obj;
				for (i in this.objs) {
					obj = this.objs[i];
					obj.setPositionC(point(this.x + obj.offsetMesh.x, this.y + obj.offsetMesh.y));
				}
			},

			turn : function (a) {
				if (a == 0) return;
				this.angle = this.angle % 360;
				this.angle += a;
				var i, obj,
				center = point(this.x, this.y);

				for (i in this.objs) {
					obj = this.objs[i];
					obj.turn(a);
					obj.setPositionC(getPointAngle(point(this.x + obj.offsetMesh.x, this.y + obj.offsetMesh.y), center, this.angle));
				}
			},

			setAngle : function (a) {
				if (a == this.angle) return;
				a = a % 360;
				this.angle = a;
				var i, obj,
				center = point(this.x, this.y);
				for (i in this.objs) {
					obj = this.objs[i];
					obj.setAngle(a);
					obj.setPositionC(getPointAngle(point(this.x + obj.offsetMesh.x, this.y + obj.offsetMesh.y), center, this.angle));
				}
			},

			setPosition : function (p) {
				if (this.x == p.x && this.y == p.y) return;
				this.x = p.x || this.x;
				this.y = p.y || this.y;
				var i, obj;
				for (i in this.objs) {
					obj = this.objs[i];
					if (!this.angle) { obj.setPositionC(point(this.x + obj.offsetMesh.x, this.y + obj.offsetMesh.y)); }
					else { obj.setPositionC(getPointAngle(point(this.x + obj.offsetMesh.x, this.y + obj.offsetMesh.y), point(this.x, this.y), this.angle)); }
				}
			},

			isDynamicIntersect : function (box) {
				if (box.length < 3) return false;
				var i, obj;
				for (i in this.objs) {
					obj = this.objs[i];
					if (obj.isDynamicIntersect(box)) { return obj; }
				}
				return false;
			},

			isStaticIntersect : function (box) {
				var i, obj;
				for (i in this.objs) {
					obj = this.objs[i];
					if (obj.isStaticIntersect(box)) { return obj; }
				}
				return false;
			}


		};

		this.game.newMesh = function (obj) {
			return new Mesh(obj);
		};


		// end mesh system ///////////////////////////////////




































		// camera /////////////////////////////////////////////

		this.camera.circling = function (p, r, s) { // point, radius, speed
			if (!isDef(this.circlingAnglePointJS)) { this.circlingAnglePointJS = s; }
			offset.x = p.x + r * Math.cos(a2r(this.circlingAnglePointJS));
			offset.y = p.y + r * Math.sin(a2r(this.circlingAnglePointJS));
			this.circlingAnglePointJS = this.circlingAnglePointJS >= 360 ? s : this.circlingAnglePointJS + s;
		};

		this.camera.circlingC = function (p, r, s) { // point, radius, speed
			if (!isDef(this.circlingAnglePointJS)) { this.circlingAnglePointJS = s; }
			offset.x = -width2 + p.x + r * Math.cos(a2r(this.circlingAnglePointJS));
			offset.y = -height2 + p.y + r * Math.sin(a2r(this.circlingAnglePointJS));
			this.circlingAnglePointJS = this.circlingAnglePointJS >= 360 ? s : this.circlingAnglePointJS + s;
		};

		this.camera.motion = function (p, s, sp) { // point, size, speed
			if (!isDef(this.motionPercentPointJS)) { this.motionPercentPointJS = s; }
			offset.x = p.x + s.w * Math.cos(a2r(this.motionPercentPointJS));
			offset.y = p.y + s.h * Math.sin(a2r(this.motionPercentPointJS));
			this.motionPercentPointJS = this.motionPercentPointJS >= 360 ? s : this.motionPercentPointJS + sp;
		};

		this.camera.motionC = function (p, s, sp) { // point, size, speed
			if (!isDef(this.motionPercentPointJS)) { this.motionPercentPointJS = s; }
			this.setPositionC(point(p.x + s.w * Math.cos(a2r(this.motionPercentPointJS)), p.y + s.h * Math.sin(a2r(this.motionPercentPointJS))));
			this.motionPercentPointJS = this.motionPercentPointJS >= 360 ? s : this.motionPercentPointJS + sp;
		};

		this.camera.move = function (p) {
			offset.x += p.x || 0;
			offset.y += p.y || 0;
		};

		this.camera.moveTime = function (p, t) {
			t = t || 1;
			var pos = point(offset.x, offset.y);
			this.move(point((p.x - pos.x) / t,(p.y - pos.y) / t));
		};

		this.camera.moveTimeC = function (p, t) {
			t = t || 1;
			var pos = point(offset.x+width2, offset.y+height2);
			this.move(point((p.x - pos.x) / t,(p.y - pos.y) / t));
		};

		this.camera.setPosition = function (p) {
			var dx = p.x != 'none' ? p.x : offset.x;
			var dy = p.y != 'none' ? p.y : offset.y;
			setOffset(point(dx, dy));
		};

		this.camera.setPositionC = function (p) {
			var dx = p.x != 'none' ? p.x - width2 : offset.x;
			var dy = p.y != 'none' ? p.y - height2 : offset.y;
			setOffset(point(dx, dy));
		};

		this.camera.getPosition = function (fmt) { // format
			if (!fmt)
				return point(offset.x, offset.y);
			else
				return point(offset.x+width2, offset.y+height2);
		};

		this.camera.getPositionC = function () {
				return point(offset.x+width2, offset.y+height2);
		};

		this.camera.getStaticBox = function () {
			return {
				x : offset.x,
				y : offset.y,
				w : offset.x + width,
				h : offset.y +  height
			};
		};

		this.camera.getDynamicBox = function () {
			return [
				point(offset.x, offset.y),
				point(offset.x+width, offset.y),
				point(offset.x+width, offset.y+height),
				point(offset.x, offset.y+height),
			];
		};




		// end camera /////////////////////////////////////////

































		// effects ////////////////////////////////////////////











		// end effects ////////////////////////////////////////






























		// 2D /////////////////////////////////////////////////

		var setOffset = function (p) {
			offset = point(p.x, p.y);
		};

		var restoreContext = function (obj) {
			context.restore();
			context.globalAlpha = contextSettings.globalAlpha;
		};

		var editContext = function (obj, box) {
			context.save();

			var p = obj.getPosition(1);
			if (obj.angle) {
				context.translate(-offset.x+p.x, -offset.y+p.y);
				context.rotate(a2r(obj.angle));
				context.translate(-p.x+offset.x, -p.y+offset.y);
			}
			if (obj.alpha != 1) { context.globalAlpha = obj.alpha; }
			if (obj.flip.x || obj.flip.y) {
				context.translate(-offset.x+p.x, -offset.y+p.y);
				context.scale(obj.flip.x ? -1 : 1, obj.flip.y ? -1 : 1); 
				context.translate(-p.x+offset.x, -p.y+offset.y);
			}
			if (obj.shadowColor) {
				context.shadowBlur = obj.shadowBlur;
				context.shadowColor = obj.shadowColor;
				context.shadowOffsetX = obj.shadowX;
				context.shadowOffsetY = obj.shadowY;
			}
			if (obj.type == 'EllipsObject' && !box) {
				var a = obj.w / 2,
								b = obj.h / 2,
								pos = point(-offset.x+obj.x, -offset.y+obj.y);

				context.translate(pos.x, pos.y);
				context.scale(a / b, 1);
				context.translate(-pos.x, -pos.y);
			}

		};

		this.system.setContextSettings = function (obj) {
			context.save();
			for (var i in obj) {
				context[i] = obj[i];
			}
		};

		this.system.defaultSettings = function () {
			restoreContext();
		};

		var clearContext = function (p, s) {
			context.clearRect(p.x, p.y, s.x, s.y);
		};

		this.game.clear = function () {
			clearContext(point(0, 0), point(width, height));
		};

		
		var fillContext = function (c) {
			context.fillStyle = c || 'white';
			context.fillRect(0, 0, width, height);
		};

		this.game.fill = function (c) {
			fillContext(c);
		};


		var drawPoly = function (points, fillColor) {
			if (points.length < 3) return;
			context.fillStyle = fillColor;
			var dx = -offset.x;
			var dy = -offset.y;
			var i;
			context.beginPath();
			context.moveTo(dx + points[0].x, dy + points[0].y);
			for (i =1; i < points.length; i++) {
				context.lineTo(dx + points[i].x, dy + points[i].y);
			}
			context.closePath();
			context.fill();
		};

		var drawPolyXY = function (x, y, points, fillColor) {
			if (points.length < 3) return;
			context.fillStyle = fillColor;
			var dx = -offset.x + x;
			var dy = -offset.y + y;
			var i;
			context.beginPath();
			context.moveTo(dx + points[0].x, dy + points[0].y);
			for (i =1; i < points.length; i++) {
				context.lineTo(dx + points[i].x, dy + points[i].y);
			}
			context.closePath();
			context.fill();
		};

		var drawPolygonXY = function (x, y, points, fillColor, strokeColor, strokeWidth, pointColor) {
			if (points.length < 3) return;
			var i, j;
			if (fillColor) { drawPolyXY(x, y, points, fillColor); }
			for (i = 0; i < points.length; i++) {
				j = (i + 1) < points.length ? (i+1) : 0;
				if (strokeColor) { drawLine(pointPlus(points[i], point(x, y)), pointPlus(points[j], point(x, y)), strokeColor, strokeWidth); }
				if (pointColor) { drawPoint(pointPlus(points[i], point(x, y)), pointColor); }
			}
		};

		var drawPolygon = function (points, fillColor, strokeColor, strokeWidth, pointColor) {
			if (points.length < 3) return;
			var i, j;
			if (fillColor) { drawPoly(points, fillColor); }
			for (i = 0; i < points.length; i++) {
				j = (i + 1) < points.length ? (i+1) : 0;
				if (strokeColor) { drawLine(points[i], points[j], strokeColor, strokeWidth); }
				if (pointColor) { drawPoint(points[i], pointColor); }
			}
		};
		this.brush.drawPolygon = function (obj) {
			drawPolygon(
															obj.points || [],
															obj.fillColor || false,
															obj.strokeColor || false,
															obj.strokeWidth || 1,
															obj.pointColor || false
															);
		};

		var drawText = function (p, text, color, size, font, style, align, strokeColor, strokeWidth) {
			context.textAlign = align;
			context.lineWidth = strokeWidth;
			context.font = (style ? (style + ' ') : '') + size + 'px ' + font;
			var dx = -offset.x;
			var dy = -offset.y;
			if (color) {
				context.fillStyle = color;
				context.fillText(text, dx + p.x, dy + p.y);
			}
			if (strokeColor) {
				context.strokeStyle = strokeColor;
				context.strokeText(text, dx + p.x, dy + p.y);
			}
		};
		this.brush.drawText = function (obj) {
			drawText(point(obj.x || 0, obj.y || 0),
												obj.text,
												obj.color || false,
												obj.size  || 10,
												obj.font  || contextSettings.font,
												obj.style || false,
												obj.align || 'left',
												obj.strokeColorText || false,
												obj.strokeWidthText || 2);
		};
		this.brush.drawTextS = function (obj) {
			drawText(point((obj.x || 0)+offset.x, (obj.y || 0)+offset.y),
												obj.text,
												obj.color || contextSettings.fillStyle,
												obj.size  || 10,
												obj.font  || contextSettings.font,
												obj.style || false,
												obj.align || 'left',
												obj.strokeColor || false,
												obj.strokeWidth || 2);
		};
		this.brush.drawTextLines = function (obj) {
			if (!obj.lines) return;
			var i;
			for (i = 0; i < obj.lines.length; i++) {
				drawText(point(obj.x, obj.y + (obj.size * i)),
													obj.lines[i],
													obj.color || contextSettings.fillStyle,
													obj.size  || 10,
													obj.font  || contextSettings.font,
													obj.style || false,
													obj.align || 'left',
													obj.strokeColor || false,
													obj.strokeWidth || 2);
			}
		};
		this.brush.drawTextLinesS = function (obj) {
			if (!obj.lines) return;
			var i;
			for (i = 0; i < obj.lines.length; i++) {
				drawText(point(obj.x+offset.x, obj.y+offset.y + (obj.size * i)),
													obj.lines[i],
													obj.color || contextSettings.fillStyle,
													obj.size  || 10,
													obj.font  || contextSettings.font,
													obj.style || false,
													obj.align || 'left',
													obj.strokeColor || false,
													obj.strokeWidth || 2);
			}
		};

		var drawCenter = function (p, s, c) { // pos, size, color
			drawLine(point(p.x-s, p.y), point(p.x+s, p.y), c, 2);
			drawLine(point(p.x, p.y-s), point(p.x, p.y+s), c, 2);
		};

		var drawRect = function (p, s, fillColor, strokeColor, strokeWidth) {
			context.fillStyle = fillColor;
			context.strokeStyle = strokeColor;
			context.lineWidth = strokeWidth;
			var dx = -offset.x+(strokeWidth ? strokeWidth / 2 : 0);
			var dy = -offset.y+(strokeWidth ? strokeWidth / 2 : 0);
			if (fillColor) { context.fillRect(p.x + dx, p.y + dy, s.x, s.y); }
			if (strokeWidth) { context.strokeRect(p.x + dx, p.y + dy, s.x, s.y); }
		};
		this.brush.drawRect = function (obj) {
			drawRect(point(obj.x, obj.y),
												point(obj.w, obj.h),
												obj.fillColor || false,
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || false);
		};
		this.brush.drawRectS = function (obj) {
			drawRect(point(obj.x+offset.x, obj.y+offset.y),
												point(obj.w, obj.h),
												obj.fillColor || false,
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || false);
		};

		var drawPoint = function (p, fillColor) {
			context.fillStyle = fillColor;
			if (fillColor) { context.fillRect(-offset.x+p.x-1, -offset.y+p.y-1, 2, 2); }
		};
		this.brush.drawPoint = function (obj) {
			drawPoint(point(obj.x, obj.y),
													obj.fillColor || false)
		};
		this.brush.drawPointS = function (obj) {
			drawPoint(point(obj.x+offset.x, obj.y+offset.y),
													obj.fillColor || false)
		};

		var drawCircle = function (p, r, fillColor, strokeColor, strokeWidth) {
			context.fillStyle = fillColor;
			context.strokeStyle = strokeColor;
			context.lineWidth = strokeWidth;
			var dx = -offset.x + r + (strokeWidth ? strokeWidth / 2 : 0);
			var dy = -offset.y + r + (strokeWidth ? strokeWidth / 2 : 0);
			context.beginPath();
			context.arc(p.x + dx, p.y + dy, r, 0, Math.PI * 2, true);
			context.closePath();
			if (fillColor) { context.fill(); }
			if (strokeWidth) { context.stroke(); }
		};
		this.brush.drawCircle = function (obj) {
			drawCircle(point(obj.x, obj.y),
														obj.radius,
														obj.fillColor || false,
														obj.strokeColor || contextSettings.strokeStyle,
														obj.strokeWidth || false);
		};
		this.brush.drawCircleS = function (obj) {
			drawCircle(point(obj.x+offset.x, obj.y+offset.y),
														obj.radius,
														obj.fillColor || false,
														obj.strokeColor || contextSettings.strokeStyle,
														obj.strokeWidth || false);
		};

		var drawLine = function (p1, p2, strokeColor, strokeWidth) {
			context.strokeStyle = strokeColor;
			context.lineWidth = strokeWidth;
			var dx = -offset.x;
			var dy = -offset.y;
			context.beginPath();
			context.moveTo(dx+p1.x, dy+p1.y);
			context.lineTo(dx+p2.x, dy+p2.y);
			context.closePath();
			context.stroke();
		};
		this.brush.drawLineAngle = function (obj) {
			var pos = getPointAngle(point(obj.x + obj.length, obj.y), point(obj.x, obj.y), obj.angle);
			drawLine(point(obj.x, obj.y),
												point(pos.x, pos.y),
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || 1);
		};
		this.brush.drawLineAngleS = function (obj) {
			var pos = getPointAngle(point(offset.x+obj.x + obj.length, offset.y+obj.y), point(offset.x+obj.x, offset.y+obj.y), obj.angle);
			drawLine(point(offset.x+obj.x, offset.y+obj.y),
												point(pos.x, pos.y),
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || 1);
		};
		this.brush.drawLine = function (obj) {
			drawLine(point(obj.x1, obj.y1),
												point(obj.x1+obj.x2, obj.y1+obj.y2),
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || 1);
		};
		this.brush.drawLineS = function (obj) {
			drawLine(point(offset.x+obj.x1, offset.y+obj.y1),
												point(offset.x+obj.x2, offset.y+obj.y2),
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || 1);
		};

		this.brush.drawLineA = function (obj) {
			drawLine(point(obj.x1, obj.y1),
												point(obj.x2, obj.y2),
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || 1);
		};
		this.brush.drawLineAS = function (obj) {
			drawLine(point(obj.x1+offset.x, obj.y1+offset.y),
												point(obj.x2+offset.x, obj.y2+offset.y),
												obj.strokeColor || contextSettings.strokeStyle,
												obj.strokeWidth || 1);
		};

		this.brush.drawEllips = function (obj) {
			var a = obj.w / 2,
							b = obj.h / 2,
							pos = point(-offset.x+obj.x, -offset.y+obj.y);

			context.save();
			context.translate(pos.x, pos.y);
			context.scale(a / b, 1);
			context.translate(-pos.x, -pos.y);

			drawCircle(point(obj.x, obj.y), b, obj.fillColor, obj.strokeColor, obj.strokeWidth);

			context.restore();
		};

		this.brush.drawEllipsS = function (obj) {
			var a = obj.w / 2,
							b = obj.h / 2,
							pos = point(obj.x, obj.y);

			context.save();
			context.translate(pos.x, pos.y);
			context.scale(a / b, 1);
			context.translate(-pos.x, -pos.y);

			drawCircle(point(offset.x+obj.x, offset.y+obj.y), b, obj.fillColor, obj.strokeColor, obj.strokeWidth);

			context.restore();
		};

		this.brush.drawImageS = function (obj) {
			if (!obj.file) return;

			if (isDef(imageList[obj.file])) {
				if (!imageList[obj.file].loaded) return;
				var x = obj.x || 0;
				var y = obj.y || 0;
				var w = obj.w || imageList[obj.file].w;
				var h = obj.h || imageList[obj.file].h;
				if (obj.scale) {
					w *= obj.scale;
					h *= obj.scale;
				}
				context.drawImage(imageList[obj.file].img, 0, 0, imageList[obj.file].w, imageList[obj.file].h, x, y, w, h);
				return;
			}

			imageList[obj.file] = {};
			imageList[obj.file].loaded = false;
			var img = device.document.createElement('img');
			img.onload = function () {
				imageList[obj.file].loaded = true;
				imageList[obj.file].img = this;
				imageList[obj.file].w = this.width;
				imageList[obj.file].h = this.height;
				resources.load();
			}
			img.src = obj.file;
			resources.add();			
		};

		this.brush.drawImage = function (obj) {
			if (!obj.file) return;

			if (isDef(imageList[obj.file])) {
				if (!imageList[obj.file].loaded) return;
				var x = obj.x || 0;
				var y = obj.y || 0;
				var w = obj.w || imageList[obj.file].w;
				var h = obj.h || imageList[obj.file].h;
				if (obj.scale) {
					w *= obj.scale;
					h *= obj.scale;
				}
				context.drawImage(imageList[obj.file].img, 0, 0, imageList[obj.file].w, imageList[obj.file].h, -offset.x+x, -offset.y+y, w, h);
				return;
			}

			imageList[obj.file] = {};
			imageList[obj.file].loaded = false;
			var img = device.document.createElement('img');
			img.onload = function () {
				imageList[obj.file].loaded = true;
				imageList[obj.file].img = this;
				imageList[obj.file].w = this.width;
				imageList[obj.file].h = this.height;
				resources.load();
			}
			img.src = obj.file;
			resources.add();			
		};




		var getPixelColor = function (x, y) {
			var pixel = context.getImageData(x, y, 1, 1).data;
			return 'rgb('+pixel[0]+', '+pixel[1]+', '+pixel[2]+')';
		};

		var setPixelColor = function (x, y, pixel) {
			var data = context.createImageData(1, 1);
			data.data[0] = pixel.r || data.data[0];
			data.data[1] =  pixel.g || data.data[1];
			data.data[2] = pixel.b || data.data[2];
			data.data[3] = pixel.a || 255;
			context.putImageData(data, x, y);
		};

		var onPixel = function (x, y, func) { // function (pixel)
			var data = context.getImageData(x, y, 1, 1);
			var pixel = {
				r : data.data[0],
				g : data.data[1],
				b : data.data[2],
				a : data.data[3] ? data.data[3] : 255
			};
			func(pixel);
			data.data[0] = pixel.r;
			data.data[1] = pixel.g;
			data.data[2] = pixel.b;
			data.data[3] = pixel.a;
			context.putImageData(data, x, y);
		};

		var onPixels = function (x, y, w, h, func) { // function (pixel)
			var data = context.getImageData(x, y, w, h);
			var i, len;
			for (i = 0, len = data.data.length; i < len; i+=4) {
				var pixel = {
					r : data.data[i],
					g : data.data[i+1],
					b : data.data[i+2],
					a : data.data[i+3] ? data.data[i+3] : 255
				};
				func(pixel);
				data.data[i] = pixel.r;
				data.data[i + 1] = pixel.g;
				data.data[i + 2] = pixel.b;
				data.data[i + 3] = pixel.a;
			}

			context.putImageData(data, x, y);
		};

		var onRawPixels = function (x, y, w, h, func) { // function (pixel)
			var data = context.getImageData(x, y, w, h);
			func(data.data, data.data.length); // data, count
			context.putImageData(data, x, y);
		};

		this.brush.getPixelColor = getPixelColor;
		this.brush.setPixelColor = setPixelColor;
		this.brush.onPixel = onPixel;
		this.brush.onPixels = onPixels;
		this.brush.onRawPixels = onRawPixels;

		// end 2D /////////////////////////////////////////////































		// web audio ////////////////////////////////////////////

		var wAudioList = {};

		var wAContext = device.AudioContext || device.webkitAudioContext || false;
		wAContext = wAContext ? new wAContext() : false;

		if (wAContext) {
			wAContext.listener.setPosition(0, 0, 0);
		}

		var WAudio = function (f, v) { // file, volume
			if (!wAContext) log('module "wAudio" is not supported! use a "audio"');

			this.vol = (v && v <= 1 && v > 0) ? v : 1;
			this.playing = false;
			this.loaded = false;
			this.nextPlay = false;
			this.loadPLay = false;

			this.startTime = 0;
			this.duration = 0;
			this.pausedTime = 0;

			var that = this;

				var xhr = new XMLHttpRequest();
				xhr.open('GET', f, true);
				xhr.responseType = 'arraybuffer';
				xhr.onload = function(e) {
						wAContext.decodeAudioData(this.response, function(decodedArrayBuffer) {
							that.wABuffer = decodedArrayBuffer;
							that.duration = that.wABuffer.duration;
							that.wAGain = wAContext.createGain();
							that.wAGain.gain.value = that.vol;
							that.wAPanner = wAContext.createPanner();
							that.wAPanner.setPosition(0, 0, 1);
							that.wAPanner.panningModel = "equalpower";
							resources.load();
							that.loaded = true;
							if (that.loadPlay) { that.replay(); }
						}, function(e) { log('error in wAudio.newAudio: error decoding file', e); });
					};
					if (f) { xhr.send(); } else {
						log('error in wAudio.newAudio: Where is file?');
					}

				resources.add();

		};

		WAudio.prototype.play = function (v) {
			if (!this.loaded) { this.loadPlay = true; return; }
			if (this.playing) return;
			this.playing = true;
			this.wASource = wAContext.createBufferSource();
			this.wASource.buffer = this.wABuffer;
			this.wAListener = wAContext.destination;
			this.wASource.connect(this.wAGain);
			this.wAGain.connect(this.wAPanner);
			this.wAPanner.connect(this.wAListener);
			this.wASource.start(0, this.pausedTime, this.duration);

			this.startTime = wAContext.currentTime;

			var that = this;
			this.wASource.onended = function () {
				that.playing = false;
				that.startTime = 0;
				that.pausedTime = 0;
				if (that.nextPlay) {
					that.nextPlay.replay();
				}
			};

		};

		WAudio.prototype.replay = function (v) {
			if (!this.loaded) { this.loadPlay = true; return; }
			this.stop();
			this.play();
		};

		WAudio.prototype.stop = function () {
			this.pause();
			this.startTime = 0;
			this.pausedTime = 0;
		};

		WAudio.prototype.pause = function () {
			if (!this.playing) return;
			this.pausedTime = this.getProgress();
			this.playing = false;
			this.wASource.stop(0);
			var that = this;
			this.wASource.onended = function () {
				that.playing = false;
			};
		};

		WAudio.prototype.getProgress = function () {
			if (!this.playing) return this.pausedTime;
			return wAContext.currentTime - this.startTime + this.pausedTime;
		};

		WAudio.prototype.playPause = function () {
			if (!this.playing) this.play();
			else this.pause();
		};

		WAudio.prototype.setNextPlay = function (a) {
			this.nextPlay = a;
		};

		WAudio.prototype.setVolume = function (v) {
			this.vol = (v && v <= 1 && v > 0) ? v : this.vol;
			this.wAGain.gain.value = this.vol;
		};

		WAudio.prototype.getVolume = function () {
			return this.vol;
		};

		WAudio.prototype.setSide = function (s) { // side -1 .. 0 .. 1
			this.side = s;
			if (!this.wAPanner) return;
			this.wAPanner.setPosition(this.side, 0, 1 - Math.abs(this.side));
		};

		WAudio.prototype.getSide = function () {
			return this.side;
		};


		this.wAudio.newAudio = function (f, v) {
			return new WAudio(f, v);
		};

		// end web audio ////////////////////////////////////////




































		// audio ////////////////////////////////////////////

		var audioList = {};


		var Audio = function (f, v) { // file, volume
			var i, len;
			var audio = device.document.createElement('audio');
			if (typeof f == 'string') {
				var source = device.document.createElement('source');
				source.src = f;
				audio.appendChild(source);
			} else {
				for (i = 0, len = f.length; i < len; i++) {
					var source = device.document.createElement('source');
					source.src = f[i];
					audio.appendChild(source);
				}
			}
			this.vol = (v && v <= 1 && v > 0) ? v : 1;
			this.playing = 0;
			this.audio = audio;
			this.loaded = false;
			this.nextPlay = false;

			this.audio.volume = this.vol;

			var that = this;

			this.audio.onloadeddata = function () {
				that.loaded = true;
				resources.load();
			};

			this.audio.onended = function () {
				var i;
				that.playing = false;
				if (that.nextPlay) { that.nextPlay.play(); }
			};

			this.audio.load();
			resources.add();
};

		Audio.prototype.play = function (v) {
			if (this.playing) return;
			if (v) {
				this.vol = (v && v <= 1 && v > 0) ? v : this.vol;
				this.audio.volume = this.vol;
			}
			this.playing = true;
			this.audio.play();
		};

		Audio.prototype.replay = function (v) {
			if (v) {
				this.setVolume(v);
			}
			this.playing = true;
			this.audio.currentTime = 0;
			this.audio.play();
		};

		Audio.prototype.stop = function () {
			if (!this.playing) return;
			this.playing = false;
			this.audio.pause();
			this.audio.currentTime = 0;
		};

		Audio.prototype.pause = function () {
			if (!this.playing) return;
			this.playing = false;
			this.audio.pause();
		};

		Audio.prototype.playPause = function () {
			if (!this.playing) this.play();
			else this.pause();
		};

		Audio.prototype.setNextPlay = function (a) {
			this.nextPlay = a;
		};

		Audio.prototype.setVolume = function (v) {
			this.vol = (v && v <= 1 && v > 0) ? v : this.vol;
			this.audio.volume = this.vol;
		};

		Audio.prototype.getVolume = function () {
			return this.vol;
		};

		this.audio.newAudio = function (f, v) {
			return new Audio(f, v);
		};

		// end audio ////////////////////////////////////////




































		// dialogs //////////////////////////////////////////

		var openTouchLine = function (obj, objB, func) { // настройки, обработка результата

			_PointJS.game.stop();

			_PointJS.touchControl.exitTouchControl();

			var area = device.document.createElement('input');
			area.type = 'text';
			area.style.position = 'fixed';
			area.style.border = 'none';
			area.style.zIndex = canvas.style.zIndex + 1;
			area.style.outline = 'none';
			area.style.backgroundColor = obj.fillColor || 'white';
			area.style.color = obj.color || 'black';
			area.style.top = (obj.y ? toInt(obj.y) : 0) + 'px';
			area.style.left = (obj.x ? toInt(obj.x) : 0) + 'px';
			area.style.width = (obj.w ? toInt(obj.w) : 0) + 'px';
			area.style.fontSize = (obj.size ? toInt(obj.size) : 10) + 'px';


			var button = device.document.createElement('div');
			button.style.padding = (objB.padding || 10) + 'px'; 
			button.align = 'center';
			button.style.position = 'fixed';
			button.style.border = 'none';
			button.style.zIndex = canvas.style.zIndex + 1;
			button.style.backgroundColor = objB.fillColor || 'white';
			button.style.color = objB.color || 'black';
			button.innerHTML = objB.text || 'OK';
			button.style.top = (objB.y ? toInt(objB.y) : 0) + 'px';
			button.style.left = (objB.x ? toInt(objB.x) : 0) + 'px';

			if (objB.w) button.style.width = toInt(objB.w) + 'px';
			if (objB.h) button.style.height = toInt(objB.h) + 'px';
			button.style.fontSize = (objB.size ? toInt(objB.size) : 10) + 'px';

			button.addEventListener('touchstart', function (e) {
				e.preventDefault();
				e.stopPropagation();
				_PointJS.touchControl.initTouchControl();
				var text = area.value.trim();
				if (typeof func == 'function') {
					func(text != '' ? text : false);
				}
				device.document.body.removeChild(area);
				device.document.body.removeChild(button);
				_PointJS.game.resume();
			}, true);

			dom.attach(area);
			dom.attach(button);
			area.focus();
		};

		var openLine = function (obj, func) { // настройки, обработка результата

			_PointJS.game.stop();

			var area = device.document.createElement('input');
			area.type = 'text';
			area.style.position = 'fixed';
			area.style.border = 'none';
			area.style.zIndex = canvas.style.zIndex + 1;
			area.style.outline = 'none';
			area.style.backgroundColor = obj.fillColor || 'white';
			area.style.color = obj.color || 'black';
			area.style.top = (obj.y ? toInt(obj.y) : 0) + 'px';
			area.style.left = (obj.x ? toInt(obj.x) : 0) + 'px';
			area.style.width = (obj.w ? toInt(obj.w) : 0) + 'px';
			area.style.fontSize = (obj.size ? toInt(obj.size) : 10) + 'px';

			area.onclick = function (e) {
				e.stopPropagation();
			};

			area.onkeydown = function (e) {
				e.stopPropagation();
				if (e.keyCode == 27 || e.keyCode == 13) {
					var text = area.value.trim();
					if (typeof func == 'function') {
						func(text != '' ? text : false);
					}
					device.document.body.removeChild(area);
					_PointJS.game.resume();
				}
			};

			dom.attach(area);
			area.focus();
		};


		var openArea = function (obj, func) { // настройки

			_PointJS.game.stop();

			var area = device.document.createElement('textarea');
			area.style.position = 'fixed';
			area.style.border = 'none';
			area.style.zIndex = canvas.style.zIndex + 1;
			area.style.overflowY = 'scroll';
			area.style.outline = 'none';
			area.style.backgroundColor = obj.fillColor || 'white';
			area.style.color = obj.color || 'black';			
			area.style.top = (obj.y ? toInt(obj.y) : 0) + 'px';
			area.style.left = (obj.x ? toInt(obj.x) : 0) + 'px';
			area.style.width = (obj.w ? toInt(obj.w) : 0) + 'px';
			area.style.height = (obj.h ? toInt(obj.h) : 0) + 'px';
			area.style.fontSize = (obj.size ? toInt(obj.size) : 10) + 'px';
			area.style.maxWidth = (obj.w ? toInt(obj.w) : 0) + 'px';
			area.style.maxHeight = (obj.h ? toInt(obj.h) : 0) + 'px';

			area.onclick = function (e) {
				e.stopPropagation();
			};

			area.onkeydown = function (e) {
				e.stopPropagation();
				if (e.keyCode == 27) {
					var text = area.value.trim();
					if (typeof func == 'function') {
						func(text != '' ? text : false);
					}
					device.document.body.removeChild(area);
					_PointJS.game.resume();
				}
			};

			dom.attach(area);
			area.focus();
		};

		this.dialogs = {
			openLine : openLine,
			openArea : openArea,
			openTouchLine : openTouchLine
		};


		// end dialogs //////////////////////////////////////



































		// resources ////////////////////////////////////////

		var resources = {
			count : 0,
			loaded : 0,
			errored : 0,

			add : function () {
				this.count += 1;
			},

			load : function () {
				this.loaded += 1;
			},

			error : function () {
				this.errored += 1;
			}

		};

		var isLoaded = function () {
			return resources.count == resources.loaded;
		};

		var getProgress = function () {
			return Math.ceil(resources.loaded / resources.count * 100);
		};

		this.resources.isLoaded = isLoaded;
		this.resources.getProgress = getProgress;

		// end resources ////////////////////////////////////

























		// get FPS ////////////////////////////////////////////

		var fpsChecker = {
			fps : 0,
			time : 0,
			tmpFps : 0
		};

		var fpsUpdate = function () {
			fpsChecker.tmpFps += 1;
			if (time - fpsChecker.time >= 1000) {
				fpsChecker.fps = fpsChecker.tmpFps;
				fpsChecker.tmpFps = 0;
				fpsChecker.time = time;
			}
		};

		this.system.initFPSCheck = function () {
			dom.addEvent('postLoop', 'fpsCheckUpdate', function () {
				fpsUpdate();
			});
		};

		this.system.getFPS = function () {
			return fpsChecker.fps;
		};

		// end get FPS ////////////////////////////////////////
































		// functions ////////////////////////////////////////////

		this.OOP.newRever = function (min, max, step) {
			var Rever = function (min, max, step) {
				this.min = min;
				this.max = max;
				this.step = step;
				this.value = min;
				this.to = step;
			};

			Rever.prototype = {
				update : function () {
					var old = this.value;
					if (this.value <= this.min)
						this.to = this.step;
					else if (this.value >= this.max)
						this.to = -this.step;

					this.value += this.to;
					return old;
				},

				getValue : function () {
					return this.value;
				},

				setValue : function (val) {
					this.value = parseFloat(val);
				},

				setStep : function (val) {
					this.step = val;
				},

				getStep : function () {
					return this.step;
				}

			};
			return new Rever(min, max, step);
		};

		var functionList = {};
		this.OOP.once = function (key, func) { // key, function
			if (functionList[key]) return;
			functionList[key] = true;
			func();
		};

		this.OOP.newTimer = function (t, f) { // time mls, function
			if (t <= 0) return stop('error in system.newTimer: variable < 0, Timer is not created');
			
			var tmp = {
				time : t > 0 ? t : 1000,
				func : f,
				startTime : false,
				ending : false,

				start : function () {
					if (this.ending) return;
					if (!this.startTime)
						this.startTime = time;
				},

				run : function () {
					if (this.ending || !this.startTime) return;
					if (time - this.startTime >= this.time) {
						this.func();
						this.ending = true;
					}
				},

				end : function () {
					if (this.ending) return;
					this.ending = true;
					this.func();
				},

				restart : function (newTime) {
					if (!this.startTime) this.start();
					if (!this.ending) return;
					
					if (newTime && newTime <= 0)
						return stop('error in Timer.restart: variable < 0');
					else if (newTime)
						this.time = newTime;

					this.ending = false;
					this.startTime = time;
				},

				stop : function () {
					if (this.ending) return;
					this.ending = true;
				}

			};

			dom.addEvent('postLoop', 'timer'+(random(-100, 100)*random(-100, 100))+time, function () {
				tmp.run();
			});

			return tmp;
		};




		// end functions ////////////////////////////////////////





































		// system //////////////////////////////////////////////
		device.onload = function () {
			var i;
			for (i in contextSettings) {
				context[i] = contextSettings[i];
			}
			for (i in dom.events.onload) {
				if (typeof dom.events.onload[i] == 'function')
					dom.events.onload[i]();
			}
			dom.loaded = true;
			return false;
		};

		device.onblur = function () {
			if (!isRun) return;
			dom.runEvent('gameBlur');
			return false;
		};

		device.onfocus = function () {
			if (isRun) return;
			device.document.activeElement.blur();
			device.focus();
			dom.runEvent('gameFocus');
			return false;
		};

		device.onresize = function(){
			context.textBaseline = contextSettings.textBaseline;
			dom.runEvent('gameResize');
			return false;
		};

		device.onclick = function () {
			device.document.activeElement.blur();
			device.focus();
		};

		// end system //////////////////////////////////////////








































	};