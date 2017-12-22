// setup angular module
angular.module('MyApp', ['ui.router','ngResource','ngMessages', 'ngCookies', 'mgcrea.ngStrap'])
.config(['$locationProvider','$stateProvider', '$urlRouterProvider',function ($locationProvider,$stateProvider, $urlRouterProvider) {
   $locationProvider.html5Mode(true);
   $urlRouterProvider.otherwise('/');

   $stateProvider
   .state('main', {
   	url: '/',
   	controller: 'MainCtrl',
   	templateUrl: 'views/home.html'
   })
   .state('blog-detail', {
   	url: '/:id/view',
   	controller: 'DetailCtrl',
   	templateUrl: 'views/detail.html'
   })
   .state('login', {
   	url: '/login',
   	controller: 'LoginCtrl',
   	templateUrl: 'views/login.html'
   })
   .state('register', {
   	url: '/register',
   	controller: 'RegisterCtrl',
   	templateUrl: 'views/register.html'
   })
   .state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'views/profile.html'
   })
}]);