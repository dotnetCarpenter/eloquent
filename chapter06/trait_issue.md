### Motivation
If you have a large code base which make use of prototype inheritance and/or 
classical object composition, transition to `traits.js` is difficult. I will illustrate
with simplified examples from 
[Eloquent JavaScript - Chapter 6](http://eloquentjavascript.net/06_object.html).
In order to make the examples transparent, I will avoid using syntactic sugar like es6
classes but will use es6 syntax for abstractions that does nothing to change
prototypal class behavior.

Functions not shown in the examples can be found at the bottom of this post.

The common data structure is an array with 4-tuples. We will render the data in a table and
encapsulate *cell* logic in classes.

```js
const dataList = [ // Cannabis varieties - source: http://www.turiba.lv/f/Latvijas_kanepju_nozre.Prieksizpete.pdf
  { breed: "Ferimon", "country of origin": "France", "Seed yield (kg/ha)": "800-900", "Plant height (cm)": "6.2" },
  { breed: "Bialobrzeskie", "country of origin": "Polen", "Seed yield (kg/ha)": "500-1,000", "Plant height (cm)": "8-9" },
  { breed: "USO-31", "country of origin": "Ukraine", "Seed yield (kg/ha)": "700-1,000", "Plant height (cm)": "3.5-7.0" },
  { breed: "Finola", "country of origin": "Finland", "Seed yield (kg/ha)": "400-1,800", "Plant height (cm)": "0.5-1.5" }
];
```

#### Case 1 - Object Composition ####

Foobar
 
```js
function TextCell(text) {
  this.text = text.split('\n');
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce((width, line) =>
    Math.max(width, line.length), 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  let result = [];
  for (let i = 0; i < height; i++) {
    let line = this.text[i] || '';
    result.push(line + replicate(' ', width - line.length));
  }
  return result;
};

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([replicate('-', width)]);
};

```



Common functions used in the examples:
```js
function colWidths(rows) {
  return rows.map(row => // create new array of equal size as rows
    row.minWidth() // fill each row with the minimum width (using the cell's minWidth method) 
  );
}

function rowHeights(rows) {
  return rows.map(row => // create new array of equal size as rows
    rows.reduce((max, cell) => // call minHeight() on each cell
      Math.max(max, cell.minHeight()) // and return the heighest value
    , 0)
  );
}

function replicate(string, times) {
  return times < 1 ? '' : string + replicate(string, times - 1);
}
```