define(['require', 'game/character', 'game/constant', 'dialog'], function(req) {
var GCharacter = req('game/character'),
    GConstant = req('game/constant'),
    GSprite = req('game/sprite'),
    Dialog = req('dialog'),
    Size = req('size'),
    Point = req('point');

function Game() {
  this._pressedKeys = {};
  this._pressedDirections = new Array();
  this.fps = 60;
  this.tick = 0;
  this._debug = true;
};

Game.prototype.keyDown = function(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    this._pressedDirections.push(e.keyCode);
  }
  this._pressedKeys[e.keyCode] = 1;
};
Game.prototype.keyUp = function(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    this._pressedDirections = this._pressedDirections.filter(function(i){return i != e.keyCode;});
  }
  delete this._pressedKeys[e.keyCode];
};
Game.prototype.init = function() {
  var self = this;
  $('body')
	.keydown(function(e){
	    Game.prototype.keyDown.call(self, e);
	})
	.keyup(function(e){
	    Game.prototype.keyUp.call(self, e);
	});
  this.pc = new GCharacter(new GSprite('media/sprites/actor.png', new Size(16, 22)));
  if (this._debug) {
    this._debugDisplay = new Dialog(new Point(0, 0), new Size(100, 83));
    this._debugDisplay.setTitle("debug");
  }
};
Game.prototype.update = function() {
  var direction = GConstant.DIRECTION.NONE;
  if (this._pressedDirections.length != 0) {
    switch(this._pressedDirections[this._pressedDirections.length - 1]) {
    case 37: direction = GConstant.DIRECTION.LEFT; break;
    case 38: direction = GConstant.DIRECTION.UP; break;
    case 39: direction = GConstant.DIRECTION.RIGHT; break;
    case 40: direction = GConstant.DIRECTION.DOWN; break;
    }
  }
  this.pc.changeDirection(direction);
  this.pc.update();
};
Game.prototype.draw = function() {
  if (this._debug) {
    this._debugDisplay.setContent(
      "tick : " + this.tick + "<br/>" +
      "position : " + this.pc.position.toStr() + "<br/>" +
      "key : " + Object.keys(this._pressedKeys).join(", "));
  }
};
Game.prototype.loop = function() {
  this.tick += 1;
  this.update();
  this.draw();
};
Game.prototype.run = function() {
  var self = this;
  this.init();
  this._intervalId = setInterval(function(){
      Game.prototype.loop.call(self);
  }, 1000 / this.fps);
};

return Game;
});
