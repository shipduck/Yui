define(['require', 'game/position', 'game/sprite', 'game/constant'], function(req) {
var GPosition = req('game/position'),
    GSprite = req('game/sprite'),
    GConstant = req('game/constant');

var GCharacter = function(sprite) {
  this.position = new GPosition(0, 0, 0, 0);
  this.sprite = sprite;
  this.direction = GConstant.DIRECTION.NONE;
  this.speed = 1;
  sprite.show();
};
GCharacter.prototype.changeDirection = function(newDirection) {
  this.direction = newDirection;
};
GCharacter.prototype.update = function() {
  switch (this.direction) {
  case GConstant.DIRECTION.LEFT:
    this.position.localMove(this.speed, 0);
    break;
  case GConstant.DIRECTION.RIGHT:
    this.position.localMove(-this.speed, 0);
    break;
  case GConstant.DIRECTION.UP:
    this.position.localMove(0, this.speed);
    break;
  case GConstant.DIRECTION.DOWN:
    this.position.localMove(0, -this.speed);
    break;
  }
};

return GCharacter;
});
