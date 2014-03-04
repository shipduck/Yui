require.config({
});

require(['require',
         'game/main',
         '/bower_components/jquery/dist/jquery.min.js'], function(req) {
var Game = req('game/main');

$(document).ready(function() {
  window.game = new Game();
  window.game.run();
});

});
