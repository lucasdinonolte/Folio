var fs = require('fs');

var DummyRenderer = function(doc) {
  this.doc = doc;
}

DummyRenderer.prototype = {
  render: function() {
    console.log(this.doc.stage);
  },
}

// Satisfy the Interface
var renderMethods = ['save', 'restore', 'font', 'fontSize', 'lineGap', 'fill', 'text', 'stroke', 'scale', 'rotate', 'ellipse', 'rect', 'path', 'lineWidth'];

renderMethods.forEach(function(method) {
  DummyRenderer.prototype[method] = function() {
    return this;
  };
});

module.exports = DummyRenderer;
