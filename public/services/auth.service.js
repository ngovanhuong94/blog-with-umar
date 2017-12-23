angular.module('MyApp')
.factory('Auth', function ($http, $state, $alert, $cookieStore) {
    var username = '';

    if ($cookieStore.get('token')) {
    	username = $cookies.get('username');
    }
	return {
		register: function (user) {
			$http.post('/auth/register', user)
			.success(function (data) {
				if(!data.success) {
					$alert({
						title: 'Error!',
		                content: data.message,
		                placement: 'top-right',
		                type: 'danger',
		                duration: 3
					})
				} else {
					$state.go('login');
					$alert({
		                title: 'Congratulations!',
		                content: 'Your account has been created.',
		                placement: 'top-right',
		                type: 'success',
		                duration: 3
		              });
				}
			})

		},
		login: function (user) {
			$http.post('/auth/login', user)
			.success(function (data) {
				console.log(data)
				if (!data.success) {
					$alert({
						title: 'Error!',
		                content: data.message,
		                placement: 'top-right',
		                type: 'danger',
		                duration: 3
					})
				} else {
					$cookieStore.put('token', data.token);
					$cookieStore.put('username', data.username)
					username = data.username;
				}
			})
		},
		getUsername: function () {
			return username;
		},
		isLoggedIn: function () {
			return username !== ''
		}
	}
})