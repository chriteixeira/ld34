var PIXI = require('pixi');

var GameManager = require('./game-manager.js');
var Scenario = require('./scenario.js');
var TextObject = require('./text-object.js');
var Player = require('./player.js');
var SceneObject = require('./scene-object.js');

var settings = JSON.parse('{ '+
			'"player": { ' +
				'"position":{ '+ 
					'"x": 200, '+
					'"y": 500' +
				'},'+
				'"width": 50,'+
				'"height" : 50'+
			'},'+
			'"groundtile": {'+
				'"position": {'+
					'"x": 0,'+
					'"y": 600'+
				'},'+
				'"size": 70'+
			'},'+
			'"angularVelocity": 0.2,'+
			'"gravity": 30,'+
			'"factor": 0.15'+
	'}');
settings.linearVelocity = getLinearVelocity(settings.angularVelocity, settings.player.width);

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0x000000);
var graphics = new PIXI.Graphics();

//create the game objects
var scenario = new Scenario(PIXI, PIXI.Texture.fromImage('assets/images/bg_far.png'), window.innerWidth, window.innerHeight, settings.linearVelocity, settings.factor);
var fpsText = new TextObject(PIXI, "FPS: ", {font: '24px Arial'}, {x: 0, y: 0});
var player = new Player(PIXI, PIXI.Texture.fromImage('assets/images/player.png'),{width: settings.player.width, height: settings.player.height},settings.player.position, settings.angularVelocity, settings.factor);

//Control data
var lastDate = new Date();
var lastDateSeconds = new Date();

//add the objects to the scene
scenario.addScenario(stage);
player.addPlayer(stage);
fpsText.addText(stage);

var gameManager = new GameManager(PIXI, stage, scenario, player, settings);

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

function getLinearVelocity(angularVelocity, radius){
	return radius * angularVelocity;
}

function getFPS(){
	return Math.floor(1000 / (new Date().getTime() - lastDate.getTime()));
	
}

