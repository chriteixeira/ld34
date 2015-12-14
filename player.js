
function Player(PIXI, texture, size, position){
	this.sprite = new PIXI.Sprite(texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;
	this.sprite.width = size.width;
	this.sprite.height = size.height;
	this.velocity = 0.1;
}

Player.prototype.addPlayer = function(stage){
	stage.addChild(this.sprite);
}

Player.prototype.executeAnimation = function(collisionManager){
	this.sprite.rotation += this.velocity;
	
	//Simulate the gravity (the player will fall until it hit the ground)
	if( !collisionManager.hitGround() ){
		this.sprite.position.y += 1;
	}
}

Player.prototype.increase = function(factor){
	this.sprite.width += factor;
	this.sprite.height += factor;
	this.sprite.position.y -= factor/2;
	
	if(this.velocity - factor > 0.01){
		this.velocity -= factor;
	}
}

Player.prototype.decrease = function(factor){
	if(this.sprite.width - factor > 0.1){
		this.sprite.width -= factor;
	}
	if(this.sprite.height - factor > 0.1 ){
		this.sprite.height -= factor;
		this.sprite.position.y += factor/2;
	}
	this.velocity += factor;
}


module.exports = Player;