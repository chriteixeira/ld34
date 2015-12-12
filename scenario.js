function Scenario(PIXI, textureFar, width, height ){
	this.spriteFar = new PIXI.TilingSprite(textureFar, width, height);
	this.velocity = 10;
}

Scenario.prototype.addScenario = function(stage){
	stage.addChild(this.spriteFar);	
}


Scenario.prototype.executeAnimation = function(isAcc, isDeAcc, timeElapsed){
	this.spriteFar.tilePosition.x -= this.velocity;
	
}

Scenario.prototype.increase = function(factor){
	if( this.velocity - factor > 1 ){
		this.velocity -= factor;
	}
}

Scenario.prototype.decrease = function(factor){
	this.velocity += factor;
}

module.exports = Scenario;