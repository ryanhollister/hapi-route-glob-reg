var autoReg = require('./lib/auto-reg');

exports.register = function (server, options, next) {
    server.log(["routes"], "registering routes from " + options.directory + "...");
    autoReg.register(server, options.directory, next);
};

exports.register.attributes = {
    pkg: require('./package.json')
};
