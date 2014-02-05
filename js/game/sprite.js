define(['require', 'point'], function(req) {
var Point = req('point');

var GSprite = function(image, size) {
  this.element = $('<div class="sprite"></div>')
	.css('background-image', 'url("' + image + '")')
	.css('background-position', '0 0')
        .width(size.width)
	.height(size.height);
  this.position = new Point(0, 0);
  this.size = size;
  this.animation = 0;
};
GSprite.prototype.show = function() {
  $('body').append(this.element);
};
GSprite.prototype.hide = function() {
  this.element;
};
return GSprite;
});
