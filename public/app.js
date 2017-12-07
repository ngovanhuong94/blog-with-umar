// setup angular module
angular.module('MyApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngCookies', 'mgcrea.ngStrap'])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true)
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
    })
}])