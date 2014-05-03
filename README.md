#Hapi route auto-registration
---
[![Build Status](https://travis-ci.org/andyroyle/hapi-route-auto-reg.png?branch=master)](https://travis-ci.org/andyroyle/hapi-route-auto-reg) [![NPM version](https://badge.fury.io/js/hapi-route-auto-reg.png)](http://badge.fury.io/js/hapi-route-auto-reg) ![Dependencies](https://david-dm.org/andyroyle/hapi-route-auto-reg.png)

Automatically scans the directory and registers the routes it finds within

installation:

```npm install hapi-route-auto-reg```

usage:

```
var hapi = require("hapi");
var routes = require('hapi-routes-auto-reg');

var server = Hapi.createServer('127.0.0.1', 3000, {});

routes.register(server, './path/to/routes');
```

Scans the given directory for .js files which export a method ```.routes(server)``` and invokes them.

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