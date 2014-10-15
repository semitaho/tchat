var app= angular.module('tchat-app', ['ngAnimate', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/register');

	$stateProvider.state('register', {
		url: '/register',
		templateUrl: 'register.html'
	});

	$stateProvider.state('main', {
		url: '/main',
		templateUrl: 'main.html'
	});
});

app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
	$rootScope.$on('$stateChangeStart', function(event, toState){
		console.log('current state: '+toState.name);
		if (Auth.isLoggedIn()){
			if (toState.name === 'main'){
				return;
			}
			$state.go('main');
		} else {
			if (toState.name === 'register'){
				return;
			}
			$state.go('register');

		}
	});
}]);