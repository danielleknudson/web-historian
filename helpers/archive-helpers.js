var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require("http-request");
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// Takes callback function that expects one argument that is an array
exports.readListOfUrls = function(callback){
  fs.readFile(paths.list, "utf-8", function(error, data){
    if (error){
      throw error;
    }

    var results = data.split('\n');
    callback(results);
  });
};

exports.isUrlInList = function(urlString, callback){

  exports.readListOfUrls(function(array) {
    if (array.indexOf(urlString) >= 0) {
      callback(urlString, true);
    } else {
      callback(urlString, false);
    }
  });
};

exports.addUrlToList = function(urlString, response){

  fs.appendFile(paths.list, urlString + '\n', 'utf8', function (error) {
    if (error) {
      throw error;
    }

    console.log('==============================> Sending 302')
    headers['Location'] = '/loading.html'
    response.writeHead(302, headers);
    response.end();
  });

};

exports.isURLArchived = function(urlString, callback){

  fs.readdir(paths.archivedSites, function(error, files) {
    if (files.indexOf(urlString) >= 0) {
      callback(urlString, true);
    } else {
      callback(urlString, false);
    }
  });

};

exports.downloadUrls = function(urlString){

  console.log('=======================> downloadUrls getting: ' + urlString);

  httpRequest.get(urlString, paths.archivedSites + '/' + urlString, function(error, response){
    if (error){
      console.log("===================>downloadUrls Error: ");
      console.log(error);
    }
    console.log("Success: " + response.code);
  });
};
