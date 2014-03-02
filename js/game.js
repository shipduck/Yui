require.config({
});

require(['require', 'game/main', 'jquery.min'], function(req) {
var Game = req('game/main');

$(document).ready(function() {
  window.game = new Game();
  window.game.run();
});

});
