var walk = require("walk"),
    path = require("path");

module.exports.register = function(server, directory, next){
    var lastErr = null;

    walk.walkSync(directory, {
        listeners: {
            file: function(root, fileStats, nextFile){
                if(fileStats.name.substr(-3) === ".js") {
                    var file;
                    var filename = root + "/" + fileStats.name;
                    try{
                        file = require(path.resolve(filename));

                        if (file.routes) {
                            server.log(["routes"], "registering routes from file: " + filename);
                            file.routes(server);
                        }
                        else {
                            server.log(["routes"], "ignoring invalid file: " + filename);
                        }
                    }
                    catch(err){
                        return lastErr = new Error("error registering routes from file: " + filename + ", => " + err.toString());
                    }
                }
                nextFile();
            }
        }
    });

    next(lastErr);
};
