describe('auto-reg tests', function(){
    var should = require('should'),
        autoReg = require('../lib/auto-reg'),
        r = [],
        plugin = {
            route: function(routes){
                r = r.concat(routes);
            },
            log: function(tags, message){}
        };

    beforeEach(function(){
        r = [];
    });

    it('should scan the directory', function(){
        autoReg.register(plugin, './tests/test-routes/simple/');
        r.length.should.eql(1);
    });

    it('should invoke the registration method', function(){
        autoReg.register(plugin, './tests/test-routes/simple/');
        r[0].path.should.eql('/my/test/route');
    });

    it('should search recursively', function(){
        autoReg.register(plugin, './tests/test-routes/recursive/');
        r.length.should.eql(2);
    });

    it('should ignore files without a .js extension', function(){
        autoReg.register(plugin, './tests/test-routes/ignore-non-js-files/');
        r.length.should.eql(1);
        r[0].path.should.eql('/my/test/route');
    });

    it('should only invoke modules that are valid', function(){
        autoReg.register(plugin, './tests/test-routes/ignore-invalid-modules/');
        r.length.should.eql(1);
        r[0].path.should.eql('/my/test/route');
    });

    it('should cope with a non-existent directory', function(){
        autoReg.register(plugin, './tests/test-routes/notexist/');
        r.length.should.eql(0);
    });

    it('should handle errors during registration', function(){
        autoReg.register(plugin, './tests/test-routes/handle-exceptions/');
        r.length.should.eql(0);
    });
});