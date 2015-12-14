function TextObject(PIXI, text, style, position){
	this.text = new PIXI.Text(text, style);
	this.text.position.x = position.x;
	this.text.position.y = position.y;
}

TextObject.prototype.addText = function(stage){
	stage.addChild(this.text);
}

TextObject.prototype.executeAnimation = function(text){
	if( text != undefined ){
		this.text.text = text;
	}
}

module.exports = TextObject;