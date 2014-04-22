module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    
    grunt.registerMultiTask('generateSource', 'Generate Source from Swagger files', function(){
        var fs = require('fs');
        var request = require('request');
       
        var done = this.async();
        var options = this.options();
        var dest = options.dest;
     
        var count = options.apis.length;
        options.apis.forEach(function(api, index){
            var swagger = fs.readFileSync(api.swagger);
            request({
                uri: 'http://angular-binding.28.io/get2.jq',
                qs: { module: api.module, service: api.service },
                headers: { 'Content-Type': 'text/json; utf-8' },
                body: swagger
            }, function(error, response, body){
                if(response.statusCode !== 200) {
                    grunt.log.error('Error generating ' + api.module);
                    grunt.fail.fatal(body);
                }
                fs.writeFileSync(dest + api.module + '.js', body);
                grunt.log.writeln(api.module);
                count--;
                if(count === 0) {
                    done();
                }
            });
        });
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsdoc: {
           docs: {
             src: ['src/auth.api.28.io.js', 'src/datasources.api.28.io.js', 'src/modules.api.28.io.js', 'src/queries.api.28.io.js', 'src/batch.api.28.io.js'],
             options: {
               destination: 'out'
             }
           }
        },
        'gh-pages': {
            docs: {
                src: '**/*',
                options: {
                    base: 'out'
                }
            }
        }, 
        // these folders will no longer be checked into development branches
        generateSource: {
            options: {
                apis: [
                    {
                        swagger: 'swagger/auth',
                        module: 'auth.api.28.io',
                        service: 'Auth'
                    },
                    {
                        swagger: 'swagger/_batch',
                        module: 'batch.api.28.io',
                        service: 'Batch'
                    },
                    {
                        swagger: 'swagger/_queries',
                        module: 'queries.api.28.io',
                        service: 'Queries'
                    },
                    {
                        swagger: 'swagger/_modules',
                        module: 'modules.api.28.io',
                        service: 'Modules'
                    },
                    {
                        swagger: 'swagger/_datasources',
                        module: 'datasources.api.28.io',
                        service: 'Datasources'
                    },
                    {
                        swagger: 'swagger/account',
                        module: 'account.api.28.io',
                        service: 'Account'
                    },
                    {
                        swagger: 'swagger/project',
                        module: 'project.api.28.io',
                        service: 'Project'
                    },
                    {
                        swagger: 'swagger/package',
                        module: 'package.api.28.io',
                        service: 'Package'
                    }
                ],
                dest: 'src/'
            },
            dist: {

            }
        },
        clean: {
            pre: ['dist/', 'coverage/', 'out/'],
            post: []
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/*.js'],
            jshintrc: '.jshintrc'
        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['src/auth.api.28.io.js', 'src/queries.api.28.io.js', 'src/modules.api.28.io.js', 'src/datasources.api.28.io.js'],
                dest: 'dist/28.io-angularjs.js'
            }
        },
        uglify: {
            main: {
                options: {
                    
                },
                files: {
                    'dist/28.io-angularjs.min.js': ['dist/28.io-angularjs.js']
                }
            }
        },
        karma: {
            options: {
                configFile: './karma.conf.js'
            },
            dev: {
                browsers: ['Chrome'],
                autoWatch: true,
                singleRun: false
            },
            '1.0.4': {
                options: {
                    files: [
                        'bower_components/angular-1.0.4/angular.js',
                        'bower_components/angular-mocks-1.0.4/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.0.5': {
                options: {
                    files: [
                        'bower_components/angular-1.0.5/angular.js',
                        'bower_components/angular-mocks-1.0.5/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.0.6': {
                options: {
                    files: [
                        'bower_components/angular-1.0.6/angular.js',
                        'bower_components/angular-mocks-1.0.6/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.0.7': {
                options: {
                    files: [
                        'bower_components/angular-1.0.7/angular.js',
                        'bower_components/angular-mocks-1.0.7/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.0.8': {
                options: {
                    files: [
                        'bower_components/angular-1.0.8/angular.js',
                        'bower_components/angular-mocks-1.0.8/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.1.4': {
                options: {
                    files: [
                        'bower_components/angular-1.1.4/angular.js',
                        // hopefully this works. 1.1.4 isn't available on bower
                        'bower_components/angular-mocks-1.1.5/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.1.5': {
                options: {
                    files: [
                        'bower_components/angular-1.1.5/angular.js',
                        'bower_components/angular-mocks-1.1.5/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.0': {
                options: {
                    files: [
                        'bower_components/angular-1.2.0/angular.js',
                        'bower_components/angular-mocks-1.2.0/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.1': {
                options: {
                    files: [
                        'bower_components/angular-1.2.1/angular.js',
                        'bower_components/angular-mocks-1.2.1/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.2': {
                options: {
                    files: [
                        'bower_components/angular-1.2.2/angular.js',
                        'bower_components/angular-mocks-1.2.2/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.3': {
                options: {
                    files: [
                        'bower_components/angular-1.2.3/angular.js',
                        'bower_components/angular-mocks-1.2.3/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.4': {
                options: {
                    files: [
                        'bower_components/angular-1.2.4/angular.js',
                        'bower_components/angular-mocks-1.2.4/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.5': {
                options: {
                    files: [
                        'bower_components/angular-1.2.5/angular.js',
                        'bower_components/angular-mocks-1.2.5/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.6': {
                options: {
                    files: [
                        'bower_components/angular-1.2.6/angular.js',
                        'bower_components/angular-mocks-1.2.6/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            },
            '1.2.7': {
                options: {
                    files: [
                        'bower_components/angular-1.2.7/angular.js',
                        'bower_components/angular-mocks-1.2.7/angular-mocks.js',
                        'dist/28.io-angularjs.js',
                        'test/karma.start.js',
                        'test/*.js'
                    ]
                }
            }
        },
        coveralls: {
            options: {
                coverage_dir: 'coverage'
            }
        }
    });

    grunt.registerTask('test', ['karma:1.2.0']);
    grunt.registerTask('release', ['generateSource', 'clean:pre', 'concat', 'test', 'jsdoc', 'clean:post']);//uglify
    grunt.registerTask('build', ['clean:pre', 'release']);
    grunt.registerTask('default', ['build']);
};
