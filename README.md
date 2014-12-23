#Hapi route glob-registration

This was originally forked from https://github.com/opentable/hapi-route-auto-reg but I needed a way to pass a list of directories and wildcards.

Automatically scans the globs and registers the routes it finds within

installation:

```npm install hapi-route-glob-reg```

usage:

```
var hapi = require("hapi");

var server = Hapi.createServer('127.0.0.1', 3000, {});

// hapi <= 7.x
server.pack.register([
...
// hapi v8.x
server.register([
  {
    plugin: require("hapi-route-glob-reg"),
    options: {
      directory: ['./path/to/routes/**/']
    }
  }], function(err){
    if(err) {
      throw err;
    }
    
    server.start(function(){
      server.log('server started...');
    });
});

```

Scans the given directory for .js files which export a method ```.routes(plugin)``` and invokes them.

The routes files should look like this:

```
module.exports.routes = function(server){
    server.route([
        {
            method: 'GET',
            path: '/my/test/route',
            config: {
                handler: function(request, reply) {
                    ...
                }
            }
        }
    ]);
}
```
