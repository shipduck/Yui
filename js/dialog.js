define(['require', 'point', 'size'], function(req) {
var Dialog = function(origin, size) {
  this.dialog = $('<div class="dialog" id="dialog_' + Date.now() + '"></div>')
	        .width(size.width)
	        .height(size.height)
	        .offset({'top':origin.y,'left':origin.x});
  var titleWrap = $('<div class="title"></div>').appendTo(this.dialog);
  var contentWrap = $('<div class="content"></div>').appendTo(this.dialog);
  var titleContainer = $('<span></span>').appendTo(titleWrap);
  this.setTitle = function(title) {
    titleContainer.text(title);
  };
  this.setContent = function(text) {
    contentWrap.html(text);
  }
  $('#screen').append(this.dialog);
};
return Dialog;
});
