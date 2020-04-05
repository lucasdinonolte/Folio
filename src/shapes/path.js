var Styles = require('../mixins/styles');
var Shape = require('../mixins/shape');

var Path = function(options, doc) {
  this.setupShape(options);
  this.path = [];
}

Path.prototype = {
  moveTo(position) {
    this.path.push(`M ${position.x},${position.y}`);
    return this;
  },
  lineTo(position) {
    this.path.push(`L ${position.x},${position.y}`);
    return this;
  },
  renderShape: function(renderer) {
    renderer.path(this.path.join(" "));
  }
};

Object.assign(Path.prototype, Styles);
Object.assign(Path.prototype, Shape);

module.exports = Path;
