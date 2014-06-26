/*global angular:false */
/**
 * <p>This OAuth2 compliant API can be used to authorize requests. The endpoint for these methods is <code>http://portal.28.io/auth</code>.</p>
 */
angular.module('auth.api.28.io', [])
    .factory('Auth', function($q, $http, $rootScope) {
        'use strict';

        /**
         * @class " || Auth || "
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

            /*
             * Creates or refreshes authorization tokens
             * @method
             * @name Auth#authenticate
             * @param {{string}} grant_type - Authorization grant type. Use <code>client_credentials</code> to create a token or <code>refresh_token</code> to refresh a token
             * @param {{string}} email - The account email. Mandatory if <code>grant_type=client_credentials</code>.
             * @param {{string}} password - The account password. Mandatory if <code>grant_type=client_credentials</code>.
             * @param {{string}} refresh_token - The <code>refresh_token</code> obtained in the last successful request to this endpoint.  Mandatory if <code>grant_type=refresh_token</code>.
             *
             */
            this.authenticate = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/auth';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.grant_type === undefined) {
                    deferred.reject(new Error('Missing required query parameter: grant_type'));
                    return deferred.promise;
                }

                queryParameters['grant_type'] = parameters.grant_type;

                queryParameters['email'] = parameters.email;

                queryParameters['password'] = parameters.password;

                queryParameters['refresh_token'] = parameters.refresh_token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
        };
    });/*global angular:false */
/**
 * <p>These resources can be used to manage and execute queries. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_queries</code>.</p>
 */
angular.module('queries.api.28.io', [])
    .factory('Queries', function($q, $http, $rootScope) {
        'use strict';

        /**
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

            /*
             * Lists public and/or private queries
             * @method
             * @name Queries#listQueries
             * @param {{string}} visibility - The query visibility.
             * @param {{string}} token - A project token.
             *
             */
            this.listQueries = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{visibility}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.visibility === undefined) {
                    deferred.reject(new Error('Missing required path parameter: visibility'));
                    return deferred.promise;
                }

                path = path.replace('{visibility}', parameters.visibility);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
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
                var that = this;

                var path = '/_queries/{query-path}{format}';

                var body;
                var queryParameters = {};
                var headers = {};

                headers[Accept] = parameters.accept;

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                path = path.replace('{format}', parameters.format);

                queryParameters['trace'] = parameters.trace;

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
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
                var that = this;

                var path = '/_queries/{query-path}{format}';

                var body;
                var queryParameters = {};
                var headers = {};

                headers[Accept] = parameters.accept;

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                path = path.replace('{format}', parameters.format);

                queryParameters['async'] = parameters.async;

                queryParameters['output-collection'] = parameters.outputCollection;

                queryParameters['trace'] = parameters.trace;

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Retrieves a query source code
             * @method
             * @name Queries#getQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.getQuery = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{query-path}/metadata/source';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Creates a new query
             * @method
             * @name Queries#createQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             * @param {{string}} compile - The kind of compilation to perform. The default is none.
             * @param {{string}} queryBody - The source code of the query
             * @param {{string}} contentType - <p>These resources can be used to manage and execute queries. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_queries</code>.</p>
             *
             */
            this.createQuery = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{query-path}/metadata/source';

                var contentType = 'text/plain; charset=utf-8';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                queryParameters['compile'] = parameters.compile;

                if (parameters.queryBody === undefined) {
                    deferred.reject(new Error('Missing required body parameter: queryBody'));
                    return deferred.promise;
                }

                body = parameters.queryBody;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Creates or updates a query
             * @method
             * @name Queries#saveQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             * @param {{string}} compile - The kind of compilation to perform. The default is none.
             * @param {{string}} queryBody - The query source code
             * @param {{string}} contentType - <p>These resources can be used to manage and execute queries. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_queries</code>.</p>
             *
             */
            this.saveQuery = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{query-path}/metadata/source';

                var contentType = 'text/plain; charset=utf-8';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                queryParameters['compile'] = parameters.compile;

                body = parameters.queryBody;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Removes a query
             * @method
             * @name Queries#removeQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.removeQuery = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{query-path}/metadata/source';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Retrieves a query execution plan
             * @method
             * @name Queries#getQueryPlan
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.getQueryPlan = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{query-path}/metadata/plan';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Precompiles a query
             * @method
             * @name Queries#compileQuery
             * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
             * @param {{string}} token - A project token.
             *
             */
            this.compileQuery = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_queries/{query-path}/metadata/plan';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.queryPath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: queryPath'));
                    return deferred.promise;
                }

                path = path.replace('{query-path}', parameters.queryPath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
        };
    });/*global angular:false */
/**
 * <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
 */
angular.module('modules.api.28.io', [])
    .factory('Modules', function($q, $http, $rootScope) {
        'use strict';

        /**
         * @class " || Modules || "
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

            /*
             * Lists available modules
             * @method
             * @name Modules#listModules
             * @param {{string}} startsWith - Filter the available module by their module path.
             * @param {{boolean}} includeSystem - Include modules provided by the platform.
             * @param {{boolean}} includeNs - Include each module's namespace in the listing.
             * @param {{boolean}} includeSrc - Include each module's source code in the listing.
             * @param {{string}} token - A project token.
             *
             */
            this.listModules = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_modules';

                var body;
                var queryParameters = {};
                var headers = {};

                queryParameters['starts-with'] = parameters.startsWith;

                queryParameters['include-system'] = parameters.includeSystem;

                queryParameters['include-ns'] = parameters.includeNs;

                queryParameters['include-src'] = parameters.includeSrc;

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Retrieves the source code of the specified project module
             * @method
             * @name Modules#getModule
             * @param {{string}} modulePath - The module path.
             * @param {{string}} token - A project token.
             *
             */
            this.getModule = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_modules/{module-path}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.modulePath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: modulePath'));
                    return deferred.promise;
                }

                path = path.replace('{module-path}', parameters.modulePath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Creates a new project module
             * @method
             * @name Modules#createModule
             * @param {{string}} modulePath - The module path.
             * @param {{string}} compile - The kind of compilation to perform. The default is "lax".
             * @param {{string}} extension - The new module extension. The default is "jq".
             * @param {{string}} token - A project token.
             * @param {{string}} moduleBody - The source code of the module.
             * @param {{string}} contentType - <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
             *
             */
            this.createModule = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_modules/{module-path}';

                var contentType = 'text/plain; charset=utf-8';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.modulePath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: modulePath'));
                    return deferred.promise;
                }

                path = path.replace('{module-path}', parameters.modulePath);

                queryParameters['compile'] = parameters.compile;

                queryParameters['extension'] = parameters.extension;

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                body = parameters.moduleBody;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Creates or updates the specified project module
             * @method
             * @name Modules#saveModule
             * @param {{string}} modulePath - The module path.
             * @param {{string}} compile - The kind of compilation to perform. The default is "lax".
             * @param {{string}} extension - The new module extension. The default is "jq".
             * @param {{string}} token - A project token.
             * @param {{string}} moduleBody - The module source code
             * @param {{string}} contentType - <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
             *
             */
            this.saveModule = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_modules/{module-path}';

                var contentType = 'text/plain; charset=utf-8';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.modulePath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: modulePath'));
                    return deferred.promise;
                }

                path = path.replace('{module-path}', parameters.modulePath);

                queryParameters['compile'] = parameters.compile;

                queryParameters['extension'] = parameters.extension;

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                body = parameters.moduleBody;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Removes the specified project module
             * @method
             * @name Modules#removeModule
             * @param {{string}} modulePath - The module path.
             * @param {{string}} token - A project token.
             *
             */
            this.removeModule = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_modules/{module-path}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.modulePath === undefined) {
                    deferred.reject(new Error('Missing required path parameter: modulePath'));
                    return deferred.promise;
                }

                path = path.replace('{module-path}', parameters.modulePath);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
        };
    });/*global angular:false */
/**
 * <p>These resources can be used to manage and explore data sources. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_datasources</code>.</p>
 */
angular.module('datasources.api.28.io', [])
    .factory('Datasources', function($q, $http, $rootScope) {
        'use strict';

        /**
         * @class " || Datasources || "
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

            /*
             * Lists all data sources
             * @method
             * @name Datasources#listDatasources
             * @param {{string}} token - A project token.
             *
             */
            this.listDatasources = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Lists all data sources in a specific category
             * @method
             * @name Datasources#listCategoryDatasources
             * @param {{string}} category - The data source category.
             * @param {{string}} token - A project token.
             *
             */
            this.listCategoryDatasources = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Creates a new data source
             * @method
             * @name Datasources#createDatasource
             * @param {{string}} category - The data source category.
             * @param {{string}} name - The name of the data source. The data source name can contain any alphabetic letter, numbers, dots, or dashes, and must start with an alphabetic letter.
             * @param {{string}} token - A project token.
             * @param {{boolean}} difault - Whether the new data source will be the default one for its category. The default value is false.
             * @param {{string}} credentials - The data sources credentials as JSON.
             *
             */
            this.createDatasource = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.name === undefined) {
                    deferred.reject(new Error('Missing required query parameter: name'));
                    return deferred.promise;
                }

                queryParameters['name'] = parameters.name;

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                queryParameters['default'] = parameters.difault;

                if (parameters.credentials === undefined) {
                    deferred.reject(new Error('Missing required body parameter: credentials'));
                    return deferred.promise;
                }

                body = parameters.credentials;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Retrieves a data source credentials
             * @method
             * @name Datasources#getDatasource
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} token - A project token.
             *
             */
            this.getDatasource = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Updates a data source
             * @method
             * @name Datasources#updateDatasource
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} token - A project token.
             * @param {{string}} name - The new name of the data source. If not specified the data source is not renamed.
             * @param {{boolean}} difault - Whether the data source should become (if true) or cease to be (if false) the default one for its category. If not specified the data source does not change its default status.
             * @param {{string}} credentials - The new data sources credentials as JSON. If not specified the data sources credentials are not changed
             *
             */
            this.updateDatasource = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                queryParameters['name'] = parameters.name;

                queryParameters['default'] = parameters.difault;

                body = parameters.credentials;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'PATCH',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Removes a data source
             * @method
             * @name Datasources#removeDatasource
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} token - A project token.
             *
             */
            this.removeDatasource = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * List available collections
             * @method
             * @name Datasources#getDatasourceContents
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} token - A project token.
             *
             */
            this.getDatasourceContents = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Creates collection
             * @method
             * @name Datasources#createCollection
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} name - The name of the new collection.
             * @param {{string}} token - A project token.
             *
             */
            this.createCollection = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.name === undefined) {
                    deferred.reject(new Error('Missing required query parameter: name'));
                    return deferred.promise;
                }

                queryParameters['name'] = parameters.name;

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Retrieves metadata about a collection
             * @method
             * @name Datasources#getCollectionMetadata
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} token - A project token.
             *
             */
            this.getCollectionMetadata = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Removes a collection
             * @method
             * @name Datasources#removeCollection
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} token - A project token.
             *
             */
            this.removeCollection = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Lists collection items
             * @method
             * @name Datasources#listCollection
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} token - A project token.
             * @param {{integer}} offset - The index of the first item from which to start listing the collection items. Default is 1.
             * @param {{integer}} limit - The number of collection items to list. Default is 10.
             * @param {{boolean}} expand - Whether to include the serialized item in the listing. The default value is false.
             * @param {{string}} accept - Serialization format.
             *
             */
            this.listCollection = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                queryParameters['offset'] = parameters.offset;

                queryParameters['limit'] = parameters.limit;

                queryParameters['expand'] = parameters.expand;

                headers[Accept] = parameters.accept;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Inserts an item into a collection
             * @method
             * @name Datasources#insertInCollection
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} token - A project token.
             * @param {{string}} item - The item to insert.
             *
             */
            this.insertInCollection = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                if (parameters.item === undefined) {
                    deferred.reject(new Error('Missing required body parameter: item'));
                    return deferred.promise;
                }

                body = parameters.item;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Truncates a collection
             * @method
             * @name Datasources#truncateCollection
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} token - A project token.
             *
             */
            this.truncateCollection = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Retrieves a collection item
             * @method
             * @name Datasources#getItem
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} identifier - The item identifier.
             * @param {{string}} token - A project token.
             *
             */
            this.getItem = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.identifier === undefined) {
                    deferred.reject(new Error('Missing required path parameter: identifier'));
                    return deferred.promise;
                }

                path = path.replace('{identifier}', parameters.identifier);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Updates a collection item
             * @method
             * @name Datasources#updateItem
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} identifier - The item identifier.
             * @param {{string}} token - A project token.
             * @param {{string}} item - The new item.
             *
             */
            this.updateItem = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.identifier === undefined) {
                    deferred.reject(new Error('Missing required path parameter: identifier'));
                    return deferred.promise;
                }

                path = path.replace('{identifier}', parameters.identifier);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                if (parameters.item === undefined) {
                    deferred.reject(new Error('Missing required body parameter: item'));
                    return deferred.promise;
                }

                body = parameters.item;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
            /*
             * Removes an item from a collection
             * @method
             * @name Datasources#removeItem
             * @param {{string}} category - The data source category.
             * @param {{string}} datasource - The data source name.
             * @param {{string}} collection - The collection name.
             * @param {{string}} identifier - The item identifier.
             * @param {{string}} token - A project token.
             *
             */
            this.removeItem = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.category === undefined) {
                    deferred.reject(new Error('Missing required path parameter: category'));
                    return deferred.promise;
                }

                path = path.replace('{category}', parameters.category);

                if (parameters.datasource === undefined) {
                    deferred.reject(new Error('Missing required path parameter: datasource'));
                    return deferred.promise;
                }

                path = path.replace('{datasource}', parameters.datasource);

                if (parameters.collection === undefined) {
                    deferred.reject(new Error('Missing required path parameter: collection'));
                    return deferred.promise;
                }

                path = path.replace('{collection}', parameters.collection);

                if (parameters.identifier === undefined) {
                    deferred.reject(new Error('Missing required path parameter: identifier'));
                    return deferred.promise;
                }

                path = path.replace('{identifier}', parameters.identifier);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    body: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            };
        };
    });