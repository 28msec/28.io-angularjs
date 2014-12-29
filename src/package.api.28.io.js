/*jshint -W069 */
/*global angular:false */
angular.module('package.api.28.io', [])
    .factory('Package', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         *
         * @class " || Package || "
         * @param {string} domain - The project domain
         * @param {string} cache - An angularjs cache implementation
         */
        var Package = (function() {
            function Package(domain, cache) {
                if (typeof(domain) !== 'string') {
                    throw new Error('Domain parameter must be specified as a string.');
                }
                this.domain = domain;
                this.cache = cache;
            }

            Package.prototype.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            Package.prototype.$broadcast = function(path) {
                var url = domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            /**
             * Lists available packages
             * @method
             * @name Package#listPackages
             * @param {{string}} category - The package category
             *
             */
            Package.prototype.listPackages = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/package';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['category'] !== undefined) {
                    queryParameters['category'] = parameters['category'];
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

            return Package;
        })();

        return Package;
    }]);