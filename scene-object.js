var CONSTANTS = require('./constants.js');

function SceneObject(PIXI, type, subtype, texture, size, position, solid, velocity){
	this.type = type;
	this.sprite = new PIXI.Sprite(texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;
	this.sprite.width = size.width;
	this.sprite.height = size.height;
	this.velocity = velocity;
	this.solid = solid;
}

SceneObject.prototype.addObject = function(stage){
	stage.addChild(this.sprite);
};

SceneObject.prototype.removeObject = function(stage){
	stage.removeChild(this.sprite);
};

SceneObject.prototype.executeAnimation = function(factor){
	this.sprite.position.x -= this.velocity;
};

SceneObject.prototype.increase = function(factor){
	this.velocity += factor * this.velocity;
};

SceneObject.prototype.decrease = function(factor){
	this.velocity -= factor * this.velocity;
};

SceneObject.prototype.isOutOfScene = function(){
	return (this.sprite.position.x + this.sprite.width < 0) 
			|| (this.sprite.position.y + this.sprite.height < 0);
};

module.exports = SceneObject;