var CONSTANTS = require('./constants.js');
var collide = require('line-circle-collision')

function CollisionManager(player, sceneObjectManager){
	this.sceneObjectManager = sceneObjectManager;
	this.player = player;
}

/*
 * Check if the player has hit the ground
 */
CollisionManager.prototype.hitGround = function(){
	for(var i=0; i < this.sceneObjectManager.groundObjects.length; i++){
		var player = this.player.sprite;
		var obj = this.sceneObjectManager.groundObjects[i].sprite;
		var a = [obj.position.x - obj.width/2, obj.position.y];
		var b = [obj.position.x + obj.width/2, obj.position.y];
		var circle = [player.position.x,player.position.y];
		if(collide(a, b, circle, player.width)){
			return true;
		}
	}
	return false;
}


function isIntersecting(r1, r2) {
	return !(r2.position.x >= (r1.position.x + r1.width) || 
    	       (r2.position.x + r2.width) <= r1.position.x || 
        	   r2.position.y >= (r1.position.y + r1.height) ||
           	   (r2.position.y + r2.height) <= r1.position.y);
}


module.exports = CollisionManager;
