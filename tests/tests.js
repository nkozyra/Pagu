QUnit.test( "Variable rendering", function( assert ) {
  var variableModel = { "testkey": "testvalue" };
  var variableTemplate = "<div>Value is {{testKey}}</div>";
  var build = new Pagu(variableModel,variableTemplate);
  document.getElementById('variable-test').innerHTML = (build.parsed);
  assert.ok( document.getElementById('variable-test').innerHTML == "<div>Value is testvalue</div>", "Passed variable build" );
});

QUnit.test( "Loop generation", function( assert ) {
  var variableModel = { "name": "array test", "list": [ {"itemKey":"value 1"}, {"itemKey":"value 2"} ] };
  var variableTemplate = "<div>Test {{name}} {{list.each}}<span>{{itemKey}}</span>{{/list.each}}</div>";
  var build = new Pagu(variableModel,variableTemplate);
  document.getElementById('loop-test').innerHTML = (build.parsed);
  assert.ok( document.getElementById('loop-test').innerHTML == "<div>Test array test <span>value 1</span><span>value 2</span></div>", "Passed loop generation" );
});

QUnit.test( "Value test (string)", function( assert ) {
  var dom = 'string-value-comparison';
  var variableModel = { "name": "valid value" };
  var variableTemplate = "<div>{{name.is(valid value)}}valid string!{{/name.is}}</div>";
  var build = new Pagu(variableModel,variableTemplate);
  document.getElementById(dom).innerHTML = (build.parsed);
  assert.ok( document.getElementById(dom).innerHTML == "<div>valid string!</div>", "Passed value test" );
});

QUnit.test( "Value test (int)", function( assert ) {
  var dom = 'int-value-comparison';
  var variableModel = { "name": 2 };
  var variableTemplate = "<div>{{name.is(2)}}valid int!{{/name.is}}</div>";
  var build = new Pagu(variableModel,variableTemplate);
  document.getElementById(dom).innerHTML = (build.parsed);
  assert.ok( document.getElementById(dom).innerHTML == "<div>valid int!</div>", "Passed value test" );
});