/*jshint -W069 */
/*global angular:false */
angular.module('auth.api.28.io', [])
    .factory('Auth', ['$q', '$http', '$rootScope',
        function($q, $http, $rootScope) {
            'use strict';

            /**
             * <p>This OAuth2 compliant API can be used to authorize requests. The endpoint for these methods is <code>http://portal.28.io/auth</code>.</p>
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
                this.authenticate = function(parameters) {
                    var deferred = $q.defer();

                    var path = '/auth';

                    var body;
                    var queryParameters = {};
                    var headers = {};

                    if (parameters['grant_type'] === undefined) {
                        deferred.reject(new Error('Missing required query parameter: grant_type'));
                        return deferred.promise;
                    }

                    if (parameters['grant_type'] !== undefined) {
                        queryParameters['grant_type'] = parameters['grant_type'];
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
            };
        }
    ]);