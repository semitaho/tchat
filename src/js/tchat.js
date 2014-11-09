Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

var app= angular.module('tchat-app', ['ngAnimate', 'angularFileUpload', 'ngTouch', 'ui.router']);
app.constant('localStorageKeyContexts', 'contexts').constant('localStorageKeyDefault', 'defaultcontext');
app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/register');

	$stateProvider.state('register', {
		url: '/register',
		templateUrl: 'register.html',
		controller: 'LoginController'
	});

	$stateProvider.state('main', {
		url: '/main',
		templateUrl: 'main.html',
		controller:  'tchat-controller'
	});
});

app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
	$rootScope.$on('$stateChangeStart', function(event, toState){
		console.log('current state: '+toState.name);
		if (Auth.isLoggedIn()){
			if (toState.name === 'main'){
				return;
			}
			event.preventDefault();
			$state.go('main');
		} else {
			if (toState.name === 'register'){
				return;
			}
			event.preventDefault();
			$state.go('register');
		}
	});
}]);