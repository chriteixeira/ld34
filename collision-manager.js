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
		var line = this.sceneObjectManager.groundObjects[i].getGroundLine();
		var circle = [player.position.x,player.position.y];
		if(collide(line.a, line.b, circle, player.width/2)){
			return this.sceneObjectManager.groundObjects[i];
		}
		
		//var r1 = {x: player.position.x - player.width/2,
		//		  y: player.position.y - player.height/2,
		//		  width: player.width,
		//		  height: player.height},
		//	r2 = {x: obj.position.x,
		//		  y: obj.position.y,
		//		  width: obj.width,
		//		  height: obj.height};
		//if( isIntersecting(r1, r2)){
		//	return this.sceneObjectManager.groundObjects[i];
		//}
	}
	return undefined;
}


function isIntersecting(r1, r2) {
	return !(r2.x >= (r1.x + r1.width) || 
    	       (r2.x + r2.width) <= r1.x || 
        	   r2.y >= (r1.y + r1.height) ||
           	   (r2.y + r2.height) <= r1.y);
}


module.exports = CollisionManager;
