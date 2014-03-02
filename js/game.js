require.config({
});

require(['require', 'game/main', 'jquery.min'], function(req) {
var Game = req('game/main');

$(document).ready(function() {
  game = new Game();
  game.run();
});

});
