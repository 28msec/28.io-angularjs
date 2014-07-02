/*jshint -W069 */
/*global angular:false */
angular.module('queries.api.28.io', [])
    .factory('Queries', function($q, $http, $rootScope) {
        'use strict';

        /**
         * <p>These resources can be used to manage and execute queries. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_queries</code>.</p>
         * @class " || Queries || "
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
             * Lists public and/or private queries
             * @method
             * @name Queries#listQueries
             * @param {{string}} visibility - The query visibility.
             * @param {{string}} token - A project token.
             *
             */
            this.listQueries = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{visibility}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['visibility'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: visibility'));
                    return deferred.promise;
                }

                path = path.replace('{visibility}', parameters['visibility']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                $http({
                    timeout: parameters.$timeout,
                    method: 'GET',
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
            /**
             * Executes a non-side-effecting query
             * @method
             * @name Queries#executeSimpleQuery
             * @param {{string}} accept - Value of the Accept header.
             * @param {{string}} queryPath - The query path. It starts with <code>public</code> or <code>private</code> and can contain slashes.
             * @param {{string}} format - The serialization method to use for the results of the executed query. When choosing a serialization method, this parameter has a lower priority than the <code>Accept</code> header.
             * @param {{boolean}} trace - Whether to enable the output of trace#2.
             * @param {{string}} token - A project token.
             *
             */
            this.executeSimpleQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}{format}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.accept !== undefined) {
                    headers['Accept'] = parameters['accept'];
                }

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                path = path.replace('{format}', parameters['format']);

                if (parameters['trace'] !== undefined) {
                    queryParameters['trace'] = parameters['trace'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                $http({
                    timeout: parameters.$timeout,
                    method: 'GET',
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
            /**
             * Executes a query
             * @method
             * @name Queries#executeQuery
             * @param {{string}} accept - Value of the Accept header.
             * @param {{string}} queryPath - The query path. It starts with <code>public</code> or <code>private</code> and can contain slashes.
             * @param {{string}} format - The serialization method to use for the results of the executed query. When choosing a serialization method, this parameter has a lower priority than the <code>Accept</code> header.
             * @param {{boolean}} async - Whether to execute the query asynchronously or not.
             * @param {{string}} outputCollection - The output collection when runnng the query asynchronously.
             * @param {{boolean}} trace - Whether to enable the output trace#2.
             * @param {{string}} token - A project token.
             *
             */
            this.executeQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}{format}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.accept !== undefined) {
                    headers['Accept'] = parameters['accept'];
                }

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                path = path.replace('{format}', parameters['format']);

                if (parameters['async'] !== undefined) {
                    queryParameters['async'] = parameters['async'];
                }

                if (parameters['outputCollection'] !== undefined) {
                    queryParameters['output-collection'] = parameters['outputCollection'];
                }

                if (parameters['trace'] !== undefined) {
                    queryParameters['trace'] = parameters['trace'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                var url = domain + path;
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
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
            /**
             * Retrieves a query source code
             * @method
             * @name Queries#getQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.getQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}/metadata/source';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                $http({
                    timeout: parameters.$timeout,
                    method: 'GET',
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
            /**
 * Creates a new query
 * @method
 * @name Queries#createQuery
 * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
 * @param {{string}} token - A project token.
 * @param {{string}} compile - The kind of compilation to perform. The default is none.
 * @param {{string}} queryBody - The source code of the query

 * 
 */
            this.createQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}/metadata/source';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['compile'] !== undefined) {
                    queryParameters['compile'] = parameters['compile'];
                }

                if (parameters['queryBody'] === undefined) {
                    deferred.reject(new Error('Missing required body parameter: queryBody'));
                    return deferred.promise;
                }

                if (parameters.queryBody !== undefined) {
                    body = parameters['queryBody'];
                }

                headers['Content-Type'] = 'text/plain; charset=utf-8';

                var url = domain + path;
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
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
            /**
 * Creates or updates a query
 * @method
 * @name Queries#saveQuery
 * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
 * @param {{string}} token - A project token.
 * @param {{string}} compile - The kind of compilation to perform. The default is none.
 * @param {{string}} queryBody - The query source code

 * 
 */
            this.saveQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}/metadata/source';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['compile'] !== undefined) {
                    queryParameters['compile'] = parameters['compile'];
                }

                if (parameters.queryBody !== undefined) {
                    body = parameters['queryBody'];
                }

                headers['Content-Type'] = 'text/plain; charset=utf-8';

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
            /**
             * Removes a query
             * @method
             * @name Queries#removeQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.removeQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}/metadata/source';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                var url = domain + path;
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
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
            /**
             * Retrieves a query execution plan
             * @method
             * @name Queries#getQueryPlan
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.getQueryPlan = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}/metadata/plan';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                $http({
                    timeout: parameters.$timeout,
                    method: 'GET',
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
            /**
             * Precompiles a query
             * @method
             * @name Queries#compileQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.compileQuery = function(parameters) {
                var deferred = $q.defer();

                var path = '/_queries/{query-path}/metadata/plan';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['queryPath'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters['queryPath']);

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
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
    });