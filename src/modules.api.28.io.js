angular.module('modules.api.28.io', [])  
/**
 * <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
 * @namespace 'modules.api.28.io' 
 */
.factory('Modules', function($q, $http, $rootScope){
    /**
     * @constructor
     * @param {string} domain - The project domain
     * @param {string} cache - An angularjs cache implementation
     */
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
        
        /**
         * <p>This method retrieves the list of modules which can be imported by a project.</p><p>By default, only modules defined in the project will be listed. To also list system-provided modules, you can set the <code>include-system</code> query parameter to <code>true</code>.</p><p>To include module namespaces or source codes, you can set the <code>include-ns</code> or <code>include-src</code> query parameters to <code>true</code>. Regardless of the value of the <code>include-src</code> parameter, the source code of system modules will not be returned.</p><p>To filter the returned modules you can use the <code>starts-with</code> query parameter. In this case, only the modules which path starts with the specified string will be returned.</p><p>If two or more module have the same namespace and thus the same path, the details of the module which would be imported by a query are shown.</p>
         * @param {string} starts-with - Filter the available module by their module path., 
         * @param {boolean} include-system - Include modules provided by the platform., 
         * @param {boolean} include-ns - Include each module's namespace in the listing., 
         * @param {boolean} include-src - Include each module's source code in the listing., 
         * @param {string} token - A project token., 
         * 
         */
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

        /**
         * <p>This method retrieves the source code of a project module. The response content type is set according to the query language of the module. If the query does not <a href="http://www.w3.org/TR/xquery-30/#id-version-declaration" target="_blank">declare its own dialect</a> or cannot be parsed, the query language is considered to be <code>XQuery</code>.</p><p>This operation cannot be used to retrieve the source code of system modules.</p>
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * 
         */
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

        /**
         * <p>This method creates a new project module. If the <code>compile</code> option is <code>none</code>, the module will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the module to be created. To only create the module if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>lax</code>.</p><p>It is not allowed to create a project module with the same path of an existing system or project module. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * @param {string} module-body - The source code of the module., 
         * @param {string} compile - The kind of compilation to perform. The default is lax., 
         * @param {string} Content-Type - , 
         * 
         */
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

        /**
         * <p>This method creates or updates a project module. If the <code>compile</code> option is <code>none</code>, the module will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the module to be created or updated. To only create the module if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>lax</code>.</p><p>It is not allowed to update system modules. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * @param {string} module-body - The module source code, 
         * @param {string} compile - The kind of compilation to perform. The default is lax., 
         * 
         */
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

        /**
         * <p>This method removes the specified project module. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * 
         */
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