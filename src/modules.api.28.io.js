angular.module('modules.api.28.io', [])
.factory('Modules', function($q, $http, $rootScope){  

    return function(domain, cache) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }

        this.$on = function($scope, path, handler) {
            var url = domain + path;
            $scope.$on(url, function(){
                handler();
            });
            return this;
        };

        this.$broadcast = function(path){
            var url = domain + path;
            //cache.remove(url);
            $rootScope.$broadcast(url);
            return this;
        };
        
        this.listModules = function(startsWith, includeSystem, includeNs, includeSrc, token){
            var deferred = $q.defer();
            var path = '/_modules'
            var url = domain + path;
            var params = {};
                params['starts-with'] = startsWith;
            params['include-system'] = includeSystem;
            params['include-ns'] = includeNs;
            params['include-src'] = includeSrc;
        if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            var cached = cache.get(url);
            if(cached && 'GET' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'GET',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                cache.put(url, data);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        this.getModule = function(modulePath, token){
            var deferred = $q.defer();
            var path = '/_modules/' + modulePath + ''
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            var cached = cache.get(url);
            if(cached && 'GET' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'GET',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                cache.put(url, data);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        this.createModule = function(modulePath, token, moduleBody, compile){
            var deferred = $q.defer();
            var contentType = 'text/plain; charset=utf-8';
            var path = '/_modules/' + modulePath + ''
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            params['compile'] = compile;
            var body = moduleBody;
            var cached = cache.get(url);
            if(cached && 'POST' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
                url: url,
                params: params, data: body, headers: {'Content-Type': contentType}
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                cache.removeAll();
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        this.saveModule = function(modulePath, token, moduleBody, compile){
            var deferred = $q.defer();
            var path = '/_modules/' + modulePath + ''
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            params['compile'] = compile;
            var body = moduleBody;
            var cached = cache.get(url);
            if(cached && 'PUT' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'PUT',
                url: url,
                params: params, data: body
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                cache.removeAll();
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        this.removeModule = function(modulePath, token){
            var deferred = $q.defer();
            var path = '/_modules/' + modulePath + ''
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            var cached = cache.get(url);
            if(cached && 'DELETE' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'DELETE',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                cache.removeAll();
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };
    };
});