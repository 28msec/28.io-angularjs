angular.module('datasources.api.28.io' , [])  
/**
 * <p>These resources can be used to manage and explore data sources. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_datasources</code>.</p>
 */
.factory('Datasources', function($q, $http, $rootScope){
    /**
     * @class Datasources
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/_datasources';

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
         * <p>This method retrieves the data sources that are configured for a project.</p>
         * @method
         * @name Datasources#listDatasources
         * @param {string} token - A project token., 
         * 
         */
        this.listDatasources = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources'
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
         * <p>This method retrieves the list of data sources from a specific category configured for the project. If no data source is present in the specified category an empty array is returned.</p>
         * @method
         * @name Datasources#listCategoryDatasources
         * @param {string} category - The data source category., 
         * @param {string} token - A project token., 
         * 
         */
        this.listCategoryDatasources = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + ''
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
         * <p>This method creates a new data source. According to the specified data source category, the connection to the data source will be tested within this method. If the test does not pass the credentials will not be stored and the reponse status code will be set to 422.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be created using this method.</p>
         * @method
         * @name Datasources#createDatasource
         * @param {string} category - The data source category., 
         * @param {string} name - The name of the data source. The data source name can contain any alphabetic letter, numbers, dots, or dashes, and must start with an alphabetic letter., 
         * @param {string} token - A project token., 
         * @param {boolean} default - Whether the new data source will be the default one for its category. The default value is false., 
         * @param {string} credentials - The data sources credentials as JSON., 
         * 
         */
        this.createDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + ''
            var url = domain + path;
            var params = {};
            if(parameters.name  === undefined) { 
                deferred.reject(new Error('The name parameter is required'));
                return deferred.promise;
            } else { 
                params['name'] = parameters.name; 
            }
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['default'] = parameters.default;
            var body = parameters.credentials;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body
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
         * <p>This method retrieves credentials from data source.</p><p class="callout-warning">Currently, the default MongoDB credentials cannot be retrieved using this method.</p>
         * @method
         * @name Datasources#getDatasource
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + ''
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
         * <p>This method updates a data source changing its name, whether it is default or not, or its credentials. At least one change, that is, one of the optional parameters, must be specified.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be modified through this method.</p>
         * @method
         * @name Datasources#updateDatasource
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * @param {string} name - The new name of the data source. If not specified the data source is not renamed., 
         * @param {boolean} default - Whether the data source should become (if true) or cease to be (if false) the default one for its category. If not specified the data source does not change its default status., 
         * @param {string} credentials - The new data sources credentials as JSON. If not specified the data sources credentials are not changed, 
         * 
         */
        this.updateDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['name'] = parameters.name;
            params['default'] = parameters.default;
            var body = parameters.credentials;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PATCH' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PATCH',
                url: url,
                params: params, data: body
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
         * <p>This method removes a data source.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be deleted through this method.</p>
         * @method
         * @name Datasources#removeDatasource
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + ''
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

        /**
         * <p>This method retrieves the list of available collections from a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#getDatasourceContents
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getDatasourceContents = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents'
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
         * <p>This method creates a new collection within a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#createCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} name - The name of the new collection., 
         * @param {string} token - A project token., 
         * 
         */
        this.createCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents'
            var url = domain + path;
            var params = {};
            if(parameters.name  === undefined) { 
                deferred.reject(new Error('The name parameter is required'));
                return deferred.promise;
            } else { 
                params['name'] = parameters.name; 
            }
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
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

        /**
         * <p>This method retrieves the metadata of a collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#getCollectionMetadata
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getCollectionMetadata = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + ''
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
         * <p>This method removes a collection from a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#removeCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + ''
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

        /**
         * <p>This method retrieves a list of items a the collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#listCollection
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
        this.listCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['offset'] = parameters.offset;
            params['limit'] = parameters.limit;
            params['expand'] = parameters.expand;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'GET',
                url: url,
                params: params, headers: {'Accept': parameters.accept}
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
         * <p>This method inserts an item into a data source collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#insertInCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * @param {string} item - The item to insert., 
         * 
         */
        this.insertInCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.item;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body
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
         * <p>This method truncates a collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#truncateCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.truncateCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items'
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

        /**
         * <p>This method retrieves a collection item.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#getItem
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * 
         */
        this.getItem = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items/' + parameters.identifier + ''
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
         * <p>This method updates a collection item.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#updateItem
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * @param {string} item - The new item., 
         * 
         */
        this.updateItem = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items/' + parameters.identifier + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.item;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
                url: url,
                params: params, data: body
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
         * <p>This method removes an item from a collection</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#removeItem
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeItem = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items/' + parameters.identifier + ''
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