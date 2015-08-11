var Pagu = function(obj,template) {
 'use strict';

  var self = this;
  self.obj = obj;
  self.template = template;
  self.parsed = template;
  this.Pagu = function(tplObject,tplOverride) {
    var obj = (tplObject ? tplObject : self.obj);
    var parsed = ( tplOverride ? tplOverride : self.parsed );
    // console.log(obj)
    for (var o in obj) {

      //  Value comparisons
      var isTestPat = new RegExp("{{"+o+"\\.(is|!is)\\((.*?)\\)}}(.*?){{/"+o+"\\.is}}",'m');
      var valComp = isTestPat.exec(parsed);
      while (valComp != null) {
        var cmp = (valComp[1] == '!is' ? false : true);

        var innerTest = valComp[2];
        var removePat = new RegExp(valComp[0].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),'gm');
        var replaceString = '';
        if ((innerTest == obj[o]) === cmp) {
          replaceString = valComp[3];
        }
        var foo = new RegExp("{{name.is(2)}}valid int!{{\/name.is}}",'gm');
        parsed = parsed.replace(removePat,replaceString);
        valComp = isTestPat.exec(parsed);
      }

      var tplVar = new RegExp("{{"+o+"}}", 'gi');
      parsed = parsed.replace(tplVar, obj[o]);

      if (obj[o] instanceof Array) {
        var fullTpl = "{{"+o+"\.each}}(.*?){{/"+o+"\.each}}";
        var totTpl = ".*?" + fullTpl + ".*";
        var arrTplVar = new RegExp(fullTpl,'gim');
        var arrTotTpl = new RegExp(totTpl, 'gim');
        var innerTemplate = parsed.replace(arrTotTpl,'$1');
        var replacement = '';
        for (var i=0;i<obj[o].length;i++) {
          replacement += self.Pagu(obj[o][i], innerTemplate);
        }
        parsed = parsed.replace(arrTplVar,replacement);
      }
    };
    self.parsed = parsed;
    return self.parsed;
  }
  this.parse = function() {
    return self.parsed;
  };
  self.Pagu();
};