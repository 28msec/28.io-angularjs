28.io AngularJS Binding [![Build Status](https://travis-ci.org/28msec/28.io-angularjs.png?branch=master)](https://travis-ci.org/28msec/28.io-angularjs) [![Bower version](https://badge.fury.io/bo/28.io-angularjs.png)](http://badge.fury.io/bo/28.io-angularjs)
============

28.io-angularjs is an officially supported [AngularJS](http://angularjs.org/) binding
for [28.io](http://28.io).
28.io is a query processing platform that allows you to write complex queries accross multiple data sources - relational databases; document stores, data warehouses and even web services.

We also have [tutorials](http://www.28.io/blog/tags/tutorial) and an
[REST API reference](http://www.28.io/documentation/latest/api).

Join our [28.io Support Group](https://28msec.zendesk.com) to ask questions and provide feedback.


## Installation
Via [Bower](http://bower.io/)
```bash
$ bower install 28.io-angularjs --save
```
## API Documentation
http://28msec.github.io/28.io-angularjs/3.1.0/

## Example

```javascript
angular.module('myApp', ['auth.api.28.io', 'queries.api.28.io'])
.controller('AppCtrl', function($scope, $cacheFactory, Auth, Queries){
    var projectName = 'myproject';
    var auth = new Auth('http://portal.28.io', $cacheFactory('Auth'));
    var queries = new Queries('http://' + projectName + '.28.io', $cacheFactory('Queries'));

    $scope.login = function(){
        auth.authenticate('client_credentials', 'w+testing@28.io', 'hello')
        .then(function(tokens){
            var projectToken = tokens.project_tokens['project_' + projectName];
            queries.listQueries('public', projectToken)
            .then(function(publicQueries){
                $scope.publicQueries = publicQueries;
            })
            .catch(function(error){
                alert('Server replied: ' + error.description);
            });
        })
        .catch(function(error) {
            alert('Server replied: ' + error.description);
        });
    };
}); 
```
## Development
If you'd like to hack on AngularFire itself, you'll need
[node.js](http://nodejs.org/download/), and [Bower](http://bower.io):

```bash
npm install && bower install
```
Use grunt to build and test the code:
```bash
# Default task - build source and then runs unit tests
grunt

##License
Apache 2
