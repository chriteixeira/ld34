
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

Player.prototype.executeAnimation = function(){
	this.sprite.rotation += this.velocity;
}

Player.prototype.increase = function(factor){
	this.sprite.scale.x += factor;
	this.sprite.scale.y += factor;
	if(this.velocity - factor > 0.01){
		this.velocity -= factor;
	}
}

Player.prototype.decrease = function(factor){
	if(this.sprite.scale.x - factor > 0.1){
		this.sprite.scale.x -= factor;
	}
	if(this.sprite.scale.y - factor > 0.1 ){
		this.sprite.scale.y -= factor;
	}
	this.velocity += factor;
}


module.exports = Player;