// Shared Utilities for Render Operations

var Shape = {
  setupShape: function(options) {
    var params = Object.assign({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }, options);

    this.x = params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;

    this.state = {};
  },

  render: function(renderer, callback) {
    renderer.save();
    if(this.state.rotate) {
      renderer.rotate(this.state.rotate.angle, {
        origin: [this.state.rotate.origin.x, this.state.rotate.origin.y]
      });
    }
    if(this.state.scale) {
      renderer.scale(this.state.scale);
    }

    this.renderShape(renderer);

    if(this.state.fill) {
      renderer.fill(this.state.fill);
    }

    if(this.state.stroke) {
      renderer.stroke(this.state.stroke);
    }
    renderer.restore();
  }
};

module.exports = Shape;
