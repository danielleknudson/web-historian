var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

var filepath = {
  '/': './public/index.html',
  '/loading.html': './public/loading.html',
  '/styles.css': './public/styles.css',
  '/www.google.com': '../archives/sites/www.google.com'
};

var actions = {
  'GET': function(request, response) {
    helpers.serveAssets(response, filepath[request.url], null);
  },
  'POST': function(request, response) {
    helpers.handlePost(request, response, null);
  },
  'OPTIONS': function(request, response){
    response.writeHead(200, helpers.headers);
    response.end();
  }
};


exports.handleRequest = function (request, response) {
  // console.log('==============>' + request.method + ' REQUEST | URL: ' + request.url);
  actions[request.method](request, response);

  // response.end(archive.paths.list);
};
