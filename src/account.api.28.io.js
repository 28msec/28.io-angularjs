angular.module('account.api.28.io', [])  
/**
 * Description Missing
 */
.factory('Account', function($q, $http, $rootScope){
    /**
     * @class Account
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/account';

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
         * The provided password must be at least 5 characters long. After the account is created a confirmation email is sent to the specified email. The email contains an URL which can be used to confirm the account. This method requires no authentication.
         * @method
         * @name Account#createAccount
         * @param {string} firstname - The account first name., 
         * @param {string} lastname - The account last name., 
         * @param {string} company - The account company., 
         * @param {string} email - The account email., 
         * @param {string} password - The account password., 
         * 
         */
        this.createAccount = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account'
            var url = domain + path;
            var params = {};
            if(parameters.firstname  === undefined) { 
                deferred.reject(new Error('The firstname parameter is required'));
                return deferred.promise;
            } else { 
                params['firstname'] = parameters.firstname; 
            }
        if(parameters.lastname  === undefined) { 
                deferred.reject(new Error('The lastname parameter is required'));
                return deferred.promise;
            } else { 
                params['lastname'] = parameters.lastname; 
            }
        if(parameters.company  === undefined) { 
                deferred.reject(new Error('The company parameter is required'));
                return deferred.promise;
            } else { 
                params['company'] = parameters.company; 
            }
        if(parameters.email  === undefined) { 
                deferred.reject(new Error('The email parameter is required'));
                return deferred.promise;
            } else { 
                params['email'] = parameters.email; 
            }
        if(parameters.password  === undefined) { 
                deferred.reject(new Error('The password parameter is required'));
                return deferred.promise;
            } else { 
                params['password'] = parameters.password; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
                url: url,
                params: params
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

        /**
         * This method requires no authentication.
         * @method
         * @name Account#checkAccount
         * @param {string} email - The account email., 
         * 
         */
        this.checkAccount = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + ''
            var url = domain + path;
            var params = {};
            
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('HEAD' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'HEAD',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        /**
         * This method requires a valid API token which has been generated for the same account specified in the request.
         * @method
         * @name Account#getAccountMetadata
         * @param {string} email - The account email., 
         * @param {string} token - An API token generated for the specified account., 
         * 
         */
        this.getAccountMetadata = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'GET',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //that.$broadcast(url);
                if(parameters.$cache !== undefined) parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        /**
         * This method allows to change the firstname, lastname, company or password of an account. At least one change, that is, one of the optional parameters, must be specified. The provided password, if any, must be at least 5 characters long. This method requires a valid API token which has been generated for the same account specified in the request.
         * @method
         * @name Account#updateAccount
         * @param {string} email - The account email., 
         * @param {string} token - An API token generated for the specified account., 
         * @param {string} firstname - The account new first name. If not specified the account firstname is not modified., 
         * @param {string} lastname - The account new last name. If not specified the account lastname is not modified., 
         * @param {string} company - The account new company. If not specified the account company is not modified., 
         * @param {string} password - The account new password. If not specified the account password is not modified., 
         * 
         */
        this.updateAccount = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['firstname'] = parameters.firstname;
            params['lastname'] = parameters.lastname;
            params['company'] = parameters.company;
            params['password'] = parameters.password;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PATCH' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'PATCH',
                url: url,
                params: params
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

        /**
         * This method requires no authentication.
         * @method
         * @name Account#resendConfirmation
         * @param {string} email - The account email., 
         * 
         */
        this.resendConfirmation = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + '/confirm'
            var url = domain + path;
            var params = {};
            
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'GET',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //that.$broadcast(url);
                if(parameters.$cache !== undefined) parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        /**
         * This method requires the confirmation token sent via email when the account is created. If the account is successfully confirmed the account is logged in and the associated account and project metadata are returned.
         * @method
         * @name Account#confirmAccount
         * @param {string} email - The account name., 
         * @param {string} confirmation-token - The account confirmation token., 
         * 
         */
        this.confirmAccount = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + '/confirm'
            var url = domain + path;
            var params = {};
            if(parameters.confirmationToken  === undefined) { 
                deferred.reject(new Error('The confirmationToken parameter is required'));
                return deferred.promise;
            } else { 
                params['confirmation-token'] = parameters.confirmationToken; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
                url: url,
                params: params
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

        /**
         * 
         * @method
         * @name Account#checkResetToken
         * @param {string} email - The account email., 
         * @param {string} reset-token - The reset token to check., 
         * 
         */
        this.checkResetToken = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + '/reset'
            var url = domain + path;
            var params = {};
            if(parameters.resetToken  === undefined) { 
                deferred.reject(new Error('The resetToken parameter is required'));
                return deferred.promise;
            } else { 
                params['reset-token'] = parameters.resetToken; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'GET',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                //that.$broadcast(url);
                if(parameters.$cache !== undefined) parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                //cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };

        /**
         * This method requires the latest reset token sent via email. If the account is successfully reset the account is logged in and the associated account and project metadata are returned. The new account password must be at least 5 characters long.
         * @method
         * @name Account#resetPassword
         * @param {string} email - The account email., 
         * @param {string} reset-token - The latest account reset token., 
         * @param {string} password - The new account password., 
         * 
         */
        this.resetPassword = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + '/reset'
            var url = domain + path;
            var params = {};
            if(parameters.resetToken  === undefined) { 
                deferred.reject(new Error('The resetToken parameter is required'));
                return deferred.promise;
            } else { 
                params['reset-token'] = parameters.resetToken; 
            }
        if(parameters.password  === undefined) { 
                deferred.reject(new Error('The password parameter is required'));
                return deferred.promise;
            } else { 
                params['password'] = parameters.password; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
                url: url,
                params: params
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

        /**
         * This method does not require authentication. Any previous sent but unused reset token is invalidated.
         * @method
         * @name Account#sendResetToken
         * @param {string} email - The account email., 
         * @param {string} portal-url - The Portal URL, 
         * 
         */
        this.sendResetToken = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/account/' + parameters.email + '/reset'
            var url = domain + path;
            var params = {};
            if(parameters.portalUrl  === undefined) { 
                deferred.reject(new Error('The portalUrl parameter is required'));
                return deferred.promise;
            } else { 
                params['portal-url'] = parameters.portalUrl; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'PUT',
                url: url,
                params: params
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