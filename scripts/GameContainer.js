GameContainer = Klass(CanvasNode, { 
  score: new ScorePanel(),
  background: '#FFFFFF',
  nwidth: 16,
  nheight: 24,
  width: Block.size * 16,
  height: Block.size * 24,
  map: [], // Contains all placement of shape parts.
  
  /*
    Key codes for game keyboard control.
  */
  RIGHT: 100,
  LEFT: 97,
  PAUSE: 112,
  SPACE: 32,
  BOTTOM: 115,
  BEGIN: 98,
  RESTART: 114,
  
  
  initialize: function(canvasElem) {
    CanvasNode.initialize.call(this);
    
    this.canvas = new Canvas(canvasElem);
    this.canvas.frameDuration = 30;
    this.canvas.append(this);
    
    // Draw container where we will place shape objects.
    this.container = new Rectangle(this.width, this.height, {
      fill: this.background,
      rx: 2,
      ry: 2,
      strokeWidth: 1,
      stroke: 'cyan',
      x: 0,
      y: 0
    });
    
    this.append(this.container);

    // This panel will generate next shape and preview it.
    // Score panel also contains preview for the game object
    // and scores what use have got.
    this.append(this.score);
    for(var i = 0; i < 1; i++) {
      var shape = this.score.next();
      shape.addEventListener('keypress', this.move_shape);
      shape.addFrameListener(shape.update_onframe);
      this.append(shape);
    }
    
    this.addEventListener('keypress', this.move_shape_by_keyboard);
  },
  
  setup: function() {
    // Initialize map of the game container with 0, it means we haven't
    // any blocks in the game container.
    for(var i = 0; i < 16; i++) {
      this.map.push([]);
      for(var j = 0; j < 24; j++) {
        this.map[i].push(0);
      }
    }
  },
  
  move_shape_by_keyboard: function(e) {
    var shape = this.score.current_shape;
    if (e.keyCode == this.RIGHT) {
      shape.x = this.ensure_position(shape.x + Block.size, shape.y, 
        shape.width, shape.height);
    } else if (e.keyCode == this.LEFT) {
      shape.x = this.ensure_position(shape.x - Block.size, shape.y, 
        shape.width, shape.height);
    } else if (e.keyCode == this.SPACE) {
      shape.rotate();
      shape.x = this.ensure_position(shape.x, shape.y, 
        shape.width, shape.height);
    } else if (e.keyCode == this.PAUSE) {
      this.pause();
    } else if (e.keyCode == this.BEGIN) {
      this.start();
    } else if (e.keyCode == this.RESTART) {
      this.restart();      
    } else if (e.keyCode == this.BOTTOM) {
      this.move_to_bottom();
    }
  },

  start: function() {
    this.score.current_shape.addFrameListener(Shape.update_onframe);  
  },

  pause: function() {
    this.score.current_shape.removeFrameListener(Shape.update_onframe);
  },

  restart: function() {
    // TODO: implement restart methods, we have to clear game panels and
    // cleanup backup from localStorage with coordinates of game objects.
  },

  move_to_bottom: function() {
    this.score.current_shape.step = 10;
  },
  
  /*
    Ensure position of the shape in the game container.
  */
  ensure_position: function(x, y, width, height) {
    var coords = this.translate_coordinates(x, y);
    if (coords.x >= 10) {
      x = 14 * Block.size;
    }
  
    /*if (position < 0) {
      position = 0;
    } else if (position >= this.width - Block.size * elements) {
      // We have to sub line max size of blocks.
      position = this.width - Block.size * elements;
    }*/
    return x;
  },
  
  translate_coordinates: function(x, y) {
    return {x: Math.floor(x / Block.size), y: Math.floor(y / Block.size)};
  }
});
