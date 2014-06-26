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
    });