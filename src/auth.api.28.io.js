/*jshint -W069 */
/*global angular:false */
angular.module('auth.api.28.io', [])
    .factory('Auth', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         * <p>This OAuth2 compliant API can be used to authorize requests. The endpoint for these methods is <code>http://portal.28.io/auth</code>.</p>
         * @class " || Auth || "
         * @param {string} domain - The project domain
         * @param {string} cache - An angularjs cache implementation
         */
        var Auth = (function() {
            function Auth(domain, cache) {
                if (typeof(domain) !== 'string') {
                    throw new Error('Domain parameter must be specified as a string.');
                }
                this.domain = domain;
                this.cache = cache;
            }

            Auth.prototype.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            Auth.prototype.$broadcast = function(path) {
                var url = domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            /**
             * Creates or refreshes authorization tokens
             * @method
             * @name Auth#authenticate
             * @param {{string}} grant_type - Authorization grant type. Use <code>client_credentials</code> to create a token or <code>refresh_token</code> to refresh a token
             * @param {{string}} email - The account email. Mandatory if <code>grant_type=client_credentials</code>.
             * @param {{string}} password - The account password. Mandatory if <code>grant_type=client_credentials</code>.
             * @param {{string}} refresh_token - The <code>refresh_token</code> obtained in the last successful request to this endpoint.  Mandatory if <code>grant_type=refresh_token</code>.
             *
             */
            Auth.prototype.authenticate = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/auth';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['grant_type'] !== undefined) {
                    queryParameters['grant_type'] = parameters['grant_type'];
                }

                if (parameters['grant_type'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: grant_type'));
                    return deferred.promise;
                }

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['password'] !== undefined) {
                    queryParameters['password'] = parameters['password'];
                }

                if (parameters['refresh_token'] !== undefined) {
                    queryParameters['refresh_token'] = parameters['refresh_token'];
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

            return Auth;
        })();

        return Auth;
    }]);