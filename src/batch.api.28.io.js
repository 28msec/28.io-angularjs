angular.module('batch.api.28.io' , [])  
/**
 * <p>These resources can be used to perform batch operations. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_batch</code>.</p>
 */
.factory('Batch', function($q, $http, $rootScope){
    /**
     * @class Batch
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/_batch';

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
         * <p>This method imports modules and public/private queries from an archive. The archive can either be specified through the <code>url</code> query parameter or through the request body.</p><p>The following archive formats and compression algorithms are supported: <ul><li>ZIP (with compression DEFLATE or STORE)</li><li>TAR (with compression GZIP)</li></ul></p><p>When importing, modules will be loaded from the <code>lib</code> and <code>modules</code> folders (if any), whereas public and private queries will loaded from the <code>public</code> and <code>private</code> folders, respectively. These folders will be first searched in the root of the archive. If none of these folders is found and the archive root contains a single folder, or a folder named <code>queries</code>, the search will be repeated in that folder. If the archive has a different structure you can specify the path inside the archive where the modules and queries folders are located through the root parameter.</p><p>The subfolder structure will be preserved during the import.</p><p>The behaviour of the import can be controlled through the <code>overwrite</code> and <code>delete-orphaned</code> parameters. By default, orphaned file are removed and existing modules and queries are overwritten. To see the changes that will be performed by a request before they are made, you can use the <code>simulate</code> query parameter.</p><p>The response contains the list of queries and modules of the project along with the taken action. Additionally a list of the files contained in the archive which have been ignored is returned. If the operation succeeds any precompiled query which source has been updated or depending on an updated module will be deleted.</p>
         * @method
         * @name Batch#importProject
         * @param {string} url - The archive url., 
         * @param {string} archive - The archive contents., 
         * @param {string} root - The path inside the archive that contains the modules and queries folders. Use '/' as folder separator., 
         * @param {string} overwrite - Whether to overwrite current project queries and modules. Default is true., 
         * @param {boolean} delete-orphaned - Whether to delete orphaned file or not. Default is false., 
         * @param {boolean} simulate - Whether to simulate the operation or not. Default is false., 
         * @param {string} token - A project token., 
         * @param {string} Content-Type - , 
         * 
         */
        this.importProject = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_batch/project'
            var url = domain + path;
            var params = {};
                params['url'] = parameters.url;
            params['root'] = parameters.root;
            params['overwrite'] = parameters.overwrite;
            params['delete-orphaned'] = parameters.deleteOrphaned;
            params['simulate'] = parameters.simulate;
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.archive;
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
    };
});