var CONSTANTS = require('./constants.js');

function CollisionManager(gameManager){
	this.gameManager = gameManager;
}

/*
 * Check if the player has hit the ground
 */
CollisionManager.prototype.hitGround = function(){
	for(var i=0; i < this.gameManager.groundObjects.length; i++){
		if(isIntersecting(this.gameManager.player.sprite, this.gameManager.groundObjects[i].sprite)){
			return true;
		}
	}
	return false;
}

function isIntersecting(r1, r2) {
	return !(r2.position.x > (r1.position.x + r1.width) || 
    	       (r2.position.x + r2.width) < r1.position.x || 
        	   r2.position.y > (r1.position.y + r1.height) ||
           	   (r2.position.y + r2.height) < r1.position.y);
}

module.exports = CollisionManager;