angular.module('datasources.api.28.io', [])  
/**
 * <p>These resources can be used to manage and explore data sources. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_datasources</code>.</p>
 * @namespace 'datasources.api.28.io' 
 */
.factory('Datasources', function($q, $http, $rootScope){
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
         * <p>This method retrieves the data sources that are configured for a project.</p>
         * @param {string} token - A project token., 
         * 
         */
        this.listDatasources = function(token){
            var deferred = $q.defer();
            var path = '/_datasources'
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
         * <p>This method retrieves the list of data sources from a specific category configured for the project. If no data source is present in the specified category an empty array is returned.</p>
         * @param {string} category - The data source category., 
         * @param {string} token - A project token., 
         * 
         */
        this.listCategoryDatasources = function(category, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + ''
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
         * <p>This method creates a new data source. According to the specified data source category, the connection to the data source will be tested within this method. If the test does not pass the credentials will not be stored and the reponse status code will be set to 422.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be created using this method.</p>
         * @param {string} category - The data source category., 
         * @param {string} name - The name of the data source. The data source name can contain any alphabetic letter, numbers, dots, or dashes, and must start with an alphabetic letter., 
         * @param {string} token - A project token., 
         * @param {boolean} default - Whether the new data source will be the default one for its category. The default value is false., 
         * @param {string} credentials - The data sources credentials as JSON., 
         * 
         */
        this.createDatasource = function(category, name, token, difault, credentials){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + ''
            var url = domain + path;
            var params = {};
            if(name  === undefined) { 
                deferred.reject(new Error('The name parameter is required'));
                return deferred.promise;
            } else { 
                params['name'] = name; 
            }
        if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            params['default'] = difault;
            var body = credentials;
            var cached = cache.get(url);
            if(cached && 'POST' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
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
         * <p>This method retrieves credentials from data source.</p><p class="callout-warning">Currently, the default MongoDB credentials cannot be retrieved using this method.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getDatasource = function(category, datasource, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + ''
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
         * <p>This method updates a data source changing its name, whether it is default or not, or its credentials. At least one change, that is, one of the optional parameters, must be specified.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be modified through this method.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * @param {string} name - The new name of the data source. If not specified the data source is not renamed., 
         * @param {boolean} default - Whether the data source should become (if true) or cease to be (if false) the default one for its category. If not specified the data source does not change its default status., 
         * @param {string} credentials - The new data sources credentials as JSON. If not specified the data sources credentials are not changed, 
         * 
         */
        this.updateDatasource = function(category, datasource, token, name, difault, credentials){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + ''
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            params['name'] = name;
            params['default'] = difault;
            var body = credentials;
            var cached = cache.get(url);
            if(cached && 'PATCH' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'PATCH',
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
         * <p>This method removes a data source.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be deleted through this method.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeDatasource = function(category, datasource, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + ''
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

        /**
         * <p>This method retrieves the list of available collections from a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getDatasourceContents = function(category, datasource, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents'
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
         * <p>This method creates a new collection within a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} name - The name of the new collection., 
         * @param {string} token - A project token., 
         * 
         */
        this.createCollection = function(category, datasource, name, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents'
            var url = domain + path;
            var params = {};
            if(name  === undefined) { 
                deferred.reject(new Error('The name parameter is required'));
                return deferred.promise;
            } else { 
                params['name'] = name; 
            }
        if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
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

        /**
         * <p>This method retrieves the metadata of a collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getCollectionMetadata = function(category, datasource, collection, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + ''
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
         * <p>This method removes a collection from a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeCollection = function(category, datasource, collection, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + ''
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

        /**
         * <p>This method retrieves a list of items a the collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * @param {integer} offset - The index of the first item from which to start listing the collection items. Default is 1., 
         * @param {integer} limit - The number of collection items to list. Default is 10., 
         * @param {boolean} expand - Whether to include the serialized item in the listing. The default value is false., 
         * @param {string} Accept - Value of the Accept header., 
         * 
         */
        this.listCollection = function(category, datasource, collection, token, offset, limit, expand, accept){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items'
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            params['offset'] = offset;
            params['limit'] = limit;
            params['expand'] = expand;
            var cached = cache.get(url);
            if(cached && 'GET' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'GET',
                url: url,
                params: params, headers: {'Accept': accept}
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
         * <p>This method inserts an item into a data source collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * @param {string} item - The item to insert., 
         * 
         */
        this.insertInCollection = function(category, datasource, collection, token, item){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items'
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            var body = item;
            var cached = cache.get(url);
            if(cached && 'POST' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
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
         * <p>This method truncates a collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.truncateCollection = function(category, datasource, collection, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items'
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

        /**
         * <p>This method retrieves a collection item.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * 
         */
        this.getItem = function(category, datasource, collection, identifier, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items/' + identifier + ''
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
         * <p>This method updates a collection item.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * @param {string} item - The new item., 
         * 
         */
        this.updateItem = function(category, datasource, collection, identifier, token, item){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items/' + identifier + ''
            var url = domain + path;
            var params = {};
            if(token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = token; 
            }
            var body = item;
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
         * <p>This method removes an item from a collection</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeItem = function(category, datasource, collection, identifier, token){
            var deferred = $q.defer();
            var path = '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items/' + identifier + ''
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