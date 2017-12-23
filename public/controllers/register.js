angular.module('MyApp')
.controller('RegisterCtrl', function ($scope, Auth) {
	$scope.register = function () {
		Auth.register({
			username: $scope.username,
			email: $scope.email,
			password: $scope.password
		})
	}
})