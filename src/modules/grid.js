var Grid = function(options, doc) {
  var params = Object.assign({
    cols: 1,
    colGutter: 5,
    rows: 0,
    rowGutter: 0,
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

  for(var i = 0; i < params.margin.length; i++) {
    this.margin.push(doc.unit(params.margin[i]));
  }

  this.totalWidth = width - 2*bleed - this.margin[1] - this.margin[3];
  this.totalHeight = height - this.margin[0] - this.margin[2] - 2*bleed;
  this.colWidthWithoutGutter = this.totalWidth / this.cols;
  this.colWidth = this.colWidthWithoutGutter - this.colGutter;
};

Grid.prototype = {
  column: function(count) {
    var bleed = this.doc.getBleed(),
        n = count - 1,
        halfGutter = this.colGutter / 2,
        x = n * (this.totalWidth / this.cols) + halfGutter + bleed + this.margin[3],
        y = this.margin[2] + bleed,
        w = this.colWidth,
        h = this.totalHeight;

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
        w = this.colWidth + (delta*this.colWidthWithoutGutter),
        h = this.totalHeight;

    return {
      x: x,
      y: y,
      width: w,
      height: h
    };
  }
}

module.exports = Grid;
