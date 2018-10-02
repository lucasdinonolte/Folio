var Shape = require('../mixins/shape');
var Styles = require('../mixins/styles');

var Text = function(options, textStyle) {
  this.setupShape(options);
  this.textStyle = textStyle;
}

Text.prototype = {
  text: function(text) {
    this.state.text = text;
    return this;
  },
  font: function(font) {
    this.state.font = font;
    return this;
  },
  fontSize: function(size) {
    this.state.fontSize = size;
    return this;
  },
  lineHeight: function(lineHeight) {
    this.state.lineHeight = lineHeight;
    return this;
  },
  align: function(align) {
    this.state.align = align;
    return this;
  },
  features: function(features) {
    this.state.features = features;
    return this;
  },
  renderShape: function(renderer) {
    renderer.font(this.state.font || 'Courier')
            .fontSize(this.state.fontSize)
            .fillColor(this.state.fill)
            .lineGap(this.state.lineHeight - this.state.fontSize);
    renderer.text(this.state.text, this.x, this.y, {
      width: this.width,
      height: this.height,
      features: this.state.features,
      align: this.state.align,
    });
  }
};

Object.assign(Text.prototype, Styles);
Object.assign(Text.prototype, Shape);

module.exports = Text;
