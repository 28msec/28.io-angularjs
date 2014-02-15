describe('28.io Angularjs Queries', function () {

    it('Query Listing', function () {
        var queries = {
            "public" : [ {
                "href" : "/v1/_queries/public/archives/by-generator.jq", 
                "lastModified" : "2014-02-15T15:17:50Z", 
                "preCompiled" : false
            }, {
                "href" : "/v1/_queries/public/archives/entities.jq", 
                "lastModified" : "2014-02-15T15:17:50Z", 
                "preCompiled" : false
            }, {
                "href" : "/v1/_queries/public/archives/entity-for-archive.jq", 
                "lastModified" : "2014-02-15T15:17:50Z", 
                "preCompiled" : false
            }, {
                "href" : "/v1/_queries/public/archives/for-entities.jq", 
                "lastModified" : "2014-02-15T15:17:50Z", 
                "preCompiled" : false
            } ], 
            "private" : [{
                "href" : "/v1/_queries/public/archives/for-entities.jq", 
                "lastModified" : "2014-02-15T15:17:50Z", 
                "preCompiled" : false
            }]
        }; 

        $httpBackend.whenGET("http://test.28.io/v1/_queries/?token=WGkwS3E1UEljbDVPdVZVb0QxWGFGZERZdk0wPToyMDE0LTAyLTE2VDAzOjE4OjAwLjYyMzYyN1o%D")
        .respond(queries);
        $httpBackend.whenGET("http://test.28.io/v1/_queries/public/?token=WGkwS3E1UEljbDVPdVZVb0QxWGFGZERZdk0wPToyMDE0LTAyLTE2VDAzOjE4OjAwLjYyMzYyN1o%D")
        .respond({ public: queries.public });
        $httpBackend.whenGET("http://test.28.io/v1/_queries/private/?token=WGkwS3E1UEljbDVPdVZVb0QxWGFGZERZdk0wPToyMDE0LTAyLTE2VDAzOjE4OjAwLjYyMzYyN1o%D")
        .respond({ private: queries.private });
        $httpBackend.whenGET("http://test.28.io/v1/_queries/undefined?token=WGkwS3E1UEljbDVPdVZVb0QxWGFGZERZdk0wPToyMDE0LTAyLTE2VDAzOjE4OjAwLjYyMzYyN1o%D")
        .respond(500);
        
        var projectToken = "WGkwS3E1UEljbDVPdVZVb0QxWGFGZERZdk0wPToyMDE0LTAyLTE2VDAzOjE4OjAwLjYyMzYyN1o%D";
        var Queries = new API.Queries('http://test.28.io/v1', $cacheFactory('Queries'));
        Queries.listQueries(undefined, projectToken)
        .then(function(queries){
            expect(queries).toBeDefined();
            expect(queries.public).toBeDefined();
            expect(queries.private).toBeDefined();
            expect(queries.public.length).toBeGreaterThan(0);
            expect(queries.private.length).toBeGreaterThan(0);
        })
        .catch(function(error){
            fail(JSON.stringify(error, null, 2));
        });

        Queries.listQueries('public', projectToken)
        .then(function(queries){
            expect(queries).toBeDefined();
            expect(queries.public).toBeDefined();
            expect(queries.private).toBeUndefined();
            expect(queries.public.length).toBeGreaterThan(0);
        })
        .catch(function(error){
            fail(JSON.stringify(error, null, 2));
        });

        Queries.listQueries('private', projectToken)
        .then(function(queries){
            expect(queries).toBeDefined();
            expect(queries.public).toBeUndefined();
            expect(queries.private).toBeDefined();
            expect(queries.private.length).toBeGreaterThan(0);
        })
        .catch(function(error){
            fail(JSON.stringify(error, null, 2));
        });
    });
});
