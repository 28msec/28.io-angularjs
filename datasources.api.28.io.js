angular.module('datasources.api.28.io', [])
.factory('Datasources', function($q, $http){  

    return function(domain, cache) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        this.listDatasources = function(token){
            var deferred = $q.defer();
            var url = domain + '/_datasources';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.listCategoryDatasources = function(category, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.createDatasource = function(category, name, token, difault, credentials){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.getDatasource = function(category, datasource, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.updateDatasource = function(category, datasource, token, name, difault, credentials){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.removeDatasource = function(category, datasource, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.getDatasourceContents = function(category, datasource, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.createCollection = function(category, datasource, name, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.getCollectionMetadata = function(category, datasource, collection, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.removeCollection = function(category, datasource, collection, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.listCollection = function(category, datasource, collection, token, offset, limit, expand, accept){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.insertInCollection = function(category, datasource, collection, token, item){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.truncateCollection = function(category, datasource, collection, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.getItem = function(category, datasource, collection, identifier, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items/' + identifier + '';
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
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.updateItem = function(category, datasource, collection, identifier, token, item){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items/' + identifier + '';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };

        this.removeItem = function(category, datasource, collection, identifier, token){
            var deferred = $q.defer();
            var url = domain + '/_datasources/' + category + '/' + datasource + '/contents/' + collection + '/items/' + identifier + '';
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
                cache.remove(url);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);cache.remove(url);
            })
            ;
            }
            return deferred.promise;    
        };
    };
});