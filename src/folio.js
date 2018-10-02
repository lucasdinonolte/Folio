var fs = require('fs');
var PDF = require('pdfkit');

var Util = require('./util');

var Grid = require('./modules/grid');
var TextStyle = require('./modules/text-style');

var Rectangle = require("./shapes/rectangle");
var Ellipse = require("./shapes/ellipse");
var Text = require("./shapes/text");

var Folio = function(options) {
  var params = Object.assign({
    unit: Util.mm,
    width: 210,
    height: 297,
    name: 'file.pdf',
    pages: 1,
    bleed: 0,
  }, options);

  this.unit = params.unit;

  this.width = this.unit(params.width);
  this.height = this.unit(params.height);
  this.bleed = this.unit(params.bleed);
  this.name = params.name;
  this.pages = params.pages;

  this.stage = [];
};

Folio.prototype = {
  positionAndSize: function(x, y, w, h) {
    return {
      x: this.unit(x) + this.bleed,
      y: this.unit(y) + this.bleed,
      width: this.unit(w),
      height: this.unit(h),
    };
  },

  rectangle: function(options) {
    var r = new Folio.Rectangle(options);
    this.addElement(r);
    return r;
  },

  ellipse: function(options) {
    var e = new Folio.Ellipse(options);
    this.addElement(e);
    return e;
  },

  textBox: function(options) {
    var t = new Folio.Text(options);
    this.addElement(t);
    return t;
  },

  textBoxWithStyle: function(style, options) {
    var t = this.textBox(options);
    t.font(style.fontFamily);
    t.fontSize(style.fontSize);
    t.lineHeight(style.lineHeight);
    t.align(style.align);
    t.features(style.features);
    t.fill(style.fill);
    return t;
  },

  addElement: function(el) {
    this.stage.push(el);
  },

  getBleed: function() {
    return this.bleed;
  },

  getWidth: function() {
    return this.width + 2*this.bleed;
  },

  getHeight: function() {
    return this.height + 2*this.bleed;
  },

  render: function() {
    var doc = new PDF({
      size: [this.getWidth(), this.getHeight()]
    });

    doc.pipe(fs.createWriteStream(this.name));

    for(var i = 0; i < this.stage.length; i++) {
      doc.save();
      this.stage[i].render(doc);
      doc.restore();
    }

    doc.end();
  }
}

Object.assign(Folio, Util);

// Modules should be accessible through Folio
Folio.Rectangle = Rectangle;
Folio.Ellipse = Ellipse;
Folio.Text = Text;
Folio.Grid = Grid;
Folio.TextStyle = TextStyle;

module.exports = Folio;
