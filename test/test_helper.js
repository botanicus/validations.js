var path = require("path");

// setup load paths
require.paths.unshift(path.dirname(__dirname));

// minitest
var minitest = require("minitest");
minitest.setupListeners();

// additional global objects
global.assert  = require("assert");
global.context = minitest.context;
