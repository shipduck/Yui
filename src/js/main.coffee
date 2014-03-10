require ['jquery', 'pixijs', 'ui/ui'], ($, PIXI, ui) ->
  # Remove Loading Message
  $ '#loadingMessage'
  .remove;

  # Game Config
  config = 
    WIDTH: 800,
    HEIGHT: 600

  # For Debugging
  window.PIXI = PIXI

  # Init stage(Black background)
  stage = new PIXI.Stage 0x000000
  renderer = PIXI.autoDetectRenderer WIDTH, HEIGHT

  # Add Render target view
  $ '#viewPlaceholder'
  .append renderer.view

  # ui test
  newView = new ui.view;
  newView.setCenter 400, 300
  newView.setSize 200, 200
  newView.setBorder true 
  newView.addTo stage

  # Main Loop
  gameloop = () ->
    requestAnimFrame gameloop;
    renderer.render stage

  requestAnimFrame gameloop
