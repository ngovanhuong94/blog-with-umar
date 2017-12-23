// setup angular module
angular.module('MyApp', ['ui.router','ngResource','ngMessages', 'ngCookies', 'mgcrea.ngStrap'])
.config(['$locationProvider','$stateProvider', '$urlRouterProvider', '$httpProvider',function ($locationProvider,$stateProvider, $urlRouterProvider, $httpProvider) {
   $locationProvider.html5Mode(true);
   $urlRouterProvider.otherwise('/');
   $httpProvider.interceptors.push('authInterceptor');
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
}])
.factory('authInterceptor', function ($cookieStore, $q, $state){
   return {
      request: function (config) {
         config.headers = config.headers || {};
         if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
         }
         return config;
      },
      responseError: function (response) {
         if (response.status === 401) {
            $cookieStore.remove('token');
            $cookieStore.remove('username');
            $state.go('login');
            return $q.reject(response);
         } else {
            return $q.reject(response);
         }
      }
   }
})
.run(function ($rootScope, $state, Auth) {
 $rootScope.$on('stateChangeStart', function (event,next) {
   if (next.authenticate) {
      var loggedIn = Auth.isLoggedIn();
      if (loggedIn) {
         return;
      } else {
         event.preventDefault();
         $state.go('login');
      }
   }
 })
})