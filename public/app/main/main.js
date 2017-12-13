angular.module('MyApp')
.config(function ($stateProvider){
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'app/main/home.html',
		controller: 'MainCtrl'
	})
})