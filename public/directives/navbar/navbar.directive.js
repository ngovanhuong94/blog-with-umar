angular.module('MyApp')
.directive('navbar', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/navbar/navbar.html',
		controller: 'NavbarCtrl'
	}
})