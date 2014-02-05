angular.module('auth.api.28.io', ['jmdobry.angular-cache'])
.factory('Auth', function($q, $http, $backend, $angularCacheFactory){

    var options = {
        storageMode: 'localStorage'
    };

    return function(domain, caches) {

        var AuthCache = caches['Auth'];

        var clearCache = function(){
            caches.forEach(function(cache){
                cache.removeAll();
            });
        };
        
        this.logout = function(){
            clearCache();
        };

        this.getSessionSync = function(){
            return AuthCache.get('session');
        };

        this.getSession = function(){
            var session = AuthCache.get('session');
            if(session) {
                var deferred = $q.defer();
                deferred.resolve(session);
                return deferred.promise;
            } else {
                return this.session('refresh_token', undefined, undefined, null);
            }
        };

        this.refreshSession = function(session){
            return this.session('refresh_token', undefined, undefined, session.refresh_token);
        };
        
        this.session = function(grant_type, email, password, refresh_token){
            var deferred = $q.defer();
            var url = '/auth';
            var params = {};
            params['grant_type'] = grant_type;
            params['email'] = email;
            params['password'] = password;
            params['refresh_token'] = refresh_token;
                
            $http({
                method: 'POST',
                url: domain + url,
                params: params
            })
            .success(function(data, status, headers, config){
                if(email) {
                    data.email = email;
                }
                if(refresh_token === undefined) {   
                    clearCache();   
                }
                AuthCache.put('session', data);
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config){
                //AuthCache.remove('session');
                deferred.reject(data);
            });
            return deferred.promise;
        };
 
        
        this.ping = function(){
            return $http({
                url: domain + '/ping',
                method: 'GET'
            });
        };
    };
})
;
