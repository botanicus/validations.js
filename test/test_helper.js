var path = require("path");

// setup load paths
require.paths.unshift(path.dirname(__dirname));

// minitest
var minitest = require("minitest");
minitest.setupListeners();

// additional global objects
global.assert  = require("assert");
global.context = minitest.context;

// include matchers
var matchers = require("../validations_matchers");

for (key in matchers) {
  assert[key] = matchers[key];
};
