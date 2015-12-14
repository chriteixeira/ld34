function Scenario(PIXI, textureFar, width, height, velocity){
	this.spriteFar = new PIXI.TilingSprite(textureFar, width, height);
	this.velocity = velocity;
}

Scenario.prototype.addScenario = function(stage){
	stage.addChild(this.spriteFar);	
}

Scenario.prototype.executeAnimation = function(isAcc, isDeAcc, timeElapsed){
	this.spriteFar.tilePosition.x -= this.velocity;
	
}

Scenario.prototype.increase = function(factor){
	this.velocity += factor * this.velocity;
}

Scenario.prototype.decrease = function(factor){
	this.velocity -= factor * this.velocity;
}

module.exports = Scenario;