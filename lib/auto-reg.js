'use strict';
var path = require("path");

var glob = require("glob");
var reqFile, lastErr, files = [];

module.exports.register = function(server, directories, next) {
    if (typeof(directories) === 'string') { directories = [directories]; }
    var registerRoutes = function (file) {
        try {
            reqFile = require(path.resolve(file));
            if (reqFile.routes) {
                server.log(["routes"], "registering routes from file: " + file);
                reqFile.routes(server);
            } else {
                server.log(["routes"], "ignoring invalid file: " + file);
            }
        } catch(err) {
            return lastErr = new Error("error registering routes from file: " + file + ", => " + err.toString());
        }
    };
    files = directories.reduce(function(prev, directory ) { 
        return prev.concat(glob.sync(directory + '*.js'));
    }, []);
    if (files.length > 0) {
        files.map(registerRoutes);
    }
    next(lastErr);
};
