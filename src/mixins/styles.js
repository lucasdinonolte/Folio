var Styles = {
  fill: function(color) {
    this.state.fill = color;
    return this;
  },
  stroke: function(color) {
    this.state.stroke = color;
    return this;
  },
  strokeWeight: function(weight) {
    this.state.lineWidth = weight;
    return this;
  },
  rotate: function(angle, origin) {
    var origin = Object.assign({
      x: 0.5,
      y: 0.5,
    }, origin);

    this.state.rotate = {
      angle: angle,
      origin: {
        x: this.x + this.width*origin.x,
        y: this.y + this.height*origin.y
      }
    };

    return this;
  },
  scale: function(factor) {
    this.state.scale = factor;
    return this;
  }
}

module.exports = Styles;
