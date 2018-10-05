var Grid = function(options, doc) {
  var params = Object.assign({
    cols: 1,
    colGutter: 5,
    rows: 0,
    rowGutter: 5,
    margin: [0, 0, 0, 0]
  }, options);

  var bleed = doc.getBleed(),
      width = doc.getWidth(),
      height = doc.getHeight();

  this.doc = doc;
  this.colGutter = doc.unit(params.colGutter);
  this.rowGutter = doc.unit(params.rowGutter);
  this.cols = params.cols;
  this.rows = params.rows;
  this.margin = [];
  this.debugGridColor = [15, 75, 0, 0];

  for(var i = 0; i < params.margin.length; i++) {
    this.margin.push(doc.unit(params.margin[i]));
  }

  this.totalWidth = width - 2*bleed - this.margin[1] - this.margin[3];
  this.totalHeight = height - this.margin[0] - this.margin[2] - 2*bleed;
  this.colWidthWithoutGutter = this.totalWidth / this.cols;
  this.colWidth = this.colWidthWithoutGutter - (this.colGutter / this.cols * (this.cols-1));
  this.rowHeightWithoutGutter = this.totalHeight / this.rows;
  this.rowHeight = this.rowHeightWithoutGutter - (this.rowGutter / this.rows * (this.rows-1));
};

Grid.prototype = {
  column: function(count) {
    var bleed = this.doc.getBleed(),
        n = count - 1,
        halfGutter = this.colGutter / 2,
        x = (n * this.colWidth) + (n * this.colGutter) + bleed + this.margin[3],
        y = this.margin[0] + bleed,
        w = this.colWidth,
        h = this.totalHeight;

    return {
      x: x,
      y: y,
      width: w,
      height: h
    };
  },

  row: function(count) {
    var bleed = this.doc.getBleed(),
        n = count - 1,
        halfGutter = this.rowGutter / 2,
        y = (n * this.rowHeight) + (n * this.rowGutter) + bleed + this.margin[0],
        x = this.margin[3] + bleed,
        h = this.rowHeight,
        w = this.totalWidth;

    return {
      x: x,
      y: y,
      width: w,
      height: h
    };
  },

  colspan: function(from, to) {
    var startCol = this.column(from),
        delta = to - from,
        x = startCol.x,
        y = startCol.y,
        w = this.colWidth + (delta*(this.colWidth+this.colGutter)),
        h = this.totalHeight;

    return {
      x: x,
      y: y,
      width: w,
      height: h
    };
  },

  rowspan: function(from, to) {
    var startRow = this.row(from),
        delta = to - from,
        x = startRow.x,
        y = startRow.y,
        w = this.totalWidth,
        h = this.rowHeight + (delta*(this.rowHeight+this.rowGutter));

    return {
      x: x,
      y: y,
      width: w,
      height: h
    };
  },

  module: function(fromCol, toCol, fromRow, toRow) {
    var col = this.colspan(fromCol, toCol);
    var row = this.rowspan(fromRow, toRow);

    return {
      x: col.x,
      y: row.y,
      width: col.width,
      height: row.height
    };
  },

  draw: function() {
    for(var i = 0; i < this.cols; i++) {
      this.doc.rectangle(this.column(i+1)).stroke(this.debugGridColor);
    }
    for(var i = 0; i < this.rows; i++) {
      this.doc.rectangle(this.row(i+1)).stroke(this.debugGridColor);
    }
  }
}

module.exports = Grid;
