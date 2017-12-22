angular.module('MyApp')
.directive('appfooter', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/footer/footer.html'
	}
});