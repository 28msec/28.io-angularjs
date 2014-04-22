angular.module('modules.api.28.io' , [])  
/**
 * <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
 */
.factory('Modules', function($q, $http, $rootScope){
    /**
     * @class Modules
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/_modules';

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
         * <p>This method retrieves the list of modules which can be imported by a project.</p><p>By default, only modules defined in the project will be listed. To also list system-provided modules, you can set the <code>include-system</code> query parameter to <code>true</code>.</p><p>To include module source codes, you can set the <code>include-src</code> query parameter to <code>true</code>. Regardless of the value of the <code>include-src</code> parameter, the source code of system modules will not be returned.</p><p>To perform namespace analysis and report for each module whether it has a namespace, the evenutal namespace URI and whether the module can be imported without location hints, set the <code>include-ns</code> query parameter to <code>true</code>.</p><p>To filter the returned modules you can use the <code>starts-with</code> query parameter. In this case, only the modules which path starts with the specified string will be returned.</p><p>If two or more module have the same namespace and thus the same path, the details of the module which would be imported by a query are shown.</p>
         * @method
         * @name Modules#listModules
         * @param {string} starts-with - Filter the available module by their module path., 
         * @param {boolean} include-system - Include modules provided by the platform., 
         * @param {boolean} include-ns - Include each module's namespace in the listing., 
         * @param {boolean} include-src - Include each module's source code in the listing., 
         * @param {string} token - A project token., 
         * 
         */
        this.listModules = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules'
            var url = domain + path;
            var params = {};
                params['starts-with'] = parameters.startsWith;
            params['include-system'] = parameters.includeSystem;
            params['include-ns'] = parameters.includeNs;
            params['include-src'] = parameters.includeSrc;
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
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

        /**
         * <p>This method retrieves the source code of a project module. The response content type is set according to the query language of the module. If the query does not <a href="http://www.w3.org/TR/xquery-30/#id-version-declaration" target="_blank">declare its own dialect</a> or cannot be parsed, the query language is considered to be <code>XQuery</code>.</p><p>This operation cannot be used to retrieve the source code of system modules.</p>
         * @method
         * @name Modules#getModule
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * 
         */
        this.getModule = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
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

        /**
         * <p>This method creates a new project module. If the <code>compile</code> option is <code>none</code>, the module will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the module to be created. To only create the module if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>lax</code>.</p><p>It is not allowed to create a project module with the same path of an existing system or project module, even if the existing module has a different extension. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @method
         * @name Modules#createModule
         * @param {string} module-path - The module path., 
         * @param {string} compile - The kind of compilation to perform. The default is "lax"., 
         * @param {string} extension - The new module extension. The default is "jq"., 
         * @param {string} token - A project token., 
         * @param {string} module-body - The source code of the module., 
         * @param {string} Content-Type - , 
         * 
         */
        this.createModule = function(parameters){
            var deferred = $q.defer();
            var contentType = 'text/plain; charset=utf-8';
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
                params['compile'] = parameters.compile;
            params['extension'] = parameters.extension;
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.moduleBody;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body, headers: {'Content-Type': parameters.contentType}
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //cache.removeAll();
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        /**
         * <p>This method creates or updates a project module. If the <code>compile</code> option is <code>none</code>, the module will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the module to be created or updated. To only create the module if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>lax</code>.</p><p>It is not allowed to update system modules. If the operation succeeds all existing modules with the same path, even with different extensions, are removed. Moreover, all precompiled queries depending on the updated module will be become non precompiled.</p>
         * @method
         * @name Modules#saveModule
         * @param {string} module-path - The module path., 
         * @param {string} compile - The kind of compilation to perform. The default is "lax"., 
         * @param {string} extension - The new module extension. The default is "jq"., 
         * @param {string} token - A project token., 
         * @param {string} module-body - The module source code, 
         * @param {string} Content-Type - , 
         * 
         */
        this.saveModule = function(parameters){
            var deferred = $q.defer();
            var contentType = 'text/plain; charset=utf-8';
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
                params['compile'] = parameters.compile;
            params['extension'] = parameters.extension;
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.moduleBody;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
                url: url,
                params: params, data: body, headers: {'Content-Type': parameters.contentType}
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //cache.removeAll();
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        /**
         * <p>This method removes the specified project module. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @method
         * @name Modules#removeModule
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeModule = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //cache.removeAll();
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