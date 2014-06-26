module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

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
        'swagger-js-codegen': {
            options: {
                apis: [
                    {
                        swagger: 'swagger/auth',
                        moduleName: 'auth.api.28.io',
                        className: 'Auth',
                        fileName: 'auth.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/_batch',
                        moduleName: 'batch.api.28.io',
                        className: 'Batch',
                        fileName: 'batch.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/_queries',
                        moduleName: 'queries.api.28.io',
                        className: 'Queries',
                        fileName: 'queries.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/_modules',
                        moduleName: 'modules.api.28.io',
                        className: 'Modules',
                        fileName: 'modules.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/_datasources',
                        moduleName: 'datasources.api.28.io',
                        className: 'Datasources',
                        fileName: 'datasources.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/account',
                        moduleName: 'account.api.28.io',
                        className: 'Account',
                        fileName: 'account.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/project',
                        moduleName: 'project.api.28.io',
                        className: 'Project',
                        fileName: 'project.api.28.io.js',
                        angularjs: true
                    },
                    {
                        swagger: 'swagger/package',
                        moduleName: 'package.api.28.io',
                        className: 'Package',
                        fileName: 'package.api.28.io.js',
                        angularjs: true
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
            src: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
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
    grunt.registerTask('release', ['swagger-js-codegen', 'clean:pre', 'concat', 'test', 'jsdoc', 'clean:post']);//uglify
    grunt.registerTask('build', ['clean:pre', 'release']);
    grunt.registerTask('default', ['build']);
};
