var PIXI = require('pixi');

var keyboard = require('./keyboard.js');
var Scenario = require('./scenario.js');
var Player = require('./player.js');
var TextObject = require('./text-object.js');

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0x000000);
var graphics = new PIXI.Graphics();

//create the game objects
var scenario = new Scenario(PIXI, PIXI.Texture.fromImage('assets/images/bg-far.jpg'), window.innerWidth, window.innerHeight);
var fpsText = new TextObject(PIXI, "FPS: ", {font: '35px Arial'}, {x: 0, y: 0});
var player = new Player(PIXI, PIXI.Texture.fromImage('assets/images/player.png'),{width: 50, height: 50},{x: 200, y: 600});

var lastDate = new Date();
var lastDateSeconds = new Date();

//add the objects to the scene
scenario.addScenario(stage);
player.addPlayer(stage);
fpsText.addText(stage);

var left = keyboard.addKey(keyboard.KEY_ARROW_LEFT),
	right = keyboard.addKey(keyboard.KEY_ARROW_RIGHT);
	
right.press = function(){
	scenario.increase(0.5);
	player.increase(0.01);
};

right.release = function(){
};

left.press = function(){
	scenario.decrease(0.5);
	player.decrease(0.01);
};

left.release = function(){
};

gameLoop();

function gameLoop(){
	
	var date = new Date();
	
	requestAnimationFrame(gameLoop);
	scenario.executeAnimation();
	player.executeAnimation();
	
	//Updates once a second
	if( date.getTime() - lastDateSeconds.getTime() > 1000 ){
		fpsText.executeAnimation("FPS: "+getFPS());
		lastDateSeconds = date;
	}
	
	renderer.render(stage);
	lastDate = date;
}


function getFPS(){
	return Math.floor(1000 / (new Date().getTime() - lastDate.getTime()));
	
}

function addCircle( graphics ){
	graphics.lineStyle(4, 0xffd900, 1);
	graphics.beginFill(0xFFFF0B, 0.5);
	graphics.drawCircle(470, 90,60);
	graphics.endFill();
	
	stage.addChild(graphics);
}




