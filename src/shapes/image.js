var sharp = require('sharp');

var Styles = require('../mixins/styles');
var Shape = require('../mixins/shape');

var Image = function(src, options, doc) {
  this.setupShape(options);
  this.src = src;
  this.image = sharp(this.src);
}

Image.prototype = {
  flip: function() {
    this.image.flip();
    return this;
  },
  flop: function() {
    this.image.flop();
    return this;
  },
  tint: function(tint) {
    this.image.tint(tint);
    return this;
  },
  negative: function() {
    this.image.negate();
    return this;
  },
  greyscale: function() {
    this.image.greyscale();
    return this;
  },
  median: function(size) {
    this.image.median(size);
    return this;
  },
  blur: function(radius) {
    this.image.blur(radius);
    return this;
  },
  sharpen: function(radius) {
    this.image.sharpen(radius);
    return this;
  },
  threshold: function(threshold) {
    this.image.threshold(threshold);
    return this;
  },
  renderShape: function(renderer) {
    let data = null;
    let sync = true;
    // Make sure to convert things to CMYK
    this.image.toColorspace('cmyk').toBuffer().then((res) => {
      data = res;
      sync = false;
    });
    while(sync) { require('deasync').sleep(100); }
    renderer.save();
    renderer.rect(this.x, this.y, this.width, this.height).clip();
    renderer.image(data, this.x, this.y, { cover: [this.width, this.height], align: 'center', valign: 'center' });
    renderer.restore();
  }
};

Object.assign(Image.prototype, Styles);
Object.assign(Image.prototype, Shape);

module.exports = Image;
