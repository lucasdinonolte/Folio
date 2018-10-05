var Page = function(options, doc, pagina) {
  this.document = doc;
  this.pagina = pagina;

  this.document.textBox(this.document.positionAndSize(105, 112.5, 10, 10)).align('right').text(pagina).fontSize(8).fill([0,0,0,100]);
};

Page.prototype = {
  render: function(renderer) {
    renderer.addPage({
      size: [this.document.getWidth(), this.document.getHeight()]
    });
  },
};

module.exports = Page;
