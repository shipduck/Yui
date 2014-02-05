define(['require', 'game/constant'], function(req) {
var GConstant = require('game/constant');

var GPosition = function(sx, sy, x, y) {
  var self = this;
  this.sectorX = sx;
  this.sectorY = sy;
  this.localX = x;
  this.localY = y;
};
GPosition.prototype.toStr = function() {
  return "([" + this.sectorX + "," + this.sectorY + "],[" + this.localX + "," + this.localY + "])";
};
GPosition.prototype.distance = function(other) {
  return GPosition(other.sectorX - this.sectorX, other.sectorY - this.sectorY, other.localX - this.localX, other.localY - this.localY);
};
GPosition.prototype.localMove = function(dx, dy) {
  this.localX -= dx;
  this.localY -= dy;
  if (this.localX < 0) {
    this.sectorX -= 1;
    this.localX += GConstant.sectorWidth;
  }
  else if (this.localX >= GConstant.sectorWidth) {
    this.sectorX += 1;
    this.localX -= GConstant.sectorWidth;
  }
  if (this.localY < 0) {
    this.sectorY -= 1;
    this.localY += GConstant.sectorHeight;
  }
  else if (this.localY >= GConstant.sectorHeight) {
    this.sectorY += 1;
    this.localY -= GConstant.sectorHeight;
  }
};

return GPosition;
});
