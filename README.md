# Pagu
Pagu - a super compact logical JS template parser

## Usage:
```javascript
var myData = {}; // some object
var pagu = new Pagu(myData, "{{variable}} {{array.each}}{{scoped variable}}{{/array.each}} {{variable.!is(something)}}not valid{{/variable.is}}")
```
