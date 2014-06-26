angular.module('package.api.28.io' , [])  
/**
 * Description Missing
 */
.factory('Package', function($q, $http, $rootScope){
    /**
     * @class Package
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/packages';

        this.$on = function($scope, path, handler) {
            var url = domain + path;
            $scope.$on(url, function(event, data){
                handler(data);
            });
            return this;
        };

        this.$broadcast = function(path, data){
            var url = domain + path;
            $rootScope.$broadcast(url, data);
            return this;
        };
        
        /**
         * By default packages of all categories are listed. To list only packages of a given category the <code>category</code> parameter can be used. This method requires no authentication.
         * @method
         * @name Package#listPackages
         * @param {string} category - The package category, 
         * 
         */
        this.listPackages = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/package'
            var url = domain + path;
            var params = {};
                params['category'] = parameters.category;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'GET',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //that.$broadcast(url);
                if(parameters.$cache !== undefined) parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };
    };
});