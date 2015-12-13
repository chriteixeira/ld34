var keyboard = {};

keyboard.KEY_ARROW_UP = 36;
keyboard.KEY_ARROW_LEFT = 37;
keyboard.KEY_ARROW_DOWN = 38;
keyboard.KEY_ARROW_RIGHT = 39;

//FIXME deal with repeated calls

keyboard.addKey = function(code){
	var key = {};
	
	//validate if the key is the same to avoid multiple calls
	key.code = code;
	key.isUp = true;
	key.isDown = false;
	
	//handler functions to keyboard events
	key.press = undefined;
	key.release = undefined;
	
	key.keyUp = function(e){
		if(e.keyCode === code){
			key.release();
			key.isUp = true;
			key.isDown = false;			
		}
		e.preventDefault();
	};
	
	key.keyDown = function(e){
		if(e.keyCode === code){
			key.press();
			key.isUp = false;
			key.isDown = true;
		}
		e.preventDefault();
	};
	
	window.addEventListener("keyup", key.keyUp.bind(key), false);
	window.addEventListener("keydown", key.keyDown.bind(key), false);
	
	return key;
	
}

module.exports.addKey = keyboard.addKey;
module.exports.KEY_ARROW_UP = keyboard.KEY_ARROW_UP;
module.exports.KEY_ARROW_DOWN = keyboard.KEY_ARROW_DOWN;
module.exports.KEY_ARROW_LEFT = keyboard.KEY_ARROW_LEFT;
module.exports.KEY_ARROW_RIGHT = keyboard.KEY_ARROW_RIGHT;