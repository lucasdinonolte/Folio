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
});

var grid = new Folio.Grid({
  cols: 5
}, doc);

for(var i = 0; i < grid.cols; i++) {
  var col = grid.column(i+1);
  doc.rectangle(col.x, col.y, col.width, col.height).fill(colors.grey);
}

doc.render();
```
