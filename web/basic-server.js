var helpers = require('./http-helpers');
var http = require("http");
var urlParser = require('url');
var handler = require("./request-handler");
var initialize = require("./initialize.js");

// Why do you think we have this here?
// HINT:It has to do with what's in .gitignore
initialize();

var routes = {
  '/': handler.handleRequest,
  '/loading.html': handler.handleRequest,
  '/styles.css': handler.handleRequest,
  '/www.google.com': handler.handleRequest
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
