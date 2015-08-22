var Pagu = function(obj,template) {
 'use strict';

  var self = this;
  self.obj = obj;
  self.template = template;
  self.parsed = template;
  this.escapeRegexp = function(r) {
    return new RegExp(r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),'gm');
  };
  this.Pagu = function(tplObject,tplOverride) {
    var obj = (tplObject ? tplObject : self.obj);
    var parsed = ( tplOverride ? tplOverride : self.parsed );

    for (var o in obj) {
      if (obj.hasOwnProperty(o)) {

        // objcts
        if (obj[o] && {}.toString.call(obj[o]) === '[object Function]') {
         obj[o] = obj[o]();
        }

        //  Has value : {{var.if}}has value{{/var.if}}
        var ifTestPat = new RegExp("{{"+o+"\\.if}}(.*?){{/"+o+"\\.if}}","gm");
        var ifComp = ifTestPat.exec(parsed);
        while (ifComp != null) {
          var inner = ifComp[1];
          var remove = self.escapeRegexp(ifComp[0]);
          if (obj[o]) {
            parsed = parsed.replace(remove,inner);
          } else {
            parsed = parsed.replace(remove,'');
          }
          ifComp = ifTestPat.exec(parsed);
        }

        //  Value comparisons
        var isTestPat = new RegExp("{{"+o+"\\.(is|!is)\\((.*?)\\)}}(.*?){{/"+o+"\\.(\\1)}}","gm"); console.log('pat: ' + isTestPat);  
        var valComp = isTestPat.exec(parsed);
        while (valComp != null) {
          var cmp = (valComp[1] === '!is' ? false : true);
          var innerTest = valComp[2];
          var removePat = new RegExp(valComp[0].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),'gm');
          var replaceString = '';
          if ((innerTest == obj[o]) === cmp) {
            replaceString = valComp[3];
          }
          parsed = parsed.replace(removePat,replaceString);
          valComp = isTestPat.exec(parsed);
        }

        var tplVar = new RegExp("{{"+o+"}}", 'gi');
        parsed = parsed.replace(tplVar, obj[o]);


        if (obj[o] instanceof Array) {
          // empty array
          var emptyTest = "{{"+o+"\.empty}}(.*?){{/"+o+"\.empty}}";
          var emptyTplVar = new RegExp(emptyTest, 'gim');
          if (obj[o].length < 1) {
            parsed = parsed.replace(emptyTplVar,'$1');
          } else {
            parsed = parsed.replace(emptyTplVar, '');
          }
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
      }
    }
    var cleanupRegexp = new RegExp("{{([A-Za-z_0-9])+\..*?}}(.*?){{\/\\1\.*?}}","gm");
    parsed = parsed.replace(cleanupRegexp,'');
    var cleanUnsetVals = new RegExp("{{([A-Za-z_0-9])+}}","gm");
    parsed = parsed.replace(cleanUnsetVals, '');
    self.parsed = parsed;
    return self.parsed;
  };
  this.parse = function() {
    return self.parsed;
  };
  self.Pagu();
};