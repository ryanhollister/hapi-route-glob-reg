var autoReg = require('./lib/auto-reg');

exports.register = function (plugin, options, next) {

    plugin.log(["debug"], "registering routes from " + options.directory + "...");

    autoReg.register(plugin, options.directory);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};