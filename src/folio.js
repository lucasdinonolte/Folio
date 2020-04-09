var fs = require('fs');
var PDF = require('pdfkit');

var PDFRenderer = require('./renderers/pdf');
var DummyRenderer = require('./renderers/dummy');

var Util = require('./util');

var Page = require('./modules/page');
var Grid = require('./modules/grid');
var TextStyle = require('./modules/text-style');

var Rectangle = require("./shapes/rectangle");
var Ellipse = require("./shapes/ellipse");
var Text = require("./shapes/text");
var Path = require("./shapes/path");
var Image = require("./shapes/image");

var Folio = function(options) {
  var params = Object.assign({
    unit: Util.mm,
    width: 210,
    height: 297,
    name: 'file.pdf',
    pages: 1,
    bleed: 0,
    renderer: PDFRenderer,
  }, options);

  this.unit = params.unit;

  this.width = this.unit(params.width);
  this.height = this.unit(params.height);
  this.bleed = this.unit(params.bleed);
  this.name = params.name;
  this.pages = params.pages;
  this.renderer = new params.renderer(this);

  this.stage = [];
};

Folio.prototype = {
  position: function(x, y) {
    return {
      x: this.unit(x) + this.bleed,
      y: this.unit(y) + this.bleed,
    };
  },
  positionWithBleed: function(x, y) {
    var pos = this.position(x, y);
    return {
      x: pos.x - this.bleed,
      y: pos.y - this.bleed,
    };
  },
  positionAndSize: function(x, y, w, h) {
    return {
      x: this.unit(x) + this.bleed,
      y: this.unit(y) + this.bleed,
      width: this.unit(w),
      height: this.unit(h),
    };
  },
  positionAndSizeWithBleed: function(x, y, w, h) {
    var pos = this.positionAndSize(x, y, w, h);
    return {
      x: pos.x - this.bleed,
      y: pos.y - this.bleed,
      width: pos.width + 2*this.bleed,
      height: pos.height + 2*this.bleed,
    };
  },
  page: function(options) {
    var p = new Folio.Page(options, this, this.pages);
    this.addElement(p);
    this.pages++;
    return p;
  },
  background: function(color) {
    var r = this.rectangle(this.positionAndSize(0, 0, this.width, this.height));
    r.fill(color);
    this.addElement(r);
    return r;
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

  path: function(options) {
    var p = new Folio.Path(options);
    this.addElement(p);
    return p;
  },

  image: function(src, options) {
    var i = new Folio.Image(src, options);
    this.addElement(i);
    return i;
  },

  textBox: function(options) {
    var t = new Folio.Text(options);
    this.addElement(t);
    return t;
  },

  textBoxWithStyle: function(style, options) {
    var t = this.textBox(options);
    t.applyTextStyle(style);
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
    this.renderer.render();
  }
}

Object.assign(Folio, Util);

// Modules should be accessible through Folio
Folio.Rectangle = Rectangle;
Folio.Ellipse = Ellipse;
Folio.Text = Text;
Folio.Path = Path;
Folio.Image = Image;
Folio.Page = Page;
Folio.Grid = Grid;
Folio.TextStyle = TextStyle;

Folio.PDFRenderer = PDFRenderer;
Folio.DummyRenderer = DummyRenderer;

module.exports = Folio;
