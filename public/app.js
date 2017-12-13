// setup angular module
angular.module('MyApp', ['ui.router','ngResource','ngMessages', 'ngCookies', 'mgcrea.ngStrap'])
.config(['$locationProvider','$stateProvider', '$urlRouterProvider',function ($locationProvider,$stateProvider, $urlRouterProvider) {
   $locationProvider.html5Mode(true);
   $urlRouterProvider.otherwise('/');
}]);