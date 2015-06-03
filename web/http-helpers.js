var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  var filepath = path.join(__dirname, asset);

  fs.readFile(filepath, function(error, file){
    if (error){
      // TODO: error handling
    }

    response.writeHead(200, headers);
    response.write(file);
    response.end();
  });
};

exports.archiveSite = function (request, response) {

  request.on('end', function (){

    var filepath = path.join(__dirname, '../archives/sites.txt')

    fs.appendFile(archive.paths.list, request._postData.url + '\n', 'utf8', function (error) {
      if (error) {
        throw error;
      }

      response.writeHead(302, headers);
      response.end();
    });

  });

};



// As you progress, keep thinking about what helper functions you can put here!
