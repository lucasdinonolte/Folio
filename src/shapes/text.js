var Shape = require('../mixins/shape');
var Styles = require('../mixins/styles');

var Text = function(options) {
  var params = Object.assign({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }, options);
  this.setupShape(params);
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
  fillStyle: function(fill, fillColor) {
    this.state.fill = fill;
    this.state.fillColor = fillColor;
    return this;
  },
  strokeStyle: function(stroke, strokeColor) {
    this.state.stroke = stroke;
    this.state.strokeColor = strokeColor;
    return this;
  },
  tracking: function(tracking) {
    this.state.tracking = this.state.fontSize / 1000 * tracking;
    return this;
  },
  continued: function(continued) {
    this.state.continued = continued;
    return this;
  },
  applyTextStyle: function(style) {
    this.font(style.fontFamily);
    this.fontSize(style.fontSize);
    this.lineHeight(style.lineHeight);
    this.align(style.align);
    this.tracking(style.tracking);
    this.features(style.features);
    this.fillStyle(style.fill, style.fillColor);
    this.strokeStyle(style.stroke, style.strokeColor);
  },
  renderShape: function(renderer) {
    renderer.font(this.state.font || 'Courier')
            .fontSize(this.state.fontSize)
            .lineGap(this.state.lineHeight - this.state.fontSize);
    if(this.state.fill) {
      renderer.fill(this.state.fillColor);
    }
    if(this.state.stroke) {
      renderer.stroke().strokeColor(this.state.strokeColor);
    }
    renderer.text(this.state.text, this.x, this.y, {
      width: this.width,
      height: this.height,
      features: this.state.features,
      align: this.state.align,
      fill: this.state.fill,
      stroke: this.state.stroke,
      characterSpacing: this.state.tracking,
      continued: this.state.continued || false
    });
  }
};

Object.assign(Text.prototype, Styles);
Object.assign(Text.prototype, Shape);

module.exports = Text;
