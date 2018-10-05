# Folio

Folio is a JavaScript library for programming graphic design systems as PDFs.

## Example
```
var Folio = require('folio');

var colors = {
  grey: [0, 0, 0, 20],
};

var doc = new Folio({
  unit: Folio.mm,
  width: 85,
  height: 55,
  bleed: 3,
  name: 'example-file.pdf'
});

var grid = new Folio.Grid({
  cols: 5,
  rows: 5,
}, doc);

for(var i = 1; i <= grid.cols; i++) {
  for(var j = 1; j <= grid.rows; j++) {
    doc.rectangle(grid.module(i, i, j, j)).fill(colors.grey);
  }
}

doc.render();
```
