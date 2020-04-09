var fs = require('fs');
var PDF = require('pdfkit');

var PDFRenderer = function(doc) {
  this.doc = doc;
  this.document = null;
}

PDFRenderer.prototype = {
  render: function() {
    this.document = new PDF({
      size: [this.doc.getWidth(), this.doc.getHeight()]
    });

    var fileName = this.doc.name + '.pdf';

    this.document.pipe(fs.createWriteStream(fileName));

    for(var i = 0; i < this.doc.stage.length; i++) {
      this.document.save();
      this.doc.stage[i].render(this);
      this.document.restore();
    }

    this.document.end();
  }
};

// Satisfy the Interface
var renderMethods = ['addPage', 'save', 'restore', 'clip', 'font', 'fontSize', 'lineGap', 'fill', 'text', 'stroke', 'scale', 'rotate', 'ellipse', 'rect', 'path', 'lineWidth', 'image'];

renderMethods.forEach(function(method) {
  PDFRenderer.prototype[method] = function() {
    return this.document[method].apply(this.document, arguments);
  };
});

module.exports = PDFRenderer;
