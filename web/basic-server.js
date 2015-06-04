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
  '/www.google.com': handler.handleRequest
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function (request, response) {
  var parts = urlParser.parse(request.url);
  var route = routes[parts.pathname];

  if (route) {
    console.log('=================>TRYING TO ROUTE');
    route(request, response);
  } else {
    console.log('==================> RESPOND 404')
    response.writeHead(404, helpers.headers);
    response.end('Not found');
  }

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
