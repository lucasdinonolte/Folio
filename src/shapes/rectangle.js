var Styles = require('../mixins/styles');
var Shape = require('../mixins/shape');

var Rectangle = function(options, doc) {
  this.setupShape(options);
}

Rectangle.prototype = {
  renderShape: function(renderer) {
    renderer.rect(this.x, this.y, this.width, this.height);
  }
};

Object.assign(Rectangle.prototype, Styles);
Object.assign(Rectangle.prototype, Shape);

module.exports = Rectangle;
