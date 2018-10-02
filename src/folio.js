var fs = require('fs');
var PDF = require('pdfkit');

var Util = require('./util');

var Grid = require('./grid');

var Rectangle = require("./shapes/rectangle");

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
  rectangle: function(x, y, w, h) {
    var r = new Folio.Rectangle(x, y, w, h, this);
    this.addElement(r);
    return r;
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
      this.stage[i].render(doc);
    }

    doc.end();
  }
}

Object.assign(Folio, Util);

// Modules should be accessible through Folio
Folio.Rectangle = Rectangle;
Folio.Grid = Grid;

module.exports = Folio;
