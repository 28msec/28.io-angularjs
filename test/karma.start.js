var fail = function (msg) {
    expect('should not reach this!: ' + msg).toEqual('failure');
};

var API = {}, $rootScope, $httpBackend, $cacheFactory;
beforeEach(module('auth.api.28.io'));

beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$cacheFactory_, Auth) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
    API.Auth = Auth;
}));

afterEach(function () {});
