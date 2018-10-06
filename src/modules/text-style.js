var Text = require('../shapes/text');

var TextStyle = function(options) {
  var params = Object.assign({
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 15,
    tracking: 0,
    align: 'left',
    features: [],
    fill: true,
    fillColor: [0, 0, 0, 100],
    stroke: false,
    tracking: 0,
  }, options);

  this.fontFamily = params.fontFamily;
  this.fontSize = params.fontSize;
  this.lineHeight = params.lineHeight;
  this.tracking = params.tracking;
  this.align = params.align;
  this.features = params.features;
  this.fill = params.fill;
  this.fillColor = params.fillColor;
  this.stroke = params.stroke;
  this.strokeColor = params.strokeColor;
  this.tracking = params.tracking;
};

module.exports = TextStyle;
