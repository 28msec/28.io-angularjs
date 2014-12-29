/*jshint -W069 */
/*global angular:false */
angular.module('project.api.28.io', [])
    .factory('Project', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         *
         * @class " || Project || "
         * @param {string} domain - The project domain
         * @param {string} cache - An angularjs cache implementation
         */
        var Project = (function() {
            function Project(domain, cache) {
                if (typeof(domain) !== 'string') {
                    throw new Error('Domain parameter must be specified as a string.');
                }
                this.domain = domain;
                this.cache = cache;
            }

            Project.prototype.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            Project.prototype.$broadcast = function(path) {
                var url = domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            /**
             * Retrieves the project metadata for all projects owned by an account
             * @method
             * @name Project#listProjects
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.listProjects = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Creates a new project
             * @method
             * @name Project#createProject
             * @param {{string}} projectName - The project name.
             * @param {{string}} template - A template name. If not specified the 'default' template will be used.
             * @param {{string}} package - A package name. If not specified the 'free' package will be used.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.createProject = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['projectName'] !== undefined) {
                    queryParameters['project-name'] = parameters['projectName'];
                }

                if (parameters['projectName'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: projectName'));
                    return deferred.promise;
                }

                if (parameters['template'] !== undefined) {
                    queryParameters['template'] = parameters['template'];
                }

                if (parameters['package'] !== undefined) {
                    queryParameters['package'] = parameters['package'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Checks if a project exists
             * @method
             * @name Project#checkProject
             * @param {{string}} name - The project name.
             *
             */
            Project.prototype.checkProject = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'HEAD',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Retrieves a project metadata
             * @method
             * @name Project#getProjectMetadata
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.getProjectMetadata = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Upgrades a project to the last Sausalito version
             * @method
             * @name Project#upgradeProject
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.upgradeProject = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Changes a project metadata
             * @method
             * @name Project#updateProject
             * @param {{string}} name - The project name.
             * @param {{string}} newName - The new project name.
             * @param {{string}} package - The project package.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.updateProject = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['newName'] !== undefined) {
                    queryParameters['new-name'] = parameters['newName'];
                }

                if (parameters['package'] !== undefined) {
                    queryParameters['package'] = parameters['package'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'PATCH',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Deletes a project
             * @method
             * @name Project#deleteProject
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.deleteProject = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Retrieves the default MongoDB credentials
             * @method
             * @name Project#getDefaultMongoDBCredentials
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.getDefaultMongoDBCredentials = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}/default-mongodb';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Updates a project default MongoDB credentials
             * @method
             * @name Project#updateDefaultMongoDBCredentials
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             * @param {{string}} dbType - The database type.
             * @param {{string}} connString - The database connection string. Only for "user" databases.
             * @param {{string}} db - The database name. Only for "user" databases.
             * @param {{string}} user - The database user. Only for "user" databases.
             * @param {{string}} pass - The database password. Only for "user" databases.
             * @param {{boolean}} preDigested - Whether the specified password is pre-digested or not. Only for "user" databases. Default is false.
             *
             */
            Project.prototype.updateDefaultMongoDBCredentials = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}/default-mongodb';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['dbType'] !== undefined) {
                    queryParameters['db-type'] = parameters['dbType'];
                }

                if (parameters['dbType'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: dbType'));
                    return deferred.promise;
                }

                if (parameters['connString'] !== undefined) {
                    queryParameters['conn-string'] = parameters['connString'];
                }

                if (parameters['db'] !== undefined) {
                    queryParameters['db'] = parameters['db'];
                }

                if (parameters['user'] !== undefined) {
                    queryParameters['user'] = parameters['user'];
                }

                if (parameters['pass'] !== undefined) {
                    queryParameters['pass'] = parameters['pass'];
                }

                if (parameters['preDigested'] !== undefined) {
                    queryParameters['pre-digested'] = parameters['preDigested'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Tests MongoDB credentials
             * @method
             * @name Project#testDefaultMongoDB
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             * @param {{string}} connString - The database connection string.
             * @param {{string}} db - The database name.
             * @param {{string}} user - The database user.
             * @param {{string}} pass - The database password.
             * @param {{boolean}} preDigested - Whether the specified password is pre-digested or not. Default is false.
             *
             */
            Project.prototype.testDefaultMongoDB = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}/test-mongodb';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['connString'] !== undefined) {
                    queryParameters['conn-string'] = parameters['connString'];
                }

                if (parameters['connString'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: connString'));
                    return deferred.promise;
                }

                if (parameters['db'] !== undefined) {
                    queryParameters['db'] = parameters['db'];
                }

                if (parameters['db'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: db'));
                    return deferred.promise;
                }

                if (parameters['user'] !== undefined) {
                    queryParameters['user'] = parameters['user'];
                }

                if (parameters['pass'] !== undefined) {
                    queryParameters['pass'] = parameters['pass'];
                }

                if (parameters['preDigested'] !== undefined) {
                    queryParameters['pre-digested'] = parameters['preDigested'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Lists all custom domains of a project
             * @method
             * @name Project#listCustomDomains
             * @param {{string}} name - The project name.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.listCustomDomains = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}/domains';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Adds a custom domain to a project
             * @method
             * @name Project#addCustomDomain
             * @param {{string}} name - The project name.
             * @param {{string}} domainName - The name of the new custom domain.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.addCustomDomain = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}/domains';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                if (parameters['domainName'] !== undefined) {
                    queryParameters['domain-name'] = parameters['domainName'];
                }

                if (parameters['domainName'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: domainName'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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
             * Deletes a project custom domain
             * @method
             * @name Project#deleteCustomDomain
             * @param {{string}} name - The project name.
             * @param {{string}} domainName - The project name.
             * @param {{string}} token - An API token.
             *
             */
            Project.prototype.deleteCustomDomain = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/project/{name}/domains/{domain-name}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{name}', parameters['name']);

                if (parameters['name'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: name'));
                    return deferred.promise;
                }

                path = path.replace('{domain-name}', parameters['domainName']);

                if (parameters['domainName'] === undefined) {
                    deferred.reject(new Error('Missing required path parameter: domainName'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
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

            return Project;
        })();

        return Project;
    }]);