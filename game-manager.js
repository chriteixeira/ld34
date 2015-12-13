var CONSTANTS = require('./constants.js');
var keyboard = require('./keyboard.js');
var CollisionManager = require('./collision-manager.js');
var SceneObject = require('./scene-object.js');

function GameManager(PIXI, stage, scenario, player){
	this.PIXI = PIXI;
	this.stage = stage;
	this.scenario = scenario;
	this.player = player;
	
	this.groundObjects = [];
	this.pickups = [];
	this.obstacles = [];
	
	this.configureKeyboard();
	this.createGroundObjects();
	
	this.collisionManager = new CollisionManager(this);
}


GameManager.prototype.animate = function(){
	this.player.executeAnimation(this.collisionManager);
	this.scenario.executeAnimation();
	this.animateObjectList(this.groundObjects);
	this.animateObjectList(this.pickups);
	this.animateObjectList(this.obstacles);
	this.decay();
		
};

GameManager.prototype.animateObjectList = function(list){
	for(var i=0; i < list.length; i++){
		list[i].executeAnimation();
	}
}

GameManager.prototype.createGroundObjects = function(){
	var texture = this.PIXI.Texture.fromImage('assets/images/ground.png');
	for(var i=0; i < 10; i++){
		var obj = new SceneObject(this.PIXI, CONSTANTS.OBJECT_TYPE_GROUND, texture, {width: 220, height: 70}, {x: 220 * i, y: 700});
		this.groundObjects.push(obj);
		obj.addObject(this.stage);
	}
}


GameManager.prototype.configureKeyboard = function(){
	var left = keyboard.addKey(keyboard.KEY_ARROW_UP),
		right = keyboard.addKey(keyboard.KEY_ARROW_DOWN);
	
	right.press = function(){
		this.scenario.increase(0.5);
		this.player.increase(0.01);
	};
	
	right.release = function(){
	};
	
	left.press = function(){
		this.scenario.decrease(0.5);
		this.player.decrease(0.01);
	};
	
	left.release = function(){
	};
}

/*
 * Clear the uncessary objects 
 */
GameManager.prototype.decay = function(){
	
	this.decayObjectList(this.groundObjects);
	this.decayObjectList(this.pickups);
	this.decayObjectList(this.obstacles);
	
}

/*
 * Remove the objects out of the scene. Since the list is ordered by
 * apperance, we just need to check the first object
 */
GameManager.prototype.decayObjectList = function(list){
	if(list.length > 0 && list[0].isOutOfScene()){
		var obj = list.shift();
		obj.removeObject(this.stage);
	}
	
}


module.exports = GameManager;