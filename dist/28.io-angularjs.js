angular.module('auth.api.28.io' , [])  
/**
 * <p>This OAuth2 compliant API can be used to authorize requests. The endpoint for these methods is <code>http://portal.28.io/auth</code>.</p>
 */
.factory('Auth', function($q, $http, $rootScope){
    /**
     * @class Auth
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/auth';

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
         * <p>This <a href="http://oauth.net/2/" target="_blank">OAuth2</a> compliant endpoint can be used both create new authorization tokens or to refresh an existing ones. There are three types of authorization tokens provided by this endpoint.</p><dl class="dl-horizontal"><dt>Access token</dt><dd>The access token is used to authorize requests on your 28.io account. These methods are currently unstable and are not documented yet.</dd><dt>Refresh Token</dt><dd>This token is used to renew the validity of your current authorization tokens.</dd><dt>Project token</dt><dd>This token is used to authorize requests to a 28.io project. For instance, the project token named <code>myproject</code> can be used to authorize any request to the <code>http://myproject.28.io</code> endpoint.</dd></dl><p>Any successful request to this endpoint will return the access, refresh, and project tokens.</p><p>To create new authorization tokens, the <code>grant_type</code> parameter must be set to <code>client_credentials</code> and the <code>email</code>. The <code>password</code> parameters must be specified as well.</p><p>To refresh the validity of your authorized tokens, the <code>grant_type</code> parameter must be set to <code>refresh_token</code> and the <code>refresh_token</code> parameter must be specified. In this scenario, new authorization tokens will be granted.</p><p>The format of the expiration date of a token is <a href="http://www.w3.org/TR/xmlschema-2/#isoformats" target="_blank">ISO 8601 compliant</a>.</p>
         * @method
         * @name Auth#authenticate
         * @param {string} grant_type - Authorization grant type. Use <code>client_credentials</code> to create a token or <code>refresh_token</code> to refresh a token, 
         * @param {string} email - The account email. Mandatory if <code>grant_type=client_credentials</code>., 
         * @param {string} password - The account password. Mandatory if <code>grant_type=client_credentials</code>., 
         * @param {string} refresh_token - The <code>refresh_token</code> obtained in the last successful request to this endpoint.  Mandatory if <code>grant_type=refresh_token</code>., 
         * 
         */
        this.authenticate = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/auth'
            var url = domain + path;
            var params = {};
            if(parameters.grant_type  === undefined) { 
                deferred.reject(new Error('The grant_type parameter is required'));
                return deferred.promise;
            } else { 
                params['grant_type'] = parameters.grant_type; 
            }
            params['email'] = parameters.email;
            params['password'] = parameters.password;
            params['refresh_token'] = parameters.refresh_token;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
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
    };
});angular.module('queries.api.28.io' , [])  
/**
 * <p>These resources can be used to manage and execute queries. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_queries</code>.</p>
 */
.factory('Queries', function($q, $http, $rootScope){
    /**
     * @class Queries
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/_queries';

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
         * <p>This method retrieves a list of queries that belong to a project. To only list public (resp. private) queries set the <code>visibility</code> parameter to <code>public</code> (resp. <code>private</code>). To list both public and private queries, omit the <code>visibility</code> parameter.</p>
         * @method
         * @name Queries#listQueries
         * @param {string} visibility - The query visibility., 
         * @param {string} token - A project token., 
         * 
         */
        this.listQueries = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.visibility + ''
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
                timeout: parameters.$timeout,
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
         * <p>This method executes a non-side-effecting query and serialize its results using a chosen serialization method. The following serialization methods are available: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON-XML-hybrid</a>, <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON</a>, <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xml-output" target="_blank">XML</a>, <a href="http://www.w3.org/TR/xslt-xquery-serialization/#text-output" target="_blank">Text</a>, <a href="http://www.w3.org/TR/xslt-xquery-serialization/#html-output" target="_blank">HTML</a>, and <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xhtml-output" target="_blank">XHTML</a>.</p><p>It is also possible to use the 28.io serialization method. The 28.io serialization produces a JSON object with metadata about the items produced as query result. This serialization method format is unstable and will be documented as soon we are ready to commit to backward compatibility.</p><div class="callout-info"><p>The HTTP response of this method is using streaming. Therefore, if an error occurs after part of the response has already been sent to the client, the response status code will be 200. In this case, the streaming of the HTTP response will stop and the following string will be sent <code>"\n\n\nAn error occurred during the processing of the request.\n"</code> followed by the error description. To always get a well-formed JSON error response, and the expected HTTP error status code, it is possible to issue the same request using POST. Note however that, in this case, the HTTP response will not stream.</p></div><h4>Query Serialization</h4><p>The serialization method can be chosen by means of the <code>Accept</code> header or by specifying the <code>format</code> parameter. In case no serialization method is specified, JSON-XML-hybrid is used.</p><p>Specifically, the serialization method is chosen as follows: <ol><li>if an <code>Accept</code> header is specified and if it contains at least one supported mime-type/charset pair, the serialization method corresponding to the most preferred one (according to the <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1" target="_blank">"q" modifier</a> first and the order in which the mime-types are specified second) among those supported is chosen;</li><li>otherwise, if a <code>format</code> parameter is specified, the corresponding serialization method is chosen;</li><li>otherwise, JSON-XML-hybrid is used.</li></ol></p><p>If the Accept header is specified and it contains at least one supported mime-type, the preferred supported mime-type is used to choose the serialization method, according to the following mapping: <ul><li><code>application/mixed-json-xml</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON-XML-hybrid Serialization</a></li><li><code>application/json</code> or any mime-type which ends with <code>+json</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON Serialization</a></li><li><code>text/xml</code>, <code>application/xml</code> or any mime-type which ends with <code>+xml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xml-output" target="_blank">XML Serialization</a></li><li><code>text/html</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#html-output" target="_blank">HTML Serialization</a></li><li><code>application/xhtml+xml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xhtml-output" target="_blank">XHTML Serialization</a></li><li><code>application/28io+json</code>: 28.io Serialization (format definition unstable)</li><li><code>* / *</code>: the <code>Accept</code> header is ignored and the format parameter, if specified, is used to choose the serialization method.</li></ul><p class="callout-warning">Any mime-type not matching one of the conditions listed above is not supported by this resource.</p></p><p>If the format parameter has been specified and is used to choose the serialization method, the following mapping is used: <ul><li><code>.mixed</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON-XML-hybrid Serialization</a></li><li><code>.json</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON Serialization</a></li><li><code>.xml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xml-output" target="_blank">XML Serialization</a></li><li><code>.text</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#text-output" target="_blank">Text Serialization</a></li><li><code>.html</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#html-output" target="_blank">HTML Serialization</a></li><li><code>.xhtml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xhtml-output" target="_blank">XHTML Serialization</a></li><li><code>.28io-json</code>: 28.io Serialization (format definition unstable).</li></ul></p><h4>Response Content-Type and Encoding</h4><p>The content-type of the response is determined as follows:<ol><li>If the serialization method has been chosen depending on one of the mime-types specified in the <code>Accept</code> header, the following criterion are used: <ul><li>if the used mime-type is <code>* / *</code> or <code>application/mixed-json-xml</code> then the response content type depends on the first item of the result. If it is an XML node the response content-type will be <code>application/xml</code>, otherwise <code>application/json</code></li><li>for any other mime-type, the same mime-type is used in the response.</li></ul> In case no charset has been specified for that mime-type in the <code>Accept</code> header, <code>UTF-8</code> is used. Otherwise, the specified charset is used.</li><li>If the serialization method has been chosen due to the format parameter or the query file extension the content-type of the response is chosen as follows: <ul><li>JSON-XML-hybrid serialization: the response content type depends on the first item of the result. If it is an XML node the response content-type will be <code>application/xml;charset=UTF-8</code>, otherwise <code>application/json;charset=UTF-8</code></li><li>JSON serialization: <code>application/json;charset=UTF-8</code></li><li>XML serialization: <code>application/xml;charset=UTF-8</code></li><li>Text serialization: <code>text/plain;charset=UTF-8</code></li><li>HTML serialization: <code>text/html;charset=UTF-8</code></li><li>XHTML serialization: <code>application/xhtml+xml;charset=UTF-8</code></li><li>28.io serialization: <code>application/28io+json;charset=UTF-8</code></li></ul></li></ol></p><p class="callout-warning">If any of the items produced by the query cannot be serialized using the chosen serialization method a <code>500 internal server error</code> will be raised.</p>
         * @method
         * @name Queries#executeSimpleQuery
         * @param {string} query-path - The query path. It starts with <code>public</code> or <code>private</code> and can contain slashes., 
         * @param {string} format - The serialization method to use for the results of the executed query. When choosing a serialization method, this parameter has a lower priority than the <code>Accept</code> header., 
         * @param {string} token - A project token., 
         * 
         */
        this.executeSimpleQuery = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '' + parameters.format + ''
            var url = domain + path;
            var params = {};
                params['token'] = parameters.token;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
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
         * <p>This method executes a query and serialize its results using a chosen serialization method. The following serialization methods are available: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON-XML-hybrid</a>, <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON</a>, <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xml-output" target="_blank">XML</a>, <a href="http://www.w3.org/TR/xslt-xquery-serialization/#text-output" target="_blank">Text</a>, <a href="http://www.w3.org/TR/xslt-xquery-serialization/#html-output" target="_blank">HTML</a>, and <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xhtml-output" target="_blank">XHTML</a>.</p><p>It is also possible to use the 28.io serialization method. The 28.io serialization produces a JSON object with metadata about the items produced as query result. This serialization method format is unstable and will be documented as soon we are ready to commit to backward compatibility.</p><h4>Query Serialization</h4><p>If the query specifies the response content-type or encoding using the <a href="http://28.io/documentation/latest/modules/http/response?anchor=content-type-1">HTTP response module</a> and the query execution completes without raising errors, its serialization method cannot be overridden through this api. Similarly, if the query <a href="http://28.io/documentation/latest/modules/http/response?anchor=status-code-1">specifies a response status code</a> and the query execution completes without raising errors, the HTTP status code set by the query is systematically used as the response status code.</p><p>If the query does not specify a response content-type, the serialization method can be chosen by means of the <code>Accept</code> header or by specifying the <code>format</code> parameter. In case the query does not specify a response content-type and no serialization method is specified, JSON-XML-hybrid is used.</p><p>Specifically, the serialization method is chosen as follows: <ol><li>if an <code>Accept</code> header is specified and if it contains at least one supported mime-type/charset pair, the serialization method corresponding to the most preferred one (according to the <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1" target="_blank">"q" modifier</a> first and the order in which the mime-types are specified second) among those supported is chosen;</li><li>otherwise, if a <code>format</code> parameter is specified, the corresponding serialization method is chosen;</li><li>otherwise, JSON-XML-hybrid is used.</li></ol></p><p>If the Accept header is specified and it contains at least one supported mime-type, the preferred supported mime-type is used to choose the serialization method, according to the following mapping: <ul><li><code>application/mixed-json-xml</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON-XML-hybrid Serialization</a></li><li><code>application/json</code> or any mime-type which ends with <code>+json</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON Serialization</a></li><li><code>text/xml</code>, <code>application/xml</code> or any mime-type which ends with <code>+xml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xml-output" target="_blank">XML Serialization</a></li><li><code>text/html</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#html-output" target="_blank">HTML Serialization</a></li><li><code>application/xhtml+xml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xhtml-output" target="_blank">XHTML Serialization</a></li><li><code>application/28io+json</code>: 28.io Serialization (format definition unstable)</li><li><code>* / *</code>: the <code>Accept</code> header is ignored and the format parameter, if specified, is used to choose the serialization method.</li></ul><p class="callout-warning">Any mime-type not matching one of the conditions listed above is not supported by this resource.</p></p><p>If the format parameter is used to choose the serialization method, the following mapping is used: <ul><li><code>.mixed</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON-XML-hybrid Serialization</a></li><li><code>.json</code>: <a href="http://jsoniq.org/docs/JSONiqExtensionToXQuery/html-single/#section-json-serialization" target="_blank">JSON Serialization</a></li><li><code>.xml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xml-output" target="_blank">XML Serialization</a></li><li><code>.text</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#text-output" target="_blank">Text Serialization</a></li><li><code>.html</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#html-output" target="_blank">HTML Serialization</a></li><li><code>.xhtml</code>: <a href="http://www.w3.org/TR/xslt-xquery-serialization/#xhtml-output" target="_blank">XHTML Serialization</a></li><li><code>.28io-json</code>: 28.io Serialization (format definition unstable).</li></ul></p><h4>Response Content-Type and Encoding</h4><p>The content-type of the response is determined as follows: <ol><li>If the query has set the response content-type, it will be used in the response. If this content-type, however, is not acceptable according to the <code>Accept</code> header specified in the request, an error will be raised and the response status code will be set to <code>406</code>. Note that <code>application/mixed-json-xml</code> is treated as <code>* / *</code> when considering if the content-type set by the query is accepted or not.</li><li>If the serialization method has been chosen depending on one of the mime-types specified in the <code>Accept</code> header, the following criterion are used: <ul><li>if the used mime-type is <code>* / *</code> or <code>application/mixed-json-xml</code> then the response content type depends on the first item of the result. If it is an XML node the response content-type will be <code>application/xml</code>, otherwise <code>application/json</code></li><li>for any other mime-type, the same mime-type is used in the response.</li></ul> In case no charset has been set by the query or specified for that mime-type in the <code>Accept</code> header, <code>UTF-8</code> is used.</li><li>If the serialization method has been chosen due to the format parameter or the query file extension the content-type of the response is chosen as follows: <ul><li>JSON-XML-hybrid serialization: the response content type depends on the first item of the result. If it is an XML node the response content-type will be <code>application/xml;charset=UTF-8</code>, otherwise <code>application/json;charset=UTF-8</code></li><li>JSON serialization: <code>application/json;charset=UTF-8</code></li><li>XML serialization: <code>application/xml;charset=UTF-8</code></li><li>Text serialization: <code>text/plain;charset=UTF-8</code></li><li>HTML serialization: <code>text/html;charset=UTF-8</code></li><li>XHTML serialization: <code>application/xhtml+xml;charset=UTF-8</code></li><li>28.io serialization: <code>application/28io+json;charset=UTF-8</code></li></ul></li></ol></p><p class="callout-warning">If the items produced by the query cannot be serialized using the chosen serialization method a <code>500 internal server error</code> will be raised.</p>
         * @method
         * @name Queries#executeQuery
         * @param {string} Accept - Value of the Accept header., 
         * @param {string} query-path - The query path. It starts with <code>public</code> or <code>private</code> and can contain slashes., 
         * @param {string} format - The serialization method to use for the results of the executed query. When choosing a serialization method, this parameter has a lower priority than the <code>Accept</code> header., 
         * @param {string} token - A project token., 
         * 
         */
        this.executeQuery = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '' + parameters.format + ''
            var url = domain + path;
            var params = {};
                params['token'] = parameters.token;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, headers: {'Accept': parameters.accept}
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
         * <p>This method retrieves the source code of a query. The response content-type is set according to the query language. If the query does not <a href="http://www.w3.org/TR/xquery-30/#id-version-declaration" target="_blank">declare its own dialect</a>, the query file extension is used to infer the language of the query. If the query file extension is <code>.xq</code> the query language is considered to be <code>XQuery</code>, <code>JSONiq</code>, otherwise.</p>
         * @method
         * @name Queries#getQuery
         * @param {string} query-path - The query path. It starts with "public" or "private" and contains slashes., 
         * @param {string} token - A project token., 
         * 
         */
        this.getQuery = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '/metadata/source'
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
                timeout: parameters.$timeout,
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
         * <p>This method creates a new query resource. If the <code>compile</code> option is <code>none</code>, the query will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the query to be created. To only create the query if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>none</code>.</p><p>The query file extension must be either <code>.jq</code> or <code>.xq</code>.</p>
         * @method
         * @name Queries#createQuery
         * @param {string} query-path - The query path. It starts with "public" or "private" and contains slashes., 
         * @param {string} token - A project token., 
         * @param {string} compile - The kind of compilation to perform. The default is none., 
         * @param {string} query-body - The source code of the query, 
         * 
         */
        this.createQuery = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '/metadata/source'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['compile'] = parameters.compile;
            var body = parameters.queryBody;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body
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
         * <p>This method updates the source code of an existing query. If the <code>compile</code> option is <code>none</code>, the query will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the query to be created or updated. To only create the query if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>none</code>.</p><p>The query file extension must be either <code>.jq</code> or <code>.xq</code>.</p>
         * @method
         * @name Queries#saveQuery
         * @param {string} query-path - The query path. It starts with "public" or "private" and contains slashes., 
         * @param {string} token - A project token., 
         * @param {string} compile - The kind of compilation to perform. The default is none., 
         * @param {string} query-body - The query source code, 
         * @param {string} Content-Type - , 
         * 
         */
        this.saveQuery = function(parameters){
            var deferred = $q.defer();
            var contentType = 'text/plain; charset=utf-8';
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '/metadata/source'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['compile'] = parameters.compile;
            var body = parameters.queryBody;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
                url: url,
                params: params, data: body, headers: {'Content-Type': parameters.contentType}
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
         * <p>This method removes a query.</p>
         * @method
         * @name Queries#removeQuery
         * @param {string} query-path - The query path. It starts with "public" or "private" and contains slashes., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeQuery = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '/metadata/source'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
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
         * <p>This method retrieves the execution plan of a query.</p>
         * @method
         * @name Queries#getQueryPlan
         * @param {string} query-path - The query path. It starts with "public" or "private" and contains slashes., 
         * @param {string} token - A project token., 
         * 
         */
        this.getQueryPlan = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '/metadata/plan'
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
                timeout: parameters.$timeout,
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
         * <p>This method precompiles a query. If the specified query has already been precompiled, the precompiled query is updated.</p>
         * @method
         * @name Queries#compileQuery
         * @param {string} query-path - The query path. It starts with "public" or "private" and contains slashes., 
         * @param {string} token - A project token., 
         * 
         */
        this.compileQuery = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_queries/' + parameters.queryPath + '/metadata/plan'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
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
});angular.module('modules.api.28.io' , [])  
/**
 * <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
 */
.factory('Modules', function($q, $http, $rootScope){
    /**
     * @class Modules
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/_modules';

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
         * <p>This method retrieves the list of modules which can be imported by a project.</p><p>By default, only modules defined in the project will be listed. To also list system-provided modules, you can set the <code>include-system</code> query parameter to <code>true</code>.</p><p>To include module namespaces or source codes, you can set the <code>include-ns</code> or <code>include-src</code> query parameters to <code>true</code>. Regardless of the value of the <code>include-src</code> parameter, the source code of system modules will not be returned.</p><p>To filter the returned modules you can use the <code>starts-with</code> query parameter. In this case, only the modules which path starts with the specified string will be returned.</p><p>If two or more module have the same namespace and thus the same path, the details of the module which would be imported by a query are shown.</p>
         * @method
         * @name Modules#listModules
         * @param {string} starts-with - Filter the available module by their module path., 
         * @param {boolean} include-system - Include modules provided by the platform., 
         * @param {boolean} include-ns - Include each module's namespace in the listing., 
         * @param {boolean} include-src - Include each module's source code in the listing., 
         * @param {string} token - A project token., 
         * 
         */
        this.listModules = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules'
            var url = domain + path;
            var params = {};
                params['starts-with'] = parameters.startsWith;
            params['include-system'] = parameters.includeSystem;
            params['include-ns'] = parameters.includeNs;
            params['include-src'] = parameters.includeSrc;
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
                timeout: parameters.$timeout,
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
         * <p>This method retrieves the source code of a project module. The response content type is set according to the query language of the module. If the query does not <a href="http://www.w3.org/TR/xquery-30/#id-version-declaration" target="_blank">declare its own dialect</a> or cannot be parsed, the query language is considered to be <code>XQuery</code>.</p><p>This operation cannot be used to retrieve the source code of system modules.</p>
         * @method
         * @name Modules#getModule
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * 
         */
        this.getModule = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
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
                timeout: parameters.$timeout,
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
         * <p>This method creates a new project module. If the <code>compile</code> option is <code>none</code>, the module will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the module to be created. To only create the module if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>lax</code>.</p><p>It is not allowed to create a project module with the same path of an existing system or project module. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @method
         * @name Modules#createModule
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * @param {string} module-body - The source code of the module., 
         * @param {string} compile - The kind of compilation to perform. The default is lax., 
         * @param {string} Content-Type - , 
         * 
         */
        this.createModule = function(parameters){
            var deferred = $q.defer();
            var contentType = 'text/plain; charset=utf-8';
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['compile'] = parameters.compile;
            var body = parameters.moduleBody;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body, headers: {'Content-Type': parameters.contentType}
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
         * <p>This method creates or updates a project module. If the <code>compile</code> option is <code>none</code>, the module will not be compiled, if it is <code>lax</code> it will be compiled and any potential compilation error reported. In this case, compilation errors will not prevent the module to be created or updated. To only create the module if no compilation errors are present, set the <code>compile</code> option to <code>strict</code>. The default is <code>lax</code>.</p><p>It is not allowed to update system modules. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @method
         * @name Modules#saveModule
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * @param {string} module-body - The module source code, 
         * @param {string} compile - The kind of compilation to perform. The default is lax., 
         * 
         */
        this.saveModule = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['compile'] = parameters.compile;
            var body = parameters.moduleBody;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
                url: url,
                params: params, data: body
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
         * <p>This method removes the specified project module. If the operation succeeds any precompiled query depending on the updated module will be deleted.</p>
         * @method
         * @name Modules#removeModule
         * @param {string} module-path - The module path., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeModule = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_modules/' + parameters.modulePath + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
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
});angular.module('datasources.api.28.io' , [])  
/**
 * <p>These resources can be used to manage and explore data sources. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_datasources</code>.</p>
 */
.factory('Datasources', function($q, $http, $rootScope){
    /**
     * @class Datasources
     * @param {string} domain - The project domain
     */
    return function(domain) {
        if(typeof(domain) !== 'string') {
            throw new Error('Domain parameter must be specified as a string.'); 
        }
        
        var root = '/_datasources';

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
         * <p>This method retrieves the data sources that are configured for a project.</p>
         * @method
         * @name Datasources#listDatasources
         * @param {string} token - A project token., 
         * 
         */
        this.listDatasources = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources'
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
                timeout: parameters.$timeout,
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
         * <p>This method retrieves the list of data sources from a specific category configured for the project. If no data source is present in the specified category an empty array is returned.</p>
         * @method
         * @name Datasources#listCategoryDatasources
         * @param {string} category - The data source category., 
         * @param {string} token - A project token., 
         * 
         */
        this.listCategoryDatasources = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + ''
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
                timeout: parameters.$timeout,
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
         * <p>This method creates a new data source. According to the specified data source category, the connection to the data source will be tested within this method. If the test does not pass the credentials will not be stored and the reponse status code will be set to 422.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be created using this method.</p>
         * @method
         * @name Datasources#createDatasource
         * @param {string} category - The data source category., 
         * @param {string} name - The name of the data source. The data source name can contain any alphabetic letter, numbers, dots, or dashes, and must start with an alphabetic letter., 
         * @param {string} token - A project token., 
         * @param {boolean} default - Whether the new data source will be the default one for its category. The default value is false., 
         * @param {string} credentials - The data sources credentials as JSON., 
         * 
         */
        this.createDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + ''
            var url = domain + path;
            var params = {};
            if(parameters.name  === undefined) { 
                deferred.reject(new Error('The name parameter is required'));
                return deferred.promise;
            } else { 
                params['name'] = parameters.name; 
            }
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['default'] = parameters.default;
            var body = parameters.credentials;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body
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
         * <p>This method retrieves credentials from data source.</p><p class="callout-warning">Currently, the default MongoDB credentials cannot be retrieved using this method.</p>
         * @method
         * @name Datasources#getDatasource
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + ''
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
                timeout: parameters.$timeout,
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
         * <p>This method updates a data source changing its name, whether it is default or not, or its credentials. At least one change, that is, one of the optional parameters, must be specified.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be modified through this method.</p>
         * @method
         * @name Datasources#updateDatasource
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * @param {string} name - The new name of the data source. If not specified the data source is not renamed., 
         * @param {boolean} default - Whether the data source should become (if true) or cease to be (if false) the default one for its category. If not specified the data source does not change its default status., 
         * @param {string} credentials - The new data sources credentials as JSON. If not specified the data sources credentials are not changed, 
         * 
         */
        this.updateDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['name'] = parameters.name;
            params['default'] = parameters.default;
            var body = parameters.credentials;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PATCH' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PATCH',
                url: url,
                params: params, data: body
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
         * <p>This method removes a data source.</p><p class="callout-warning">Currently, the default MongoDB data source cannot be deleted through this method.</p>
         * @method
         * @name Datasources#removeDatasource
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeDatasource = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
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
         * <p>This method retrieves the list of available collections from a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#getDatasourceContents
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getDatasourceContents = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents'
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
                timeout: parameters.$timeout,
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
         * <p>This method creates a new collection within a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#createCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} name - The name of the new collection., 
         * @param {string} token - A project token., 
         * 
         */
        this.createCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents'
            var url = domain + path;
            var params = {};
            if(parameters.name  === undefined) { 
                deferred.reject(new Error('The name parameter is required'));
                return deferred.promise;
            } else { 
                params['name'] = parameters.name; 
            }
        if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
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
         * <p>This method retrieves the metadata of a collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#getCollectionMetadata
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.getCollectionMetadata = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + ''
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
                timeout: parameters.$timeout,
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
         * <p>This method removes a collection from a data source.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#removeCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
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
         * <p>This method retrieves a list of items a the collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#listCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * @param {integer} offset - The index of the first item from which to start listing the collection items. Default is 1., 
         * @param {integer} limit - The number of collection items to list. Default is 10., 
         * @param {boolean} expand - Whether to include the serialized item in the listing. The default value is false., 
         * @param {string} Accept - Value of the Accept header., 
         * 
         */
        this.listCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            params['offset'] = parameters.offset;
            params['limit'] = parameters.limit;
            params['expand'] = parameters.expand;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('GET' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'GET',
                url: url,
                params: params, headers: {'Accept': parameters.accept}
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
         * <p>This method inserts an item into a data source collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#insertInCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * @param {string} item - The item to insert., 
         * 
         */
        this.insertInCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.item;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('POST' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'POST',
                url: url,
                params: params, data: body
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
         * <p>This method truncates a collection.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#truncateCollection
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} token - A project token., 
         * 
         */
        this.truncateCollection = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items'
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
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
         * <p>This method retrieves a collection item.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#getItem
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * 
         */
        this.getItem = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items/' + parameters.identifier + ''
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
                timeout: parameters.$timeout,
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
         * <p>This method updates a collection item.</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#updateItem
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * @param {string} item - The new item., 
         * 
         */
        this.updateItem = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items/' + parameters.identifier + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var body = parameters.item;
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('PUT' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'PUT',
                url: url,
                params: params, data: body
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
         * <p>This method removes an item from a collection</p><p class="callout-warning">Currently, this method is only available for MongoDB data sources.</p>
         * @method
         * @name Datasources#removeItem
         * @param {string} category - The data source category., 
         * @param {string} datasource - The data source name., 
         * @param {string} collection - The collection name., 
         * @param {string} identifier - The item identifier., 
         * @param {string} token - A project token., 
         * 
         */
        this.removeItem = function(parameters){
            var deferred = $q.defer();
            var that = this;
            var path = '/_datasources/' + parameters.category + '/' + parameters.datasource + '/contents/' + parameters.collection + '/items/' + parameters.identifier + ''
            var url = domain + path;
            var params = {};
            if(parameters.token  === undefined) { 
                deferred.reject(new Error('The token parameter is required'));
                return deferred.promise;
            } else { 
                params['token'] = parameters.token; 
            }
            var cached = parameters.$cache && parameters.$cache.get(url);
            if('DELETE' === 'GET' && cached !== undefined && parameters.$refresh !== true) {
                deferred.resolve(cached);
            } else {
            $http({
                timeout: parameters.$timeout,
                method: 'DELETE',
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