var Text = require('../shapes/text');

var TextStyle = function(options) {
  var params = Object.assign({
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 15,
    tracking: 0,
    align: 'left',
    features: [],
    fill: [0, 0, 0, 100],
  }, options);

  this.fontFamily = params.fontFamily;
  this.fontSize = params.fontSize;
  this.lineHeight = params.lineHeight;
  this.tracking = params.tracking;
  this.align = params.align;
  this.features = params.features;
  this.fill = params.fill;
};

module.exports = TextStyle;
