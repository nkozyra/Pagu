# Pagu
Pagu - a super compact logical JS template parser.  Like mustache, but smaller with a few more bells.

## Usage:
```javascript
var myData = {}; // some object
var pagu = new Pagu(myData, "{{variable}} {{array.each}}{{scoped variable}}{{/array.each}} {{variable.!is(something)}}not valid{{/variable.is}}")
```

## Variables
As with Mustache, variables are just enclosed with curly braces.  If a variable does not exist, the template reference will be removed.
```javascript
{{variable}}
```

## Loops
Loops are handled with an .each call.
```javascript
{{somearray.each}}some inside stuff{{/somearray.each}}
```

## if : Existence checks
Allows testing on whether value exists at all (by type)
```javascript
{ "value": false }
{{value.if}}There is a value{{/value.if}} {{value.!if}}No value :({{/value.!if}}
```

## is : Value checks
Allows value-only comparison tests
```javascript
{{value.is(1)}}The value is one{{/value.is}}
{{value.!is(2)}}The value is not two!{{/value.!is}}
```

## empty : -arrays
Test for empty arrays
```javascript
{{array.empty}}Nothing here{{/array.empty}}
{{array.!empty}}Some items in this array!{{/array.!empty}}

## Callbacks
Callback functions are returned first in the parsing mechanism, so you can combine them with the previous mechanisms (loops, checks, etc.) Note: as the objects are rendered in order, any references to variables within the object's scope should be declared *before* a callback function.

For example:
```javascript
{ "foo": "bar", "baz": function() { return this.foo.toUpperCase(); } }
```
versus
```javascript
{ "baz": function() { return this.foo.toUpperCase(); }, "foo": "bar" }
```