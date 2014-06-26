angular.module('project.api.28.io' , [])  
/**
 * Description Missing
 */
.factory('Project', function($q, $http, $rootScope){
    /**
     * @class Project
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/project';

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
         * This method requires a valid API token. The metadata of the projects owned by the account corresponding to the given API token will be returned.
         * @method
         * @name Project#listProjects
         * @param {string} token - An API token., 
         * 
         */
        this.listProjects = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project'
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
         * <p>The project name must be between 3 and 40 characters long. It can contain only letter, numerical digits and dashes (-). A dash cannot appear as the first character.</p><p>If the specified package is payed, the account must have billing information and a new recurly subscription will be created.</p><p>This method requires a valid API token. If the project is created successfully, the owner of the project is the account associated with the specified API token.</p>
         * @method
         * @name Project#createProject
         * @param {string} project-name - The project name., 
         * @param {string} template - A template name. If not specified the 'default' template will be used., 
         * @param {string} package - A package name. If not specified the 'free' package will be used., 
         * @param {string} token - An API token., 
         * 
         */
        this.createProject = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project'
            var url = domain + path;
            var params = {};
            if(parameters.projectName  === undefined) { 
                deferred.reject(new Error('The projectName parameter is required'));
                return deferred.promise;
            } else { 
                params['project-name'] = parameters.projectName; 
            }
            params['template'] = parameters.template;
            params['package'] = parameters.package;
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
         * This method requires no authentication.
         * @method
         * @name Project#checkProject
         * @param {string} name - The project name., 
         * 
         */
        this.checkProject = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + ''
            var url = domain + path;
            var params = {};
            
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('HEAD' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'HEAD',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                
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
         * This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#getProjectMetadata
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * 
         */
        this.getProjectMetadata = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + ''
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
         * This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#upgradeProject
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * 
         */
        this.upgradeProject = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
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
         * <p>This method allows to rename or change the package of a project. Only one of the two modifications can be performed at the same time.</p><p>If renaming, the new project name must be between 3 and 40 characters long. It can contain only letter, numerical digits and dashes (-). A dash cannot appear as the first character. This method requires a valid API token generated for the account which owns the specified project.</p><p>If changing the project package, the following conditions must be satisfied: <ul><li>the used account must have billing information;</li><li>the current project package must be free</li><li>the specified package type must be payed</li></ul></p>
         * @method
         * @name Project#updateProject
         * @param {string} name - The project name., 
         * @param {string} new-name - The new project name., 
         * @param {string} package - The project package., 
         * @param {string} token - An API token., 
         * 
         */
        this.updateProject = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + ''
            var url = domain + path;
            var params = {};
                params['new-name'] = parameters.newName;
            params['package'] = parameters.package;
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PATCH' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PATCH',
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
         * <p>If the project package is payed, the corresponding recurly subscription will be terminated.</p><p>This method requires a valid API token generated for the account which owns the specified project.</p>
         * @method
         * @name Project#deleteProject
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * 
         */
        this.deleteProject = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + ''
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
         * For "28msec", "local" and "none" databases the response will only contain the "db-type" field. This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#getDefaultMongoDBCredentials
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * 
         */
        this.getDefaultMongoDBCredentials = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + '/default-mongodb'
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
         * The specified credentials can be of the following kinds: "user", "mongolab", "28msec", "local", "none". For all database kinds except "user" no credentials have to be specified. For "user" databases, at least the "conn-string" and the "dbname" parameter have to be specified. This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#updateDefaultMongoDBCredentials
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * @param {string} db-type - The database type., 
         * @param {string} conn-string - The database connection string. Only for "user" databases., 
         * @param {string} db - The database name. Only for "user" databases., 
         * @param {string} user - The database user. Only for "user" databases., 
         * @param {string} pass - The database password. Only for "user" databases., 
         * @param {boolean} pre-digested - Whether the specified password is pre-digested or not. Only for "user" databases. Default is false., 
         * 
         */
        this.updateDefaultMongoDBCredentials = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + '/default-mongodb'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
        if(parameters.dbType  === undefined) { 
                deferred.reject(new Error('The dbType parameter is required'));
                return deferred.promise;
            } else { 
                params['db-type'] = parameters.dbType; 
            }
            params['conn-string'] = parameters.connString;
            params['db'] = parameters.db;
            params['user'] = parameters.user;
            params['pass'] = parameters.pass;
            params['pre-digested'] = parameters.preDigested;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
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
         * This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#testDefaultMongoDB
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * @param {string} conn-string - The database connection string., 
         * @param {string} db - The database name., 
         * @param {string} user - The database user., 
         * @param {string} pass - The database password., 
         * @param {boolean} pre-digested - Whether the specified password is pre-digested or not. Default is false., 
         * 
         */
        this.testDefaultMongoDB = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + '/test-mongodb'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
        if(parameters.connString  === undefined) { 
                deferred.reject(new Error('The connString parameter is required'));
                return deferred.promise;
            } else { 
                params['conn-string'] = parameters.connString; 
            }
        if(parameters.db  === undefined) { 
                deferred.reject(new Error('The db parameter is required'));
                return deferred.promise;
            } else { 
                params['db'] = parameters.db; 
            }
            params['user'] = parameters.user;
            params['pass'] = parameters.pass;
            params['pre-digested'] = parameters.preDigested;
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
         * This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#listCustomDomains
         * @param {string} name - The project name., 
         * @param {string} token - An API token., 
         * 
         */
        this.listCustomDomains = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + '/domains'
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
         * The custom domain name must be at least 3 characters long. It consists of two or more groups of characters separated by a single dot (.). The last group consists of 2 to 6 lowercase letters. Any other group consists of one or more lowercase letters, numerical digits and dashes (-). A dash cannot appear as the first character of the group. Morever, the custom domain name cannot end with: '.my28msec.com', '.28.io', '.xbrl.io' or '.devel.28msec.us'. This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#addCustomDomain
         * @param {string} name - The project name., 
         * @param {string} domain-name - The name of the new custom domain., 
         * @param {string} token - An API token., 
         * 
         */
        this.addCustomDomain = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + '/domains'
            var url = domain + path;
            var params = {};
            if(parameters.domainName  === undefined) { 
                deferred.reject(new Error('The domainName parameter is required'));
                return deferred.promise;
            } else { 
                params['domain-name'] = parameters.domainName; 
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
         * This method requires a valid API token generated for the account which owns the specified project.
         * @method
         * @name Project#deleteCustomDomain
         * @param {string} name - The project name., 
         * @param {string} domain-name - The project name., 
         * @param {string} token - An API token., 
         * 
         */
        this.deleteCustomDomain = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/project/' + parameters.name + '/domains/' + parameters.domainName + ''
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