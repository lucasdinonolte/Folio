var Styles = require("../mixins/styles");

var Util = require('../util');

var Rectangle = function(x, y, width, height, doc) {
  var bleed = doc.getBleed();
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.state = {};
}

Rectangle.prototype = {
  render: function(renderer) {
    renderer.rect(this.x, this.y, this.width, this.height)
            .fill(this.state.fill);
  }
};

Object.assign(Rectangle.prototype, Styles);

module.exports = Rectangle;
