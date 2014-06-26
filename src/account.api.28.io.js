/*global angular:false */
/**
 *
 */
angular.module('account.api.28.io', [])
    .factory('Account', function($q, $http, $rootScope) {
        'use strict';

        /**
         * @class " || Account || "
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
             * Creates a new account
             * @method
             * @name Account#createAccount
             * @param {{string}} firstname - The account first name.
             * @param {{string}} lastname - The account last name.
             * @param {{string}} company - The account company.
             * @param {{string}} email - The account email.
             * @param {{string}} password - The account password.
             *
             */
            this.createAccount = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.firstname === undefined) {
                    deferred.reject(new Error('Missing required query parameter: firstname'));
                    return deferred.promise;
                }

                queryParameters['firstname'] = parameters.firstname;

                if (parameters.lastname === undefined) {
                    deferred.reject(new Error('Missing required query parameter: lastname'));
                    return deferred.promise;
                }

                queryParameters['lastname'] = parameters.lastname;

                if (parameters.company === undefined) {
                    deferred.reject(new Error('Missing required query parameter: company'));
                    return deferred.promise;
                }

                queryParameters['company'] = parameters.company;

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required query parameter: email'));
                    return deferred.promise;
                }

                queryParameters['email'] = parameters.email;

                if (parameters.password === undefined) {
                    deferred.reject(new Error('Missing required query parameter: password'));
                    return deferred.promise;
                }

                queryParameters['password'] = parameters.password;

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
             * Checks if an account exists
             * @method
             * @name Account#checkAccount
             * @param {{string}} email - The account email.
             *
             */
            this.checkAccount = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                $http({
                    timeout: parameters.$timeout,
                    method: 'HEAD',
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
             * Retrieves an account metadata
             * @method
             * @name Account#getAccountMetadata
             * @param {{string}} email - The account email.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.getAccountMetadata = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

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
             * Updates an account
             * @method
             * @name Account#updateAccount
             * @param {{string}} email - The account email.
             * @param {{string}} token - An API token generated for the specified account.
             * @param {{string}} firstname - The account new first name. If not specified the account firstname is not modified.
             * @param {{string}} lastname - The account new last name. If not specified the account lastname is not modified.
             * @param {{string}} company - The account new company. If not specified the account company is not modified.
             * @param {{string}} password - The account new password. If not specified the account password is not modified.
             *
             */
            this.updateAccount = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

                queryParameters['firstname'] = parameters.firstname;

                queryParameters['lastname'] = parameters.lastname;

                queryParameters['company'] = parameters.company;

                queryParameters['password'] = parameters.password;

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
             * Resends the confirmation email
             * @method
             * @name Account#resendConfirmation
             * @param {{string}} email - The account email.
             *
             */
            this.resendConfirmation = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/confirm';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

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
             * Confirms an account
             * @method
             * @name Account#confirmAccount
             * @param {{string}} email - The account name.
             * @param {{string}} confirmationToken - The account confirmation token.
             *
             */
            this.confirmAccount = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/confirm';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.confirmationToken === undefined) {
                    deferred.reject(new Error('Missing required query parameter: confirmationToken'));
                    return deferred.promise;
                }

                queryParameters['confirmation-token'] = parameters.confirmationToken;

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
             * Checks if a reset token is valid
             * @method
             * @name Account#checkResetToken
             * @param {{string}} email - The account email.
             * @param {{string}} resetToken - The reset token to check.
             *
             */
            this.checkResetToken = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/reset';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.resetToken === undefined) {
                    deferred.reject(new Error('Missing required query parameter: resetToken'));
                    return deferred.promise;
                }

                queryParameters['reset-token'] = parameters.resetToken;

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
             * Changes an account password using a reset token
             * @method
             * @name Account#resetPassword
             * @param {{string}} email - The account email.
             * @param {{string}} resetToken - The latest account reset token.
             * @param {{string}} password - The new account password.
             *
             */
            this.resetPassword = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/reset';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.resetToken === undefined) {
                    deferred.reject(new Error('Missing required query parameter: resetToken'));
                    return deferred.promise;
                }

                queryParameters['reset-token'] = parameters.resetToken;

                if (parameters.password === undefined) {
                    deferred.reject(new Error('Missing required query parameter: password'));
                    return deferred.promise;
                }

                queryParameters['password'] = parameters.password;

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
             * Sends a reset token
             * @method
             * @name Account#sendResetToken
             * @param {{string}} email - The account email.
             * @param {{string}} portalUrl - The Portal URL
             *
             */
            this.sendResetToken = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/reset';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.portalUrl === undefined) {
                    deferred.reject(new Error('Missing required query parameter: portalUrl'));
                    return deferred.promise;
                }

                queryParameters['portal-url'] = parameters.portalUrl;

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
             * Retrieves the user billing data and the data required to update it
             * @method
             * @name Account#getBillingData
             * @param {{string}} email - The account email.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.getBillingData = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/billing';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

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
             * Lists the account invoices
             * @method
             * @name Account#listInvoices
             * @param {{string}} email - The account email.
             * @param {{string}} cursor - Used to control which page is returned. Leave empty for the first page. Use the cursor returned in a reply to fetch the next page.
             * @param {{integer}} limit - The number of records to return per page up to a maximum of 200. Default is 50.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.listInvoices = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/invoices';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                queryParameters['cursor'] = parameters.cursor;

                queryParameters['limit'] = parameters.limit;

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
             * Retrieves the user billing information
             * @method
             * @name Account#getInvoice
             * @param {{string}} email - The account email.
             * @param {{string}} token - An API token generated for the specified account.
             * @param {{string}} accept - The format of the response. Default is "application/pdf"
             *
             */
            this.getInvoice = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/invoices/{invoice}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.token === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                queryParameters['token'] = parameters.token;

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
             * Lists the account subscriptions
             * @method
             * @name Account#listSubscriptions
             * @param {{string}} email - The account email.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.listSubscriptions = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/subscriptions';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

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
             * Creates a new subscription
             * @method
             * @name Account#createSubscription
             * @param {{string}} email - The account email.
             * @param {{string}} plan - The plan to subscribe to.
             * @param {{integer}} quantity - The quantity for the chosen plan.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.createSubscription = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/subscriptions';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.plan === undefined) {
                    deferred.reject(new Error('Missing required query parameter: plan'));
                    return deferred.promise;
                }

                queryParameters['plan'] = parameters.plan;

                if (parameters.quantity === undefined) {
                    deferred.reject(new Error('Missing required query parameter: quantity'));
                    return deferred.promise;
                }

                queryParameters['quantity'] = parameters.quantity;

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
             * Retrieves the subscription details
             * @method
             * @name Account#getSubscription
             * @param {{string}} email - The account email.
             * @param {{string}} subscription - The subscription uuid.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.getSubscription = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/subscriptions/{subscription}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.subscription === undefined) {
                    deferred.reject(new Error('Missing required path parameter: subscription'));
                    return deferred.promise;
                }

                path = path.replace('{subscription}', parameters.subscription);

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
             * Updates a subscription
             * @method
             * @name Account#updateSubscription
             * @param {{string}} email - The account email.
             * @param {{string}} subscription - The subscription uuid.
             * @param {{integer}} quantity - The new quantity.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.updateSubscription = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/subscriptions/{subscription}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.subscription === undefined) {
                    deferred.reject(new Error('Missing required path parameter: subscription'));
                    return deferred.promise;
                }

                path = path.replace('{subscription}', parameters.subscription);

                if (parameters.quantity === undefined) {
                    deferred.reject(new Error('Missing required query parameter: quantity'));
                    return deferred.promise;
                }

                queryParameters['quantity'] = parameters.quantity;

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
            /*
             * Terminates a subscription
             * @method
             * @name Account#terminateSubscription
             * @param {{string}} email - The account email.
             * @param {{string}} subscription - The subscription uuid.
             * @param {{string}} token - An API token generated for the specified account.
             *
             */
            this.terminateSubscription = function(parameters) {
                var deferred = $q.defer();
                var that = this;

                var path = '/account/{email}/subscriptions/{subscription}';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.email === undefined) {
                    deferred.reject(new Error('Missing required path parameter: email'));
                    return deferred.promise;
                }

                path = path.replace('{email}', parameters.email);

                if (parameters.subscription === undefined) {
                    deferred.reject(new Error('Missing required path parameter: subscription'));
                    return deferred.promise;
                }

                path = path.replace('{subscription}', parameters.subscription);

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