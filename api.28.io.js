angular.module('api.28.io', [
    'jmdobry.angular-cache',
    'queries.api.28.io', 'datasources.api.28.io', 'modules.api.28.io'
])
.factory('API', function(
    $angularCacheFactory,
    Datasources, Queries, Modules
){
        
    var options = { 
        storageMode: 'localStorage'
    };

    Modules.prototype.toPath = function(namespace){
        var abs = namespace.substring('http://'.length);
        var segments = abs.split('/');
        segments = segments[0].split('.').reverse().concat(segments.slice(1));
        return segments.join('/');
    };
        
    var keys = ['Auth', 'Account', 'Project', 'Queries', 'Datasources', 'Modules'];
    var caches = [];
    keys.forEach(function(key){
        caches[key] = $angularCacheFactory(key, options);
    });    
        
    return {

        Auth: new Auth('https://' + name + '.28.io', caches),

        Queries: function(name) {
            return new Queries('https://' + name + '.28.io', caches['Queries']);
        },
        Datasources: function(name) {
            return new Datasources('https://' + name + '.28.io', caches['Datasources']);
        }
    };
});
