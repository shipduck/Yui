define ['./view', 'pixijs'], (View, PIXI) ->
  class label extends View
    construct: () ->
      _text = ''
