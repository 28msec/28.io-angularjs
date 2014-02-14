angular.module('auth.api.28.io', [])
.factory('Auth', function($q, $http, $rootScope){  

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
        
        this.authenticate = function(grant_type, email, password, refresh_token){
            var deferred = $q.defer();
            var path = '/auth'
            var url = domain + path;
            var params = {};
            if(grant_type  === undefined) { 
                deferred.reject(new Error('The grant_type parameter is required'));
                return deferred.promise;
            } else { 
                params['grant_type'] = grant_type; 
            }
            params['email'] = email;
            params['password'] = password;
            params['refresh_token'] = refresh_token;
            var cached = cache.get(url);
            if(cached && 'POST' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
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