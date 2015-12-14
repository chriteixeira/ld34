
function Player(PIXI, texture, size, position, angularVelocity){
	this.sprite = new PIXI.Sprite(texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;
	this.sprite.width = size.width;
	this.sprite.height = size.height;
	this.velocity = angularVelocity;
}

Player.prototype.addPlayer = function(stage){
	stage.addChild(this.sprite);
};

Player.prototype.executeAnimation = function(collisionManager){
	this.sprite.rotation += this.velocity;
	
	//Simulate the gravity (the player will fall until it hit the ground)
	if( !collisionManager.hitGround() ){
		this.sprite.position.y += 1;
	}
};

Player.prototype.increase = function(factor){
	this.sprite.width += this.sprite.width * factor;
	this.sprite.height += this.sprite.height * factor;
	//this.sprite.position.y -= this.sprite.heigth * factor / 2;
};

Player.prototype.decrease = function(factor){
	this.sprite.width -= this.sprite.width * factor;
	this.sprite.height -= this.sprite.height * factor;
	//this.sprite.position.y += this.sprite.heigth * factor / 2;
};


module.exports = Player;
