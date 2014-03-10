define ['pixijs'], (PIXI) ->
  class View
    constructor: () ->
      @_g = new PIXI.Graphics
      @_border = false
      @_frame = new PIXI.Rectangle
      @_useCenter = false
      @_children = []
      @_parent = null

    addTo: (parent) ->
      if parent.addTo is undefined
        parent.addChild @_g
      else
        parent.addChild this

    render: () ->
      @_g.clear
      if @_border
        @_g.lineStyle 2, 0xFFFFFF
        _g.drawRect (@_frame.x - 1), (@_frame.y - 1), (@_frame.width - 2), (@_frame.height - 2)

    moveBy: (x, y) ->
      @_frame.x += x
      @_frame.y += y
      _moveChildren x, y
      render

    moveTo: (x, y) ->
      deltaX = x - @_frame.x
      deltaY = y - @_frame.y
      moveBy x, y

    _moveChildren: (x, y) ->
      child.moveBy x, y for child in @_children

    addChild: (child) ->
      if typeof child is 'undefined'
        console.log 'Error : invalid child'
        return
      @_children.push child;
      child._parent = this;

    setBorder: (b) ->
      if typeof b != 'boolean'
        console.log 'Wrong Type of argument'
        return;
      if @_border is b
        return;
      @_border = b;
      render();

    setPosition: (x, y) ->
      @_useCenter = false
      moveTo x, y

    setCenter: (x, y) ->
      _useCenter = true
      moveTo (x - this._frame.width  / 2), (y - this._frame.height / 2)

    setSize: (w, h) ->
      if @_useCenter
        moveBy ((@_frame.width - w) / 2), ((@_frame.height - h) / 2)
      @_frame.width = w;
      @_frame.height = h;
      render
