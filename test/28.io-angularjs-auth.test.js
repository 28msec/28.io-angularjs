describe('28.io Angularjs Auth', function () {

    it('Login to 28.io', function () {
        var sessionTokens = {
            "token_type" : "bearer", 
            "expiration_date" : "2014-02-15T10:30:48.231993Z", 
            "access_token" : "ZC82MVZlT3NDZThuRkRKUlYwczc4Smk2bkFvPToyMDE0LTAyLTE1VDEwOjMwOjQ4LjIzMTk5M1o=", 
            "refresh_token" : "ZC82MVZlT3NDZThuRkRKUlYwczc4Smk2bkFvPToyMDE0LTAyLTE1VDEwOjMwOjQ4LjIzMTk5M1o=", 
            "project_tokens" : {}, 
            "accountMetadata" : {
                "id" : "7239", 
                "email" : "w+testing@28.io", 
                "firstname" : "William", 
                "lastname" : "Candillon", 
                "company" : "28msec", 
                "createdAt" : "2014-02-14T21:25:25.526608Z", 
                "type" : "free", 
                "confirmedAt" : "2014-02-14T21:27:16.890602Z"
            }, 
            "projectsMetadata" : [  ]
        };

        $httpBackend.whenPOST("http://portal.28.io/auth?email=w%2Btesting@28.io&grant_type=client_credentials&password=hello").respond(401);
        $httpBackend.whenPOST("http://portal.28.io/auth?email=w%2Btesting@28.io&grant_type=client_credentials&password=foobar").respond(sessionTokens);
        $httpBackend.whenPOST("http://portal.28.io/auth?email=w%2Btesting@28.io&grant_type=refresh_token&refresh_token=ZC82MVZlT3NDZThuRkRKUlYwczc4Smk2bkFvPToyMDE0LTAyLTE1VDEwOjMwOjQ4LjIzMTk5M1o=").respond(sessionTokens);
        
        var Auth = new API.Auth('http://portal.28.io', $cacheFactory('Auth'));
        Auth.authenticate('client_credentials', 'w+testing@28.io', 'foobar')
        .then(function(session){
            expect(session.access_token).toBeDefined();
            expect(session.refresh_token).toBeDefined();
            expect(session.project_tokens).toBeDefined();
        
            Auth.authenticate('refresh_tokens', 'w+testing@28.io', undefined, session.refresh_token)
            .then(function(session){
                //success
            })
            .catch(function(error){
                fail(JSON.stringify(error, null, 2));
            });
        })
        .catch(function(error){
            fail(JSON.stringify(error, null, 2));
        });

        Auth.authenticate('client_credentials', 'w+testing@28.io', 'hello')
        .then(function(session){
            fail('This method shouldn\'t have succeed');
        })
        .catch(function(error){
          //success
        });

        $rootScope.$digest();
    });
});
