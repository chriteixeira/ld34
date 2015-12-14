var CONSTANTS = require('./constants.js');
var SceneObject = require('./scene-object.js');
var CollisionManager = require('./collision-manager.js');

function SceneObjectManager(PIXI){
	this.PIXI = PIXI;
	this.textures = {
			ground: PIXI.Texture.fromImage('assets/images/ground.png'),
			ground_up: PIXI.Texture.fromImage('assets/images/ground_up.png'),
			ground_down: PIXI.Texture.fromImage('assets/images/ground_down.png')
	};
	
	this.groundObjects = [];
	this.pickups = [];
	this.obstacles = [];
	this.nonSolid = [];
}

SceneObjectManager.prototype.animate = function(){
	this.animateObjectList(this.groundObjects);
	this.animateObjectList(this.pickups);
	this.animateObjectList(this.obstacles);
	this.animateObjectList(this.nonSolid);
};

SceneObjectManager.prototype.animateObjectList = function(list){
	for(var i=0; i < list.length; i++){
		list[i].executeAnimation();
	}
};

/*
 * Create a basic ground object. 
 * 
 * Return the position for the next object
 */
SceneObjectManager.prototype.createGroundObj = function(stage, position){
	var obj = new SceneObject(  this.PIXI, 
								CONSTANTS.OBJECT_TYPE_GROUND,
								CONSTANTS.OBJECT_TYPE_GROUND_RECT,
								this.textures.ground, 
								{width: CONSTANTS.TILE_SIZE,height: CONSTANTS.TILE_SIZE}, 
								position, 
								true );
	this.groundObjects.push(obj);
	obj.addObject(stage);
	
	//return position;
};

/*
 * Create a ground up object. This object have a basic below it.
 * 
 * Return the position for the next object
 */
SceneObjectManager.prototype.createGroundUpObj = function(stage, position){
	var newPosition = {x: position.x, y: position.y - CONSTANTS.TILE_SIZE};
	
	var obj = new SceneObject(  this.PIXI, 
								CONSTANTS.OBJECT_TYPE_GROUND,
								CONSTANTS.OBJECT_TYPE_GROUND_UP, 
								this.textures.ground_up, 
								{width: CONSTANTS.TILE_SIZE,height: CONSTANTS.TILE_SIZE}, 
								newPosition, 
								true );
								
	var obj2 = new SceneObject(  this.PIXI, 
								CONSTANTS.OBJECT_TYPE_GROUND,
								CONSTANTS.OBJECT_TYPE_GROUND_RECT, 
								this.textures.ground, 
								{width: CONSTANTS.TILE_SIZE,height: CONSTANTS.TILE_SIZE}, 
								position, 
								false );
	this.groundObjects.push(obj);
	this.nonSolid.push(obj2);

	obj.addObject(stage);
	obj2.addObject(stage);
	
	//return newPosition;
};

/*
 * Create a ground up object. This object have a basic below it.
 * 
 * Return the position for the next object
 */
SceneObjectManager.prototype.createGroundDownObj = function(stage, position){
	var newPosition = {x: position.x, y: position.y + CONSTANTS.TILE_SIZE};
	
	var obj = new SceneObject(  this.PIXI, 
								CONSTANTS.OBJECT_TYPE_GROUND,
								CONSTANTS.OBJECT_TYPE_GROUND_DOWN, 
								this.textures.ground_down, 
								{width: CONSTANTS.TILE_SIZE,height: CONSTANTS.TILE_SIZE}, 
								position, 
								true );
								
	var obj2 = new SceneObject( this.PIXI, 
								CONSTANTS.OBJECT_TYPE_GROUND,
								CONSTANTS.OBJECT_TYPE_GROUND_RECT, 
								this.textures.ground, 
								{width: CONSTANTS.TILE_SIZE,height: CONSTANTS.TILE_SIZE}, 
								newPosition, 
								false );
	this.groundObjects.push(obj);
	this.nonSolid.push(obj2);
	
	obj.addObject(stage);
	obj2.addObject(stage);	
	
	//return newPosition;
};

/*
 * Clear the uncessary objects 
 */
SceneObjectManager.prototype.decay = function(){
	
	this.decayObjectList(this.groundObjects);
	this.decayObjectList(this.pickups);
	this.decayObjectList(this.obstacles);
	this.decayObjectList(this.nonSolid);
	
}

/*
 * Remove the objects out of the scene. Since the list is ordered by
 * apperance, we just need to check the first object
 */
SceneObjectManager.prototype.decayObjectList = function(list){
	if(list.length > 0 && list[0].isOutOfScene()){
		var obj = list.shift();
		obj.removeObject(this.stage);
	}	
};

module.exports = SceneObjectManager;