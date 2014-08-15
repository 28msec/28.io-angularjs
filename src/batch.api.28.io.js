/*jshint -W069 */
/*global angular:false */
angular.module('batch.api.28.io', [])
    .factory('Batch', ['$q', '$http', '$rootScope',
        function($q, $http, $rootScope) {
            'use strict';

            /**
             * <p>These resources can be used to perform batch operations. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_batch</code>.</p>
             * @class " || Batch || "
             * @param {string} domain - The project domain
             * @param {string} cache - An angularjs cache implementation
             */
            return function(domain, cache) {

                if (typeof(domain) !== 'string') {
                    throw new Error('Domain parameter must be specified as a string.');
                }

                this.$on = function($scope, path, handler) {
                    var url = domain + path;
                    $scope.$on(url, function() {
                        handler();
                    });
                    return this;
                };

                this.$broadcast = function(path) {
                    var url = domain + path;
                    //cache.remove(url);
                    $rootScope.$broadcast(url);
                    return this;
                };

                /**
                 * Import project contents from an archive
                 * @method
                 * @name Batch#importProject
                 * @param {{string}} url - The archive url.
                 * @param {{string}} archive - The archive contents.
                 * @param {{string}} root - The path inside the archive that contains the modules and queries folders. Use '/' as folder separator.
                 * @param {{string}} overwrite - Whether to overwrite current project queries and modules. Default is true.
                 * @param {{boolean}} deleteOrphaned - Whether to delete orphaned file or not. Default is false.
                 * @param {{boolean}} simulate - Whether to simulate the operation or not. Default is false.
                 * @param {{string}} token - A project token.
                 * @param {{string}} contentType - <p>These resources can be used to perform batch operations. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_batch</code>.</p>
                 *
                 */
                this.importProject = function(parameters) {
                    var deferred = $q.defer();

                    var path = '/_batch/project';

                    var body;
                    var queryParameters = {};
                    var headers = {};

                    if (parameters['url'] !== undefined) {
                        queryParameters['url'] = parameters['url'];
                    }

                    if (parameters.archive !== undefined) {
                        body = parameters['archive'];
                    }

                    if (parameters['root'] !== undefined) {
                        queryParameters['root'] = parameters['root'];
                    }

                    if (parameters['overwrite'] !== undefined) {
                        queryParameters['overwrite'] = parameters['overwrite'];
                    }

                    if (parameters['deleteOrphaned'] !== undefined) {
                        queryParameters['delete-orphaned'] = parameters['deleteOrphaned'];
                    }

                    if (parameters['simulate'] !== undefined) {
                        queryParameters['simulate'] = parameters['simulate'];
                    }

                    if (parameters['token'] === undefined) {
                        deferred.reject(new Error('Missing required query parameter: token'));
                        return deferred.promise;
                    }

                    if (parameters['token'] !== undefined) {
                        queryParameters['token'] = parameters['token'];
                    }

                    if (parameters.contentType !== undefined) {
                        headers['Content-Type'] = parameters['contentType'];
                    }

                    if (parameters.$queryParameters) {
                        Object.keys(parameters.$queryParameters)
                            .forEach(function(parameterName) {
                                var parameter = parameters.$queryParameters[parameterName];
                                queryParameters[parameterName] = parameter;
                            });
                    }

                    var url = domain + path;
                    $http({
                        timeout: parameters.$timeout,
                        method: 'PUT',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
                        .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                            if (parameters.$cache !== undefined) {
                                parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                            }
                        })
                        .error(function(data, status, headers, config) {
                            deferred.reject({
                                status: status,
                                headers: headers,
                                config: config,
                                body: data
                            });
                        });

                    return deferred.promise;
                };
            };
        }
    ]);