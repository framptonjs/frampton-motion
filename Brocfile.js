var FramptonBuild = require('frampton-build');
var packages = {
  'frampton-motion' : { trees: null }
}

var build = new FramptonBuild({
  name     : 'frampton-motion',
  packages : packages
});

module.exports = build.getDistTree();