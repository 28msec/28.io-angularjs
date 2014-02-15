angular.module('auth.api.28.io', [])  
/**
 * <p>This OAuth2 compliant API can be used to authorize requests. The endpoint for these methods is <code>http://portal.28.io/auth</code>.</p>
 */
.factory('Auth', function($q, $http, $rootScope){
    /**
     * @class Auth
     * @param {string} domain - The project domain
     * @param {string} cache - An angularjs cache implementation
     */
    return function(domain, cache) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }

        this.$on = function($scope, path, handler) {
            var url = domain + path;
            $scope.$on(url, function(){
                handler();
            });
            return this;
        };

        this.$broadcast = function(path){
            var url = domain + path;
            //cache.remove(url);
            $rootScope.$broadcast(url);
            return this;
        };
        
        /**
         * <p>This <a href="http://oauth.net/2/" target="_blank">OAuth2</a> compliant endpoint can be used both create new authorization tokens or to refresh an existing ones. There are three types of authorization tokens provided by this endpoint.</p><dl class="dl-horizontal"><dt>Access token</dt><dd>The access token is used to authorize requests on your 28.io account. These methods are currently unstable and are not documented yet.</dd><dt>Refresh Token</dt><dd>This token is used to renew the validity of your current authorization tokens.</dd><dt>Project token</dt><dd>This token is used to authorize requests to a 28.io project. For instance, the project token named <code>myproject</code> can be used to authorize any request to the <code>http://myproject.28.io</code> endpoint.</dd></dl><p>Any successful request to this endpoint will return the access, refresh, and project tokens.</p><p>To create new authorization tokens, the <code>grant_type</code> parameter must be set to <code>client_credentials</code> and the <code>email</code>. The <code>password</code> parameters must be specified as well.</p><p>To refresh the validity of your authorized tokens, the <code>grant_type</code> parameter must be set to <code>refresh_token</code> and the <code>refresh_token</code> parameter must be specified. In this scenario, new authorization tokens will be granted.</p><p>The format of the expiration date of a token is <a href="http://www.w3.org/TR/xmlschema-2/#isoformats" target="_blank">ISO 8601 compliant</a>.</p>
         * @method
         * @name Auth#authenticate
         * @param {string} grant_type - Authorization grant type. Use <code>client_credentials</code> to create a token or <code>refresh_token</code> to refresh a token, 
         * @param {string} email - The account email. Mandatory if <code>grant_type=client_credentials</code>., 
         * @param {string} password - The account password. Mandatory if <code>grant_type=client_credentials</code>., 
         * @param {string} refresh_token - The <code>refresh_token</code> obtained in the last successful request to this endpoint.  Mandatory if <code>grant_type=refresh_token</code>., 
         * 
         */
        this.authenticate = function(grant_type, email, password, refresh_token){
            var deferred = $q.defer();
            var path = '/auth'
            var url = domain + path;
            var params = {};
            if(grant_type  === undefined) { 
                deferred.reject(new Error('The grant_type parameter is required'));
                return deferred.promise;
            } else { 
                params['grant_type'] = grant_type; 
            }
            params['email'] = email;
            params['password'] = password;
            params['refresh_token'] = refresh_token;
            var cached = cache.get(url);
            if(cached && 'POST' === 'GET') {
                deferred.resolve(cached);
            } else {
            $http({
                method: 'POST',
                url: url,
                params: params
            })
            .success(function(data, status, headers, config){
                deferred.resolve(data);
                cache.removeAll();
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
                cache.removeAll();
            })
            ;
            }
            return deferred.promise;    
        };
    };
});