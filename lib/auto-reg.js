var fs = require("fs"),
    walk = require("walk"),
    path = require("path");

module.exports.register = function(server, directory){
    server.log(["debug"], "registering routes...");

    var registerRoutes = function(directory){
        walk.walkSync(directory, {
            listeners: {
                file: function(root, fileStats, next){
                    if(fileStats.name.substr(-3) === ".js") {
                        var route = require(path.resolve(root + "/" + fileStats.name));

                        if (route.routes) {
                            server.log(["debug"], "registering routes from file: " + fileStats.name);
                            route.routes(server);
                        }
                    }
                    next();
                }
            }
        });
    };

    registerRoutes(directory);
};