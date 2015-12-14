var CONSTANTS = require('./constants.js');
var keyboard = require('./keyboard.js');
var CollisionManager = require('./collision-manager.js');
var SceneObject = require('./scene-object.js');
var SceneObjectManager = require('./scene-object-manager.js');

function GameManager(PIXI, stage, scenario, player, settings){
	this.PIXI = PIXI;
	this.stage = stage;
	this.scenario = scenario;
	this.player = player;
	this.settings = settings;
	
	this.sceneObjectManager = new SceneObjectManager(PIXI, stage, settings);
	this.collisionManager = new CollisionManager(this.player, this.sceneObjectManager);
		
	this.configureKeyboard();
}

GameManager.prototype.proceduralGeneration = function(){
	sceneObjectManager.proceduralGeneration();
}

GameManager.prototype.animate = function(){
	this.sceneObjectManager.animate();
	this.player.executeAnimation(this.collisionManager);
	this.scenario.executeAnimation();
	
};

GameManager.prototype.decay = function(){
	this.sceneObjectManager.decay();
}

GameManager.prototype.configureKeyboard = function(){
	var dec = keyboard.addKey(keyboard.KEY_ARROW_DOWN),
		inc = keyboard.addKey(keyboard.KEY_ARROW_UP);
	
	var scenario = this.scenario;
	var player = this.player;
	var sceneManager = this.sceneObjectManager;
	var settings = this.settings;
	
	inc.press = function(){
		scenario.increase(settings.factor);
		player.increase(settings.factor);
		sceneManager.increase(settings.factor);
	};
	
	inc.release = function(){
	};
	
	dec.press = function(){
		scenario.decrease(settings.factor);
		player.decrease(settings.factor);
		sceneManager.decrease(settings.factor);
	};
	
	dec.release = function(){
	}
};


module.exports = GameManager;