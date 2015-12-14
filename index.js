var PIXI = require('pixi');

var GameManager = require('./game-manager.js');
var Scenario = require('./scenario.js');
var TextObject = require('./text-object.js');
var Player = require('./player.js');
var SceneObject = require('./scene-object.js');


var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0x000000);
var graphics = new PIXI.Graphics();

//create the game objects
var scenario = new Scenario(PIXI, PIXI.Texture.fromImage('assets/images/bg_far.png'), window.innerWidth, window.innerHeight);
var fpsText = new TextObject(PIXI, "FPS: ", {font: '24px Arial'}, {x: 0, y: 0});
var player = new Player(PIXI, PIXI.Texture.fromImage('assets/images/player.png'),{width: 50, height: 50},{x: 200, y: 500});

//Control data
var lastDate = new Date();
var lastDateSeconds = new Date();

//add the objects to the scene
scenario.addScenario(stage);
player.addPlayer(stage);
fpsText.addText(stage);

var gameManager = new GameManager(PIXI, stage, scenario, player);

gameLoop();

function gameLoop(){
	
	var date = new Date();
	
	requestAnimationFrame(gameLoop);
	
	gameManager.animate();
	
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




