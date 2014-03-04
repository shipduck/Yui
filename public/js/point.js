define([], function() {
var GPoint = function(x, y) {
  this.x = x;
  this.y = y;
};
GPoint.prototype.add = function(delta) {
  this.x += delta.x;
  this.y += delta.y;
};
return GPoint;
});
