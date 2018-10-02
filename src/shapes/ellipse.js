var Styles = require('../mixins/styles');
var Shape = require('../mixins/shape');

var Ellipse = function(options) {
  this.setupShape(options);
}

Ellipse.prototype = {
  renderShape: function(renderer) {
    renderer.ellipse(this.x, this.y, this.width/2, this.height/2);
  }
};

Object.assign(Ellipse.prototype, Styles);
Object.assign(Ellipse.prototype, Shape);

module.exports = Ellipse;
